#!/bin/bash
# This script increments the version number of the project across various files and all workspace packages.

# Usage: ./version-up.sh [options] [version]
#        ./version-up.sh [options] <version>
#        ./version-up.sh [options] major
#        ./version-up.sh [options] minor
#        ./version-up.sh [options] patch
#        ./version-up.sh -h --help

# cd to git root
git_root=$(git rev-parse --show-toplevel)
cd "$git_root" || exit 1

# Check if jq is installed
if ! command -v jq &>/dev/null; then
  echo "jq is not installed. Please install it to run this script."
  exit 1
fi

# ------------------------------------------------------------
# Constants: all package directories to update versions
# (All directories that contain a package.json file)
# ------------------------------------------------------------
PACKAGE_DIRS=(
  "packages/core"
  "packages/v5"
  "packages/v6"
  "packages/v7"
  "demos/shared"
  "demos/v5"
  "demos/v6"
  "demos/v7"
  "docs"
)

# Parse arguments
BUILD_FLAG=false
PUSH_FLAG=false
VERSION_ARG=""

print_help() {
  echo "Usage: $0 [<version>|major|minor|patch] [options]"
  echo "If no version argument is provided, the script will increment the patch version."
  echo "This script updates the version in all workspace packages."
  echo ""
  echo "Options:"
  echo "  --build      Build the project after updating versions"
  echo "  --push       Build and push changes (implies --build)"
  echo "  -h, --help   Show this help message"
  echo ""
  echo "Version formats supported:"
  echo "  1.2.3    - Full version (major.minor.patch)"
  echo "  1.2      - Partial version (becomes 1.2.0)"
  echo "  1        - Major only (becomes 1.0.0)"
  echo "  major    - Increment major version, reset minor and patch to 0"
  echo "  minor    - Increment minor version, reset patch to 0"
  echo "  patch    - Increment patch version"
  echo ""
  echo "Examples:"
  echo "  $0 1.3 --build     Update to version 1.3.0 and build"
  echo "  $0 patch --push    Increment patch version, build, and push"
  echo "  $0 --build 1.3     Build with version 1.3.0 (options can come first too)"
  echo "  $0 major           Increment major version only"
  echo ""
  echo "Behavior:"
  echo "  No flags:    Update versions only (stop after version updates)"
  echo "  --build:     Update versions and build (stop after build)"
  echo "  --push:      Update versions, build, commit, and push to repository"
}

# Check for help flag first
if [[ "$1" == "-h" || "$1" == "--help" ]]; then
  print_help
  exit 0
fi

# Parse all arguments flexibly - version is the one without -- prefix
while [[ $# -gt 0 ]]; do
  case $1 in
  --build)
    BUILD_FLAG=true
    shift
    ;;
  --push)
    PUSH_FLAG=true
    BUILD_FLAG=true # --push implies --build
    shift
    ;;
  -h | --help)
    print_help
    exit 0
    ;;
  -*)
    echo "Error: Unknown option $1"
    print_help
    exit 1
    ;;
  *)
    # This is the version argument (no -- prefix)
    if [[ -n "$VERSION_ARG" ]]; then
      echo "Error: Multiple version arguments provided: '$VERSION_ARG' and '$1'"
      print_help
      exit 1
    fi
    VERSION_ARG="$1"
    shift
    ;;
  esac
done

is_valid_version() {
  # Check if the provided argument is a valid version number.
  # A valid version number is in the format X.Y.Z where X, Y, and Z are integers.
  if [[ $1 =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    return 0
  else
    return 1
  fi
}

normalize_version() {
  # Normalize a version string by adding missing components (defaulting to 0)
  # Examples: "1.3" -> "1.3.0", "2" -> "2.0.0", "1.2.3" -> "1.2.3"
  local version="$1"

  # Count the number of dots (trim whitespace from wc output)
  local dot_count=$(echo "$version" | grep -o '\.' | wc -l | tr -d ' ')

  case $dot_count in
  0)
    # Just major version (e.g., "2")
    echo "$version.0.0"
    ;;
  1)
    # Major and minor (e.g., "1.3")
    echo "$version.0"
    ;;
  2)
    # Full version (e.g., "1.2.3")
    echo "$version"
    ;;
  *)
    # Invalid format
    echo ""
    ;;
  esac
}

