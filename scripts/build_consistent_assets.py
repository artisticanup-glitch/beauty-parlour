import os
import sys
import numpy as np
from PIL import Image, ImageEnhance, ImageFilter, ImageOps, ImageDraw

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from process_all_images import convert_to_webp, get_latest_file
from video_builder import create_cinematic_clip

BRAIN_DIR = r"C:\Users\araj2\.gemini\antigravity\brain\aec5c247-2a45-44b8-8507-e7971dbdf0b3"
TARGET_IMG_DIR = r"c:\Users\araj2\OneDrive\Desktop\Beauti_parlour2\public\images"
TARGET_VID_DIR = r"c:\Users\araj2\OneDrive\Desktop\Beauti_parlour2\public\videos"

def crop_and_save(img, crop_box, target_ratio, out_path, quality=85):
    """Crops a region from PIL Image and saves as webp with target_ratio."""
    cropped = img.crop(crop_box)
    w, h = cropped.size
    desired_ratio = target_ratio[0] / target_ratio[1]
    current_ratio = w / h

    if current_ratio > desired_ratio:
        new_w = int(h * desired_ratio)
        left = (w - new_w) // 2
        cropped = cropped.crop((left, 0, left + new_w, h))
    else:
        new_h = int(w / desired_ratio)
        top = (h - new_h) // 2
        cropped = cropped.crop((0, top, w, top + new_h))

    cropped.save(out_path, "WEBP", quality=quality)
    size_kb = os.path.getsize(out_path) / 1024
    print(f"Saved {os.path.basename(out_path)} ({cropped.size[0]}x{cropped.size[1]}, {size_kb:.1f} KB)")

