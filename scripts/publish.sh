#!/bin/bash
# This script builds and publishes all packages in the workspace

# Parse command line arguments
DRY_RUN=false

show_help() {
  cat << EOF
Usage: $0 [OPTIONS]

Builds and publishes all packages in the workspace.

OPTIONS:
  --dry-run, -n     Build packages and show what would be published without actually publishing
  --help, -h        Show this help message

EXAMPLES:
  $0                # Build and publish all packages
  $0 --dry-run      # Build packages and show what would be published
  $0 -n             # Same as --dry-run
EOF
}

while [[ $# -gt 0 ]]; do
  case $1 in
    --dry-run|-n)
      DRY_RUN=true
      shift
      ;;
    --help|-h)
      show_help
      exit 0
      ;;
    *)
      echo "Unknown option: $1"
      show_help
      exit 1
      ;;
  esac
done

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# cd to git root
git_root=$(git rev-parse --show-toplevel)
cd "$git_root" || exit 1


get_package_dirs() {
  # Get specific package directories (core, v5, v6, v7)
  for dir in packages/core packages/v5 packages/v6 packages/v7; do
    if [[ -f "$dir/package.json" ]]; then
      echo "$dir"
    fi
  done | sort
}

get_package_info() {
  local package_dir="$1"
  local package_json="$package_dir/package.json"

  if [[ -f "$package_json" ]]; then
    local name=$(jq -r '.name' "$package_json")
    local version=$(jq -r '.version' "$package_json")
    local private=$(jq -r '.private // false' "$package_json")
    echo "$name|$version|$private"
  fi
}

check_npm_auth() {
  if ! npm whoami &>/dev/null; then
    echo -e "${RED}Error: Not authenticated with npm. Please run 'npm login' first.${NC}"
    exit 1
  fi
  echo -e "${GREEN}✓ Authenticated as $(npm whoami)${NC}"
}

build_all() {
  echo -e "${YELLOW}Building all packages...${NC}"
  yarn build:all || {
    echo -e "${RED}Error: Build failed.${NC}"
    exit 1
  }
  echo -e "${GREEN}✓ Build complete${NC}"
}

publish_package() {
  local package_dir="$1"
  local package_name="$2"
  local package_version="$3"

  echo -e "${YELLOW}Publishing $package_name@$package_version...${NC}"

  cd "$package_dir" || {
    echo -e "${RED}Error: Could not enter directory $package_dir${NC}"
    return 1
  }

  # Check if package already exists at this version
  if npm view "$package_name@$package_version" version &>/dev/null; then
    echo -e "${YELLOW}⚠ Package $package_name@$package_version already exists, skipping${NC}"
    cd "$git_root"
    return 0
  fi

  # Publish the package
  npm publish --access public || {
    echo -e "${RED}Error: Failed to publish $package_name${NC}"
    cd "$git_root"
    return 1
  }

  echo -e "${GREEN}✓ Successfully published $package_name@$package_version${NC}"
  cd "$git_root"
  return 0
}

main() {
  echo -e "${YELLOW}Starting package publishing process...${NC}"
  echo ""

  # print dry run status
  if [[ "$DRY_RUN" == "true" ]]; then
    echo -e "${PURPLE}*** Dry-run mode, no packages will be published${NC}"
    echo ""
  fi

  # Check authentication
  check_npm_auth
  echo ""

  echo -e "${YELLOW}Building all packages...${NC}"
  # Build all packages (quietly)
  build_all > /dev/null 2>&1
  echo ""

  # Get all packages to publish
  echo -e "${YELLOW}Discovering packages...${NC}"
  publishable_packages=()
  skipped_packages=()

  for package_dir in $(get_package_dirs); do
    package_info=$(get_package_info "$package_dir")
    IFS='|' read -r name version private <<<"$package_info"

    if [[ "$private" == "true" ]]; then
      skipped_packages+=("$name (private)")
    else
      publishable_packages+=("$package_dir|$name|$version")
      echo "  📦 $name@$version"
    fi
  done

  if [[ ${#skipped_packages[@]} -gt 0 ]]; then
    echo ""
    echo -e "${YELLOW}Skipped packages:${NC}"
    for package in "${skipped_packages[@]}"; do
      echo "  ⏭ $package"
    done
  fi

  if [[ ${#publishable_packages[@]} -eq 0 ]]; then
    echo -e "${YELLOW}No packages to publish.${NC}"
    exit 0
  fi

  echo ""
  if [[ "$DRY_RUN" == "true" ]]; then
    echo -e "${PURPLE}[DRY-RUN] Publishing ${#publishable_packages[@]} packages...${NC}"
  else
    echo -e "${YELLOW}Publishing ${#publishable_packages[@]} packages...${NC}"
  fi
  echo ""

  # Publish each package
  published_count=0
  failed_count=0

  for package_info in "${publishable_packages[@]}"; do
    IFS='|' read -r package_dir name version <<<"$package_info"

    if [[ "$DRY_RUN" == "true" ]]; then
      echo -e "${PURPLE}[DRY-RUN] Would publish $name@$version${NC}"
      ((published_count++))
    else
      if publish_package "$package_dir" "$name" "$version"; then
        ((published_count++))
      else
        ((failed_count++))
      fi
    fi
  done

  echo ""
  echo -e "${YELLOW}Done:${NC}"
  if [[ "$DRY_RUN" == "true" ]]; then
    echo -e "${PURPLE}[DRY-RUN] No packages were actually published${NC}"
  else
    if [[ $failed_count -gt 0 ]]; then
      echo -e "${RED}✗ Failed: $failed_count${NC}"
      exit 1
    else
      echo -e "${GREEN}✓ Successfully published: $published_count${NC}"
    fi
  fi
}

# Run main function
main