is_valid_partial_version() {
  # Check if the provided argument is a valid partial or full version number.
  # Valid formats: X, X.Y, or X.Y.Z where X, Y, and Z are integers.
  if [[ $1 =~ ^[0-9]+(\.[0-9]+)?(\.[0-9]+)?$ ]]; then
    return 0
  else
    return 1
  fi
}

validate_version_format() {
  # Validates version format and provides generic error message
  local input="$1"

  if [[ -z "$input" ]]; then
    return 0 # Empty input is valid (will increment patch)
  fi

  # Check for special keywords first
  case "$input" in
  major | minor | patch)
    return 0
    ;;
  esac

  # Check if it's a valid partial version
  if is_valid_partial_version "$input"; then
    return 0
  fi

  # Generic error message for any invalid format
  echo "Error: Invalid version format '$input', version must be a valid semver"
  return 1
}

get_current_version() {
  # Extracts the version number from the root package.json file using jq.
  local version
  version=$(jq -r '.version' package.json)

  if ! is_valid_version "$version"; then
    exit 1
  fi

  echo "$version"
}



update_package_version() {
  local package_dir="$1"
  local new_version="$2"
  local package_json="$package_dir/package.json"

  if [[ -f "$package_json" ]]; then
    echo "  Updating $package_json"
    jq --arg new_version "$new_version" '.version = $new_version' "$package_json" >"$package_json.tmp" && mv "$package_json.tmp" "$package_json" || {
      echo "Error: Failed to update version to $new_version in $package_json."
      exit 1
    }
    # Format the package.json file
    yarn exec prettier --write "$package_json" || {
      echo "Error: Failed to format $package_json with prettier."
      exit 1
    }
  fi
}

update_readme_version_badge() {
  local old_version="$1"
  local new_version="$2"
  local readme_file="README.md"

  if [[ -f "$readme_file" ]]; then
    echo "  Updating version badge in $readme_file"
    
    # Update the version badge specifically
    sed -i.bak "s/version-${old_version}-/version-${new_version}-/g" "$readme_file" || {
      echo "Error: Failed to update version badge in $readme_file."
      exit 1
    }
    
    # Clean up backup file
    rm -f "${readme_file}.bak"
    
    # Format the README file
    yarn exec prettier --write "$readme_file" || {
      echo "Error: Failed to format $readme_file with prettier."
      exit 1
    }
  fi
}

current_version=$(get_current_version)

if ! is_valid_version "$current_version"; then
  echo "Error: Invalid version format in package.json. Expected format is M.m.p."
  exit 1
fi

if [[ -z $current_version ]]; then
  echo "Error: Unable to retrieve the current version from package.json."
  exit 1
fi

# Help function is now defined inline during argument parsing

get_new_version() {
  # Increments the version number based on the provided argument.
  local version
  version=$(get_current_version)
  local major minor patch

  # Split the version into major, minor, and patch components.
  IFS='.' read -r major minor patch <<<"$version"

  # If the provided argument is a valid partial or full version number, normalize and use it.
  if is_valid_partial_version "$1"; then
    local normalized_version
    normalized_version=$(normalize_version "$1")
    if [[ -n $normalized_version ]]; then
      echo "$normalized_version"
      return
    fi
  fi

  # If no args, assume patch
  if [[ -z $1 ]]; then
    ((patch++))
    new_version="${major}.${minor}.${patch}"
    echo "$new_version"
    return
  fi

  case $1 in
  major)
    ((major++))
    minor=0
    patch=0
    ;;
  minor)
    ((minor++))
    patch=0
    ;;
  patch)
    ((patch++))
    ;;
  *)
    echo ""
    exit 1
    ;;
  esac

  # Construct the new version string.
  local new_version="${major}.${minor}.${patch}"
  echo "$new_version"
}

# Validate the input format first
if ! validate_version_format "$VERSION_ARG"; then
  exit 1
fi

