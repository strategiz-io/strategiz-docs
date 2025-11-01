#!/bin/bash

cd /Users/cuztomizer/Documents/GitHub/strategiz-docs/docs

find . -type f \( -name "*.md" -o -name "*.mdx" \) | while IFS= read -r file; do
  # Check if file has frontmatter with id
  if ! head -10 "$file" | grep -q "^id:"; then
    # Get the filename without extension and path
    filename=$(basename "$file" .md)
    filename=$(basename "$filename" .mdx)

    # Create title from filename (capitalize first letter of each word)
    title=$(echo "$filename" | sed 's/-/ /g' | awk '{for(i=1;i<=NF;i++) $i=toupper(substr($i,1,1)) tolower(substr($i,2));}1')

    # Read the current content
    content=$(cat "$file")

    # Create new content with frontmatter
    {
      echo "---"
      echo "id: $filename"
      echo "title: $title"
      echo "sidebar_label: $title"
      echo "---"
      echo ""
      echo "$content"
    } > "${file}.tmp"

    mv "${file}.tmp" "$file"

    echo "Fixed: $file (id: $filename)"
  fi
done

echo ""
echo "Done! Fixed all MD/MDX files missing id frontmatter."
