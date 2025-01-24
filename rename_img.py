import os

def rename_images_in_folders(base_folder):
    # Traverse all subdirectories in the base folder
    for folder in sorted(os.listdir(base_folder)):
        folder_path = os.path.join(base_folder, folder)
        
        # Check if it's a directory
        if os.path.isdir(folder_path):
            print(f"Processing folder: {folder_path}")
            
            # List all files in the folder and sort them for consistent renaming
            images = sorted(os.listdir(folder_path))
            image_count = 1  # Start numbering from 1
            
            for image in images:
                image_path = os.path.join(folder_path, image)
                
                # Check if the file is an image based on its extension
                if os.path.isfile(image_path) and image.lower().endswith(('.jpg', '.jpeg', '.png', '.gif', '.bmp')):
                    # Generate the new file name (e.g., 1.jpg, 2.jpg, ...)
                    extension = os.path.splitext(image)[1]
                    new_name = f"{image_count}{extension}"
                    new_image_path = os.path.join(folder_path, new_name)
                    
                    # Rename the file
                    try:
                        os.rename(image_path, new_image_path)
                        print(f"Renamed {image} to {new_name}")
                        image_count += 1
                    except Exception as e:
                        print(f"Error renaming {image_path}: {e}")
            
            print(f"Completed processing folder: {folder_path}")

# Define the base folder where the `ai-models` directory is located
base_folder = "./img/ai-models"

# Call the function
rename_images_in_folders(base_folder)
