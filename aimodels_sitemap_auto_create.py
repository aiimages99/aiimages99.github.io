import os
from lxml import etree

def update_sitemap(sitemap_path, start, end):
    # Define the correct namespace
    namespace = {"xmlns": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    
    # Parse the existing sitemap or create a new root element
    if os.path.exists(sitemap_path):
        tree = etree.parse(sitemap_path)
        root = tree.getroot()
    else:
        # Create a new root element if the file doesn't exist
        root = etree.Element("urlset", namespace)
    
    # Add URLs for files from 00001.htm to 00122.htm
    for i in range(start, end + 1):
        url = etree.Element("url")
        
        # Create and append the <loc> element
        loc = etree.SubElement(url, "loc")
        loc.text = f"https://aiimages99.github.io/gallery/ai-models/{i:05d}.htm"
        
        # Create and append the <priority> element
        priority = etree.SubElement(url, "priority")
        priority.text = "0.8"
        
        # Create and append the <changefreq> element
        changefreq = etree.SubElement(url, "changefreq")
        changefreq.text = "weekly"
        
        # Append the new URL entry to the root
        root.append(url)
    
    # Remove the namespace prefix (e.g., "ns0:")
    for element in root.iter():
        # Strip the namespace prefix from element tag
        if '}' in element.tag:
            element.tag = element.tag.split('}', 1)[1]
    
    # Write the updated XML back to the file
    with open(sitemap_path, "wb") as f:
        tree.write(f, pretty_print=True, xml_declaration=True, encoding="UTF-8")
    
    print(f"Updated {sitemap_path} with new URLs.")

# Path to your sitemap file
sitemap_path = "aimodels-sitemap.xml"

# Update the sitemap with URLs from 00001.htm to 00122.htm
update_sitemap(sitemap_path, 0, 122)
