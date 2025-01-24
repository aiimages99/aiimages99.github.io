import os

def add_html_code_above_head(folder_path, file_range, code_file):
    try:
        # Read the HTML code from codeforadd.txt
        with open(code_file, "r", encoding="utf-8") as f:
            code_to_add = f.read()

        # Iterate through the specified range of files
        for i in range(file_range[0], file_range[1] + 1):
            file_name = f"{i:05d}.htm"
            file_path = os.path.join(folder_path, file_name)
            
            if os.path.exists(file_path):
                try:
                    # Read the content of the current HTML file
                    with open(file_path, "r", encoding="utf-8") as f:
                        content = f.read()
                    
                    # Check if </head> exists in the file
                    if "</head>" in content:
                        # Add the HTML code above </head>
                        updated_content = content.replace("</head>", f"{code_to_add}\n</head>")
                        
                        # Write the updated content back to the file
                        with open(file_path, "w", encoding="utf-8") as f:
                            f.write(updated_content)
                        
                        print(f"Updated file: {file_name}")
                    else:
                        print(f"No </head> tag found in {file_name}, skipping...")
                except Exception as e:
                    print(f"Error processing {file_name}: {e}")
            else:
                print(f"File not found: {file_name}")

    except Exception as e:
        print(f"Error reading {code_file}: {e}")

# Folder path and file range
folder_path = "./gallery/ai-models"
file_range = (0, 81)  # Range of files: 00000.htm to 00082.htm
code_file = "montags_ads_code.txt"  # Path to the file containing the HTML code to add

# Run the script
add_html_code_above_head(folder_path, file_range, code_file)
