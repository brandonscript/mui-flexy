#!/bin/bash
# This script increments the version number of the project across various files.

# Usage: ./up.sh
#        ./up.sh <version>
#        ./up.sh major
#        ./up.sh minor
#        ./up.sh patch
#        ./up.sh -h --help

# cd to git root
git_root=$(git rev-parse --show-toplevel)
cd "$git_root" || exit 1
# Check if jq is installed
if ! command -v jq &>/dev/null; then
  echo "jq is not installed. Please install it to run this script."
  exit 1
fi

args_count=$#

is_valid_version() {
  # Check if the provided argument is a valid version number.
  # A valid version number is in the format X.Y.Z where X, Y, and Z are integers.
  if [[ $1 =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    return 0
  else
    return 1
  fi
}

get_current_version() {
  # Extracts the version number from the package.json file using jq.
  local version
  version=$(jq -r '.version' package.json)

  if ! is_valid_version "$version"; then
    exit 1
  fi

  echo "$version"
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

print_help() {
  echo "Usage: $0 [<version>|major|minor|patch]"
  echo "If no argument is provided, the script will increment the patch version."
}
if [[ $1 == "-h" || $1 == "--help" ]]; then
  print_help
  exit 0
fi
if [[ $args_count -gt 1 ]]; then
  echo "Error: Too many arguments provided."
  print_help
  exit 1
fi

get_new_version() {
  # Increments the version number based on the provided argument.
  local version
  version=$(get_current_version)
  local major minor patch

  # Split the version into major, minor, and patch components.
  IFS='.' read -r major minor patch <<<"$version"

  # If the provided argument is a valid version number, use it.
  if is_valid_version "$1"; then
    echo "$1"
    return
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

# Check if a specific version is provided
new_version=$(get_new_version "$1")
if [[ -z $new_version ]]; then
  echo "Error: Invalid argument(s)."
  print_help
  exit 1
fi

if ! is_valid_version "$new_version"; then
  echo "Error: New version is not valid. Expected format is M.m.p, got $new_version."
  exit 1
fi

echo "Updating version $current_version --> $new_version in package.json"
# Update the version in package.json
jq --arg new_version "$new_version" '.version = $new_version' package.json >tmp.json && mv tmp.json package.json || {
  echo "Error: Failed to update version to $new_version in package.json."
  exit 1
}
# Run prettier to format the package.json file
yarn exec prettier --write package.json || {
  echo "Error: Failed to format package.json with prettier."
  exit 1
}

# Not currently using a hardcoded version in README.md
# Update the version in README.md
# sed -i .tmp "/v$current_version, CommonJS/!s/$current_version/$new_version/g" README.md || {
#   echo "Error: Failed to update version to $new_version in README.md."
#   exit 1
# }
# # Remove the temporary file created by sed
# rm -f README.md.tmp || {
#   echo "Error: Failed to remove temporary file created by sed."
#   exit 1
# }

# Print the updated files
echo "✓ Done"

# Run build command
echo "Building the project..."
yarn build:all >/dev/null || {
  echo "Error: Build failed."
  exit 1
}

# Commit the changes
git add .
git commit -m "$new_version"
git tag -a "$new_version" -m "v$new_version"
