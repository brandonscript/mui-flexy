#!/bin/bash
# This script builds and publishes all packages in the workspace

# cd to git root
git_root=$(git rev-parse --show-toplevel)
cd "$git_root" || exit 1

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

get_package_dirs() {
  # Get all package directories that contain package.json files
  find packages -name "package.json" -exec dirname {} \; | sort
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
  echo -e "${YELLOW}🚀 Starting package publishing process...${NC}"
  echo ""

  # Check authentication
  check_npm_auth
  echo ""

  # Build all packages
  build_all
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
  echo -e "${YELLOW}Publishing ${#publishable_packages[@]} packages...${NC}"
  echo ""

  # Publish each package
  published_count=0
  failed_count=0

  for package_info in "${publishable_packages[@]}"; do
    IFS='|' read -r package_dir name version <<<"$package_info"

    if publish_package "$package_dir" "$name" "$version"; then
      ((published_count++))
    else
      ((failed_count++))
    fi
  done

  echo ""
  echo -e "${GREEN}📊 Publishing Summary:${NC}"
  echo "  ✅ Successfully published: $published_count"
  if [[ $failed_count -gt 0 ]]; then
    echo "  ❌ Failed: $failed_count"
    exit 1
  else
    echo -e "${GREEN}🎉 All packages published successfully!${NC}"
  fi
}

# Run main function
main