# Check if a specific version is provided
new_version=$(get_new_version "$VERSION_ARG")
if [[ -z $new_version ]]; then
  echo "Error: Invalid version argument."
  exit 1
fi

if ! is_valid_version "$new_version"; then
  echo "Error: New version is not valid. Expected format is M.m.p, got $new_version."
  exit 1
fi

echo "Updating version $current_version --> $new_version across all packages"

# Update the version in root package.json
echo "  Updating ./package.json"
jq --arg new_version "$new_version" '.version = $new_version' package.json >tmp.json && mv tmp.json package.json || {
  echo "Error: Failed to update version to $new_version in package.json."
  exit 1
}

# Run prettier to format the root package.json file
yarn exec prettier --write package.json || {
  echo "Error: Failed to format package.json with prettier."
  exit 1
}

# Update versions in all packages
echo "Updating all packages:"
for package_dir in "${PACKAGE_DIRS[@]}"; do
  if [[ -d "$package_dir" && -f "$package_dir/package.json" ]]; then
    update_package_version "$package_dir" "$new_version"
  fi
done

echo "✓ Version update complete"

# Exit here if no build or push flags are provided
if [[ "$BUILD_FLAG" == false && "$PUSH_FLAG" == false ]]; then
  echo ""
  echo "Updated packages:"
  for package_dir in "${PACKAGE_DIRS[@]}"; do
    if [[ -d "$package_dir" && -f "$package_dir/package.json" ]]; then
      package_name=$(jq -r '.name' "$package_dir/package.json")
      echo "  - $package_name@$new_version"
    fi
  done
  exit 0
fi

# Run build command if --build or --push flag is provided
if [[ "$BUILD_FLAG" == true ]]; then
  echo ""
  echo "Building the project..."
  yarn build:all >/dev/null || {
    echo "Error: Build failed."
    exit 1
  }

  echo "✓ Build complete"

  # Exit here if only --build flag is provided (not --push)
  if [[ "$PUSH_FLAG" == false ]]; then
    echo ""
    echo "Updated packages:"
    for package_dir in "${PACKAGE_DIRS[@]}"; do
      if [[ -d "$package_dir" && -f "$package_dir/package.json" ]]; then
        package_name=$(jq -r '.name' "$package_dir/package.json")
        echo "  - $package_name@$new_version"
      fi
    done
    exit 0
  fi
fi

# Commit the changes (only if --push flag is provided)
git add .
git commit -m "v$new_version" --no-verify || {
  echo "Error: Failed to commit changes."
  exit 1
}

# If the commit message on any of the latest commits is the same as the new version, squash the commit
# before adding the tag
commits_to_squash=()
for commit in $(git rev-list --no-merges HEAD); do
  commit_message=$(git log -1 --pretty=format:%s "$commit")
  if [[ $commit_message == "v$new_version" ]]; then
    commits_to_squash+=("$commit")
  fi
done

echo "${#commits_to_squash[@]} commits to squash for version v$new_version"
if [[ ${#commits_to_squash[@]} -gt 0 ]]; then
  num_squash_commits=${#commits_to_squash[@]}
  git reset --soft HEAD~"$num_squash_commits"
  git commit -m "v$new_version" --no-verify || {
    echo "Error: Failed to squash commits."
    exit 1
  }
  git push origin main --force || {
    echo "Error: Failed to push squashed commits."
    exit 1
  }
fi

# Get latest commit hash and add tag
latest_commit_hash=$(git rev-parse HEAD)

# Delete the old tag if it exists
if git rev-parse "v$new_version" >/dev/null 2>&1; then
  git tag -d "v$new_version"
  git push origin ":refs/tags/v$new_version"
fi

git tag -a "v$new_version" -m "v$new_version" "$latest_commit_hash"

# Create a new release
git push origin main
git push origin "v$new_version"

echo "✓ Version v$new_version released successfully"
echo ""
echo "Updated packages:"
for package_dir in "${PACKAGE_DIRS[@]}"; do
  if [[ -d "$package_dir" && -f "$package_dir/package.json" ]]; then
    package_name=$(jq -r '.name' "$package_dir/package.json")
    echo "  - $package_name@$new_version"
  fi
done
