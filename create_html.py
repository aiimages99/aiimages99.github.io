import os

def create_html_files(start, end, output_dir="gallery/ai-models", template_file="template.htm"):
    """Creates HTML files in a specified directory with sequential numbering.

    Args:
        start: The starting number for the files (inclusive).
        end: The ending number for the files (inclusive).
        output_dir: The directory where the HTML files will be created.
        template_file: Path to an optional template HTML file.
                       If None, a basic template is used.
    """

    if not isinstance(start, int) or not isinstance(end, int) or start > end:
        raise ValueError("Invalid start or end values.")

    if template_file and not os.path.exists(template_file):
        raise FileNotFoundError(f"Template file '{template_file}' not found.")

    # Create the output directory if it doesn't exist
    os.makedirs(output_dir, exist_ok=True) #exist_ok to prevent error if dir exist

    if template_file:
      with open(template_file, "r", encoding="utf-8") as f:
        template_content = f.read()
    else:
        template_content = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page {}</title>
</head>
<body>
    <h1>Page {}</h1>
    <p>This is page {}.</p>
</body>
</html>"""

    for i in range(start, end + 1):
        filename = os.path.join(output_dir, f"{i:05d}.htm")  # Full path
        file_content = template_content.format(i, i, i)
        try:
          with open(filename, "w", encoding="utf-8") as f:
              f.write(file_content)
          print(f"Created file: {filename}")
        except Exception as e:
          print(f"Error creating file {filename}: {e}")

# Example usage:
try:
    create_html_files(2, 100)  # Creates files in gallery/ai-models
    # Example with a template file:
    # create_html_files(1, 5, "gallery/ai-models", "my_template.html")
    # Example with a different output directory:
    # create_html_files(1, 5, "another/directory")
except ValueError as e:
  print(f"Input Error: {e}")
except FileNotFoundError as e:
  print(f"File Error: {e}")