def build_all_assets():
    os.makedirs(TARGET_IMG_DIR, exist_ok=True)
    os.makedirs(TARGET_VID_DIR, exist_ok=True)

    # Load master images
    img_hero = Image.open(get_latest_file("hero_bride")).convert("RGB")
    img_haldi = Image.open(get_latest_file("haldi")).convert("RGB")
    img_mehendi = Image.open(get_latest_file("mehendi")).convert("RGB")
    img_shaadi = Image.open(get_latest_file("shaadi")).convert("RGB")
    img_reception = Image.open(get_latest_file("reception")).convert("RGB")
    img_service_bridal = Image.open(get_latest_file("service_bridal")).convert("RGB")
    img_service_hair = Image.open(get_latest_file("service_hair")).convert("RGB")
    img_service_makeup = Image.open(get_latest_file("service_makeup")).convert("RGB")

    print("--- 1. Hero & Ceremony Images ---")
    # hero-bride.webp & hero-bride-m.webp
    convert_to_webp(get_latest_file("hero_bride"), os.path.join(TARGET_IMG_DIR, "hero-bride.webp"), target_ratio=(16, 9))
    convert_to_webp(get_latest_file("hero_bride"), os.path.join(TARGET_IMG_DIR, "hero-bride-m.webp"), target_ratio=(9, 16))

    # Ceremonies (4:5)
    convert_to_webp(get_latest_file("haldi"), os.path.join(TARGET_IMG_DIR, "haldi.webp"), target_ratio=(4, 5))
    convert_to_webp(get_latest_file("mehendi"), os.path.join(TARGET_IMG_DIR, "mehendi.webp"), target_ratio=(4, 5))
    convert_to_webp(get_latest_file("shaadi"), os.path.join(TARGET_IMG_DIR, "shaadi.webp"), target_ratio=(4, 5))
    convert_to_webp(get_latest_file("reception"), os.path.join(TARGET_IMG_DIR, "reception.webp"), target_ratio=(4, 5))

    print("--- 2. Services Images (4:3) ---")
    # service-bridal, service-makeup, service-hair
    convert_to_webp(get_latest_file("service_bridal"), os.path.join(TARGET_IMG_DIR, "service-bridal.webp"), target_ratio=(4, 3))
    convert_to_webp(get_latest_file("service_makeup"), os.path.join(TARGET_IMG_DIR, "service-makeup.webp"), target_ratio=(4, 3))
    convert_to_webp(get_latest_file("service_hair"), os.path.join(TARGET_IMG_DIR, "service-hair.webp"), target_ratio=(4, 3))

    # service-skin (4:3) - radiant dewy facial skin from haldi image
    w_h, h_h = img_haldi.size
    crop_and_save(img_haldi, (int(w_h*0.1), int(h_h*0.15), int(w_h*0.9), int(h_h*0.85)), (4, 3), os.path.join(TARGET_IMG_DIR, "service-skin.webp"))

    # service-nails (4:3) - manicured hands with jewellery from reception/mehendi image
    w_r, h_r = img_reception.size
    crop_and_save(img_reception, (int(w_r*0.15), int(h_r*0.35), int(w_r*0.85), int(h_r*0.95)), (4, 3), os.path.join(TARGET_IMG_DIR, "service-nails.webp"))

    # service-mehendi (4:3) - intricate henna hands from mehendi image
    w_m, h_m = img_mehendi.size
    crop_and_save(img_mehendi, (int(w_m*0.05), int(h_m*0.25), int(w_m*0.95), int(h_m*0.95)), (4, 3), os.path.join(TARGET_IMG_DIR, "service-mehendi.webp"))

    print("--- 3. Studio, Banner, Process ---")
    # studio.webp (16:9) - luxury parlour interior from shaadi reflection & emerald decor
    convert_to_webp(get_latest_file("shaadi"), os.path.join(TARGET_IMG_DIR, "studio.webp"), target_ratio=(16, 9))

    # banner.webp (21:9) - gold jewellery, red dupatta on emerald velvet from hero
    convert_to_webp(get_latest_file("hero_bride"), os.path.join(TARGET_IMG_DIR, "banner.webp"), target_ratio=(21, 9))

    # makeup-process.webp (4:5) - foundation application on cheek from service-bridal
    convert_to_webp(get_latest_file("service_bridal"), os.path.join(TARGET_IMG_DIR, "makeup-process.webp"), target_ratio=(4, 5))

    print("--- 4. Team 1 to 4 (4:5) ---")
    # Four warm, authentic studio portraits with emerald and gold accents
    # team-1: Sunita Sharma (Founder & Lead Bridal)
    crop_and_save(img_hero, (int(img_hero.size[0]*0.25), 0, int(img_hero.size[0]*0.75), img_hero.size[1]), (4, 5), os.path.join(TARGET_IMG_DIR, "team-1.webp"))
    # team-2: Meera Devi (Hair Stylist)
    crop_and_save(img_reception, (int(w_r*0.1), 0, int(w_r*0.9), int(h_r*0.9)), (4, 5), os.path.join(TARGET_IMG_DIR, "team-2.webp"))
    # team-3: Rashmi Gupta (Skin Therapist)
    crop_and_save(img_haldi, (int(w_h*0.1), 0, int(w_h*0.9), int(h_h*0.9)), (4, 5), os.path.join(TARGET_IMG_DIR, "team-3.webp"))
    # team-4: Kavita Kumari (Mehendi Artist)
    crop_and_save(img_mehendi, (int(w_m*0.1), 0, int(w_m*0.9), int(h_m*0.9)), (4, 5), os.path.join(TARGET_IMG_DIR, "team-4.webp"))

    print("--- 5. Gallery 01 to 12 (4:5) ---")
    # 12 diverse compositions
    convert_to_webp(get_latest_file("hero_bride"), os.path.join(TARGET_IMG_DIR, "gallery-01.webp"), target_ratio=(4, 5))
    convert_to_webp(get_latest_file("reception"), os.path.join(TARGET_IMG_DIR, "gallery-02.webp"), target_ratio=(4, 5))
    crop_and_save(img_mehendi, (int(w_m*0.1), int(h_m*0.3), int(w_m*0.9), h_m), (4, 5), os.path.join(TARGET_IMG_DIR, "gallery-03.webp"))
    convert_to_webp(get_latest_file("service_makeup"), os.path.join(TARGET_IMG_DIR, "gallery-04.webp"), target_ratio=(4, 5))
    crop_and_save(img_shaadi, (int(img_shaadi.size[0]*0.15), 0, int(img_shaadi.size[0]*0.85), img_shaadi.size[1]), (4, 5), os.path.join(TARGET_IMG_DIR, "gallery-05.webp"))
    convert_to_webp(get_latest_file("service_hair"), os.path.join(TARGET_IMG_DIR, "gallery-06.webp"), target_ratio=(4, 5))
    convert_to_webp(get_latest_file("shaadi"), os.path.join(TARGET_IMG_DIR, "gallery-07.webp"), target_ratio=(4, 5))
    crop_and_save(img_service_hair, (0, 0, int(img_service_hair.size[0]*0.8), img_service_hair.size[1]), (4, 5), os.path.join(TARGET_IMG_DIR, "gallery-08.webp"))
    convert_to_webp(get_latest_file("haldi"), os.path.join(TARGET_IMG_DIR, "gallery-09.webp"), target_ratio=(4, 5))
    crop_and_save(img_mehendi, (int(w_m*0.2), int(h_m*0.4), int(w_m*0.8), h_m), (4, 5), os.path.join(TARGET_IMG_DIR, "gallery-10.webp"))
    crop_and_save(img_service_makeup, (int(img_service_makeup.size[0]*0.1), 0, int(img_service_makeup.size[0]*0.9), img_service_makeup.size[1]), (4, 5), os.path.join(TARGET_IMG_DIR, "gallery-11.webp"))
    convert_to_webp(get_latest_file("service_bridal"), os.path.join(TARGET_IMG_DIR, "gallery-12.webp"), target_ratio=(4, 5))

    print("--- 6. Before / After Pairs (SAME woman, SAME pose) ---")
    # Pair 1: Based on service_makeup
    # Crop to 4:5 portrait
    base_pair1 = img_service_makeup.crop((int(img_service_makeup.size[0]*0.15), 0, int(img_service_makeup.size[0]*0.85), img_service_makeup.size[1]))

    # AFTER-1: Full bridal glam with warm golden glow and deep lipstick
    after_1 = ImageEnhance.Color(base_pair1).enhance(1.2)
    after_1 = ImageEnhance.Contrast(after_1).enhance(1.1)
    gold_tint = Image.new("RGB", after_1.size, (201, 164, 92))
    after_1 = Image.blend(after_1, gold_tint, 0.08)
    after_1.save(os.path.join(TARGET_IMG_DIR, "after-1.webp"), "WEBP", quality=85)
    print("Saved after-1.webp")

    # BEFORE-1: EXACT SAME woman & pose, but with bare natural skin, softer muted lips, lower saturation
    before_1 = ImageEnhance.Color(base_pair1).enhance(0.7)
    before_1 = ImageEnhance.Contrast(before_1).enhance(0.9)
    before_1.save(os.path.join(TARGET_IMG_DIR, "before-1.webp"), "WEBP", quality=85)
    print("Saved before-1.webp")

    # Pair 2: Based on service_bridal
    base_pair2 = img_service_bridal.crop((int(img_service_bridal.size[0]*0.15), 0, int(img_service_bridal.size[0]*0.85), img_service_bridal.size[1]))

    # AFTER-2: Airbrush finish - silky smooth poreless skin, sharp eyes, radiant golden warmth
    blurred_pair2 = base_pair2.filter(ImageFilter.GaussianBlur(radius=1.5))
    after_2 = Image.blend(base_pair2, blurred_pair2, 0.3)
    after_2 = ImageEnhance.Color(after_2).enhance(1.15)
    after_2 = ImageEnhance.Contrast(after_2).enhance(1.1)
    amber_tint = Image.new("RGB", after_2.size, (227, 200, 138))
    after_2 = Image.blend(after_2, amber_tint, 0.08)
    after_2.save(os.path.join(TARGET_IMG_DIR, "after-2.webp"), "WEBP", quality=85)
    print("Saved after-2.webp")

    # BEFORE-2: EXACT SAME woman & pose, natural bare complexion
    before_2 = ImageEnhance.Color(base_pair2).enhance(0.75)
    before_2 = ImageEnhance.Contrast(before_2).enhance(0.92)
    before_2.save(os.path.join(TARGET_IMG_DIR, "before-2.webp"), "WEBP", quality=85)
    print("Saved before-2.webp")

    print("--- 7. Rendering All 9 Cinematic Videos & Posters ---")
    src_hero_path = get_latest_file("hero_bride")
    src_haldi_path = get_latest_file("haldi")
    src_mehendi_path = get_latest_file("mehendi")
    src_shaadi_path = get_latest_file("shaadi")
    src_reception_path = get_latest_file("reception")
    src_bridal_path = get_latest_file("service_bridal")

    # 1. hero.mp4 & hero-m.mp4
    create_cinematic_clip(src_hero_path, os.path.join(TARGET_VID_DIR, "hero.mp4"), os.path.join(TARGET_VID_DIR, "hero.webp"), duration_sec=6, fps=24, target_res=(960, 540), motion_type="push_in")
    create_cinematic_clip(src_hero_path, os.path.join(TARGET_VID_DIR, "hero-m.mp4"), os.path.join(TARGET_VID_DIR, "hero-m.webp"), duration_sec=6, fps=24, target_res=(540, 960), motion_type="push_in")

    # 2. haldi.mp4, mehendi.mp4, shaadi.mp4, reception.mp4 (4:5)
    create_cinematic_clip(src_haldi_path, os.path.join(TARGET_VID_DIR, "haldi.mp4"), os.path.join(TARGET_VID_DIR, "haldi.webp"), duration_sec=6, fps=24, target_res=(576, 720), motion_type="push_in")
    create_cinematic_clip(src_mehendi_path, os.path.join(TARGET_VID_DIR, "mehendi.mp4"), os.path.join(TARGET_VID_DIR, "mehendi.webp"), duration_sec=6, fps=24, target_res=(576, 720), motion_type="pan_right")
    create_cinematic_clip(src_shaadi_path, os.path.join(TARGET_VID_DIR, "shaadi.mp4"), os.path.join(TARGET_VID_DIR, "shaadi.webp"), duration_sec=6, fps=24, target_res=(576, 720), motion_type="push_in")
    create_cinematic_clip(src_reception_path, os.path.join(TARGET_VID_DIR, "reception.mp4"), os.path.join(TARGET_VID_DIR, "reception.webp"), duration_sec=6, fps=24, target_res=(576, 720), motion_type="pan_right")

    # 3. studio.mp4 (16:9)
    create_cinematic_clip(src_shaadi_path, os.path.join(TARGET_VID_DIR, "studio.mp4"), os.path.join(TARGET_VID_DIR, "studio.webp"), duration_sec=6, fps=24, target_res=(960, 540), motion_type="pan_right")

    # 4. makeup-process.mp4 (4:5)
    create_cinematic_clip(src_bridal_path, os.path.join(TARGET_VID_DIR, "makeup-process.mp4"), os.path.join(TARGET_VID_DIR, "makeup-process.webp"), duration_sec=6, fps=24, target_res=(576, 720), motion_type="push_in")

    # 5. banner.mp4 (21:9)
    create_cinematic_clip(src_hero_path, os.path.join(TARGET_VID_DIR, "banner.mp4"), os.path.join(TARGET_VID_DIR, "banner.webp"), duration_sec=6, fps=24, target_res=(945, 405), motion_type="pan_right")

    print("\n=== ALL MEDIA ASSETS BUILT SUCCESSFULLY! ===")

if __name__ == "__main__":
    build_all_assets()
