import sys
from PIL import Image, ImageDraw

def make_circle(img_path, out_path):
    img = Image.open(img_path).convert("RGBA")
    
    # Make it square
    min_dim = min(img.size)
    left = (img.width - min_dim) / 2
    top = (img.height - min_dim) / 2
    right = (img.width + min_dim) / 2
    bottom = (img.height + min_dim) / 2
    img = img.crop((left, top, right, bottom))
    
    # Create mask
    mask = Image.new('L', img.size, 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((0, 0, min_dim, min_dim), fill=255)
    
    # Apply mask
    result = Image.new('RGBA', img.size, (0, 0, 0, 0))
    result.paste(img, (0, 0), mask)
    
    # Save as PNG
    result.save(out_path, "PNG")

if __name__ == '__main__':
    in_file = r"C:\Users\Mahesh\Desktop\download.jpg"
    out_file = r"C:\Users\Mahesh\Desktop\current projects\browser-based-python-ide\public\favicon.png"
    make_circle(in_file, out_file)
    print("Circular favicon created at", out_file)
