import os
import glob
from PIL import Image

BRAIN_DIR = r"C:\Users\araj2\.gemini\antigravity\brain\aec5c247-2a45-44b8-8507-e7971dbdf0b3"
TARGET_DIR = r"c:\Users\araj2\OneDrive\Desktop\Beauti_parlour2\public\images"

def get_latest_file(prefix):
    matches = glob.glob(os.path.join(BRAIN_DIR, f"{prefix}_*.jpg"))
    if not matches:
        matches = glob.glob(os.path.join(BRAIN_DIR, f"{prefix}_*.png"))
    if not matches:
        return None
    matches.sort(key=os.path.getmtime, reverse=True)
    return matches[0]

def convert_to_webp(src_path, dst_path, target_ratio=None, max_width=1600, quality=85):
    img = Image.open(src_path).convert("RGB")
    src_w, src_h = img.size

    if target_ratio:
        desired_ratio = target_ratio[0] / target_ratio[1]
        current_ratio = src_w / src_h

        if current_ratio > desired_ratio:
            # Crop width
            new_w = int(src_h * desired_ratio)
            left = (src_w - new_w) // 2
            img = img.crop((left, 0, left + new_w, src_h))
        else:
            # Crop height
            new_h = int(src_w / desired_ratio)
            top = (src_h - new_h) // 2
            img = img.crop((0, top, src_w, top + new_h))

    if img.size[0] > max_width:
        ratio = max_width / img.size[0]
        img = img.resize((max_width, int(img.size[1] * ratio)), Image.Resampling.LANCZOS)

    img.save(dst_path, "WEBP", quality=quality)
    size_kb = os.path.getsize(dst_path) / 1024
    print(f"Saved {dst_path} ({img.size[0]}x{img.size[1]}, {size_kb:.1f} KB)")

if __name__ == "__main__":
    # Process haldi and mehendi
    for name in ["haldi", "mehendi"]:
        src = get_latest_file(name)
        if src:
            convert_to_webp(src, os.path.join(TARGET_DIR, f"{name}.webp"), target_ratio=(4, 5))
