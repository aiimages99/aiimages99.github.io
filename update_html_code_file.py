import os

def replace_html_code_in_files(folder_path, start, end, old_code, new_code):
    # Iterate through the specified range of files
    for i in range(start, end + 1):
        file_name = f"{i:05d}.htm"
        file_path = os.path.join(folder_path, file_name)
        
        # Check if the file exists
        if os.path.exists(file_path):
            try:
                # Read the content of the file
                with open(file_path, "r", encoding="utf-8") as file:
                    content = file.read()
                
                # Replace the old code with the new code
                if old_code in content:
                    updated_content = content.replace(old_code, new_code)
                    
                    # Write the updated content back to the file
                    with open(file_path, "w", encoding="utf-8") as file:
                        file.write(updated_content)
                    
                    print(f"Updated file: {file_name}")
                else:
                    print(f"No matching code found in {file_name}")
            except Exception as e:
                print(f"Error processing {file_name}: {e}")
        else:
            print(f"File not found: {file_name}")

# Define the folder path and the HTML code to replace
folder_path = "./gallery/ai-models"
old_code = """<div class="scrollable-nav">
        <a href="#">Ai Models</a>
        <a href="#">Ai Girls</a>
        <a href="#">Instagram Models</a>
        <a href="#">Bollywood Actress</a>
        <a href="#">Hollywood Actress</a>
        <a href="#">Porn/Adults Actress</a>
        <a href="#">K-Drama Actress</a>
        <a href="#">K-Pop Models</a>
    </div>"""

new_code = """<div class="scrollable-nav">
        <a href="https://aiimages99.github.io/gallery/ai-models">Ai Models</a> 
        <a href="https://aiimages99.github.io/gallery/ai-girls">Ai Girls</a> 
        <a href="https://aiimages99.github.io/gallery/instagram-models">Instagram Models</a> 
        <a href="https://aiimages99.github.io/gallery/bollywood-actress">Bollywood Actress</a> 
        <a href="https://aiimages99.github.io/gallery/hollywood-actress">Hollywood Actress</a> 
        <a href="https://aiimages99.github.io/gallery/porn-actress">Porn/Adults Actress</a> 
        <a href="https://aiimages99.github.io/gallery/kdrama-actress">K-Drama Actress</a> 
        <a href="https://aiimages99.github.io/gallery/kpop-models">K-Pop Models</a> 
    </div>"""

# Replace the HTML code in the files
replace_html_code_in_files(folder_path, 2, 122, old_code, new_code)
