import os
import sys
import urllib.request
import numpy as np
from PIL import Image, ImageEnhance, ImageFilter

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from process_all_images import convert_to_webp, get_latest_file
from video_builder import create_cinematic_clip

TARGET_IMG_DIR = r"c:\Users\araj2\OneDrive\Desktop\Beauti_parlour2\public\images"
TARGET_VID_DIR = r"c:\Users\araj2\OneDrive\Desktop\Beauti_parlour2\public\videos"
BRAIN_DIR = r"C:\Users\araj2\.gemini\antigravity\brain\aec5c247-2a45-44b8-8507-e7971dbdf0b3"

def download_image(url, save_path):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    with urllib.request.urlopen(req) as resp, open(save_path, 'wb') as f:
        f.write(resp.read())
    print(f"Downloaded: {save_path}")

def build_all():
    os.makedirs(TARGET_IMG_DIR, exist_ok=True)
    os.makedirs(TARGET_VID_DIR, exist_ok=True)

    # 1. Existing AI Generated Ceremony & Service images
    print("--- 1. Processing AI Generated Images ---")
    ai_images = [
        ("haldi", "haldi.webp", (4, 5)),
        ("mehendi", "mehendi.webp", (4, 5)),
        ("shaadi", "shaadi.webp", (4, 5)),
        ("reception", "reception.webp", (4, 5)),
        ("service_bridal", "service-bridal.webp", (4, 3)),
        ("service_makeup", "service-makeup.webp", (4, 3)),
        ("service_hair", "service-hair.webp", (4, 3)),
    ]
    for prefix, out_name, ratio in ai_images:
        src = get_latest_file(prefix)
        if src:
            convert_to_webp(src, os.path.join(TARGET_IMG_DIR, out_name), target_ratio=ratio)

    # Also build service-mehendi from the high-res mehendi image
    src_mehendi = get_latest_file("mehendi")
    if src_mehendi:
        convert_to_webp(src_mehendi, os.path.join(TARGET_IMG_DIR, "service-mehendi.webp"), target_ratio=(4, 3))

    # 2. Curate Remaining Services: Skin, Nails
    print("--- 2. Curating Skin & Nails ---")
    temp_skin = os.path.join(BRAIN_DIR, "temp_skin.jpg")
    download_image("https://images.unsplash.com/photo-1512290900672-1f5be63435fa?auto=format&fit=crop&w=1200&q=85", temp_skin)
    convert_to_webp(temp_skin, os.path.join(TARGET_IMG_DIR, "service-skin.webp"), target_ratio=(4, 3))

    temp_nails = os.path.join(BRAIN_DIR, "temp_nails.jpg")
    download_image("https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=1200&q=85", temp_nails)
    convert_to_webp(temp_nails, os.path.join(TARGET_IMG_DIR, "service-nails.webp"), target_ratio=(4, 3))

    # 3. Studio & Banner & Makeup Process
    print("--- 3. Studio, Banner & Makeup Process ---")
    temp_studio = os.path.join(BRAIN_DIR, "temp_studio.jpg")
    download_image("https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1600&q=85", temp_studio)
    convert_to_webp(temp_studio, os.path.join(TARGET_IMG_DIR, "studio.webp"), target_ratio=(16, 9))

    temp_banner = os.path.join(BRAIN_DIR, "temp_banner.jpg")
    download_image("https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&q=85", temp_banner)
    convert_to_webp(temp_banner, os.path.join(TARGET_IMG_DIR, "banner.webp"), target_ratio=(21, 9))

    temp_makeup_proc = os.path.join(BRAIN_DIR, "temp_makeup_proc.jpg")
    download_image("https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=85", temp_makeup_proc)
    convert_to_webp(temp_makeup_proc, os.path.join(TARGET_IMG_DIR, "makeup-process.webp"), target_ratio=(4, 5))

    # 4. Team 1 to 4 (Friendly Indian women in emerald/professional attire)
    print("--- 4. Team Portraits ---")
    team_urls = [
        ("team-1.webp", "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=85"),
        ("team-2.webp", "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=85"),
        ("team-3.webp", "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=85"),
        ("team-4.webp", "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=800&q=85"),
    ]
    for out_name, url in team_urls:
        tmp = os.path.join(BRAIN_DIR, f"temp_{out_name}.jpg")
        download_image(url, tmp)
        convert_to_webp(tmp, os.path.join(TARGET_IMG_DIR, out_name), target_ratio=(4, 5))

    # 5. Gallery 01 to 12
    print("--- 5. Gallery Items 01-12 ---")
    # Using our AI generated images for maximum authenticity + curated wedding photos
    src_hero = get_latest_file("hero_bride")
    src_shaadi = get_latest_file("shaadi")
    src_reception = get_latest_file("reception")
    src_mehendi = get_latest_file("mehendi")
    src_party = get_latest_file("service_makeup")
    src_hair = get_latest_file("service_hair")
    src_haldi = get_latest_file("haldi")
    src_bridal = get_latest_file("service_bridal")

    if src_hero:
        convert_to_webp(src_hero, os.path.join(TARGET_IMG_DIR, "gallery-01.webp"), target_ratio=(4, 5))
    if src_reception:
        convert_to_webp(src_reception, os.path.join(TARGET_IMG_DIR, "gallery-02.webp"), target_ratio=(4, 5))
    if src_mehendi:
        convert_to_webp(src_mehendi, os.path.join(TARGET_IMG_DIR, "gallery-03.webp"), target_ratio=(4, 5))
    if src_party:
        convert_to_webp(src_party, os.path.join(TARGET_IMG_DIR, "gallery-04.webp"), target_ratio=(4, 5))

    # Additional authentic gallery photography
    extra_gallery = [
        ("gallery-05.webp", "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85"),
        ("gallery-08.webp", "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=85"),
        ("gallery-10.webp", "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=85"),
        ("gallery-11.webp", "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1000&q=85"),
    ]
    if src_hair:
        convert_to_webp(src_hair, os.path.join(TARGET_IMG_DIR, "gallery-06.webp"), target_ratio=(4, 5))
    if src_shaadi:
        convert_to_webp(src_shaadi, os.path.join(TARGET_IMG_DIR, "gallery-07.webp"), target_ratio=(4, 5))
    if src_haldi:
        convert_to_webp(src_haldi, os.path.join(TARGET_IMG_DIR, "gallery-09.webp"), target_ratio=(4, 5))
    if src_bridal:
        convert_to_webp(src_bridal, os.path.join(TARGET_IMG_DIR, "gallery-12.webp"), target_ratio=(4, 5))

    for g_name, g_url in extra_gallery:
        tmp = os.path.join(BRAIN_DIR, f"temp_{g_name}.jpg")
        download_image(g_url, tmp)
        convert_to_webp(tmp, os.path.join(TARGET_IMG_DIR, g_name), target_ratio=(4, 5))

    # 6. Before / After Pairs (SAME woman, SAME pose, SAME framing)
    print("--- 6. Before / After Pairs ---")
    # Pair 1:
    tmp_ba1 = os.path.join(BRAIN_DIR, "temp_ba1.jpg")
    download_image("https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1000&q=85", tmp_ba1)

    # Open base image for Pair 1
    base_1 = Image.open(tmp_ba1).convert("RGB")
    # Before 1: Natural, slightly muted saturation, pure clean skin
    enhancer_col = ImageEnhance.Color(base_1)
    before_1 = enhancer_col.enhance(0.9)
    enhancer_con = ImageEnhance.Contrast(before_1)
    before_1 = enhancer_con.enhance(0.95)
    convert_to_webp(tmp_ba1, os.path.join(TARGET_IMG_DIR, "before-1.webp"), target_ratio=(4, 5))

    # After 1: Bridal makeover - warmth, golden glow, richer lips, defined contrast
    enhancer_col2 = ImageEnhance.Color(base_1)
    after_1 = enhancer_col2.enhance(1.22)
    enhancer_con2 = ImageEnhance.Contrast(after_1)
    after_1 = enhancer_con2.enhance(1.15)
    enhancer_bri2 = ImageEnhance.Brightness(after_1)
    after_1 = enhancer_bri2.enhance(1.04)

    # Add a soft golden warmth overlay
    gold_overlay = Image.new("RGB", after_1.size, (201, 164, 92))
    after_1 = Image.blend(after_1, gold_overlay, 0.08)
    tmp_after1 = os.path.join(BRAIN_DIR, "temp_after1.jpg")
    after_1.save(tmp_after1, quality=90)
    convert_to_webp(tmp_after1, os.path.join(TARGET_IMG_DIR, "after-1.webp"), target_ratio=(4, 5))

    # Pair 2:
    tmp_ba2 = os.path.join(BRAIN_DIR, "temp_ba2.jpg")
    download_image("https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85", tmp_ba2)
    convert_to_webp(tmp_ba2, os.path.join(TARGET_IMG_DIR, "before-2.webp"), target_ratio=(4, 5))

    base_2 = Image.open(tmp_ba2).convert("RGB")
    # Airbrush bridal makeover: smooth skin blur blended, rich contrast, radiant highlights
    blurred_base = base_2.filter(ImageFilter.GaussianBlur(radius=2))
    airbrush_skin = Image.blend(base_2, blurred_base, 0.35)
    enhancer_col3 = ImageEnhance.Color(airbrush_skin)
    after_2 = enhancer_col3.enhance(1.25)
    enhancer_con3 = ImageEnhance.Contrast(after_2)
    after_2 = enhancer_con3.enhance(1.18)
    # Warm amber glow
    amber_overlay = Image.new("RGB", after_2.size, (227, 200, 138))
    after_2 = Image.blend(after_2, amber_overlay, 0.09)
    tmp_after2 = os.path.join(BRAIN_DIR, "temp_after2.jpg")
    after_2.save(tmp_after2, quality=90)
    convert_to_webp(tmp_after2, os.path.join(TARGET_IMG_DIR, "after-2.webp"), target_ratio=(4, 5))

    print("All images generated & processed successfully!")

    # 7. Videos Rendering (Section 13)
    print("--- 7. Rendering Cinematic Videos ---")
    # 1. hero.mp4 & hero-m.mp4
    if src_hero:
        create_cinematic_clip(src_hero, os.path.join(TARGET_VID_DIR, "hero.mp4"), os.path.join(TARGET_VID_DIR, "hero.webp"), duration_sec=6, fps=24, target_res=(960, 540), motion_type="push_in")
        create_cinematic_clip(src_hero, os.path.join(TARGET_VID_DIR, "hero-m.mp4"), os.path.join(TARGET_VID_DIR, "hero-m.webp"), duration_sec=6, fps=24, target_res=(540, 960), motion_type="push_in")

    # 2. haldi.mp4, mehendi.mp4, shaadi.mp4, reception.mp4 (4:5)
    src_haldi = get_latest_file("haldi")
    if src_haldi:
        create_cinematic_clip(src_haldi, os.path.join(TARGET_VID_DIR, "haldi.mp4"), os.path.join(TARGET_VID_DIR, "haldi.webp"), duration_sec=6, fps=24, target_res=(576, 720), motion_type="push_in")

    if src_mehendi:
        create_cinematic_clip(src_mehendi, os.path.join(TARGET_VID_DIR, "mehendi.mp4"), os.path.join(TARGET_VID_DIR, "mehendi.webp"), duration_sec=6, fps=24, target_res=(576, 720), motion_type="pan_right")

    if src_shaadi:
        create_cinematic_clip(src_shaadi, os.path.join(TARGET_VID_DIR, "shaadi.mp4"), os.path.join(TARGET_VID_DIR, "shaadi.webp"), duration_sec=6, fps=24, target_res=(576, 720), motion_type="push_in")

    src_rec = get_latest_file("reception")
    if src_rec:
        create_cinematic_clip(src_rec, os.path.join(TARGET_VID_DIR, "reception.mp4"), os.path.join(TARGET_VID_DIR, "reception.webp"), duration_sec=6, fps=24, target_res=(576, 720), motion_type="pan_right")

    # 3. studio.mp4 (16:9)
    create_cinematic_clip(temp_studio, os.path.join(TARGET_VID_DIR, "studio.mp4"), os.path.join(TARGET_VID_DIR, "studio.webp"), duration_sec=6, fps=24, target_res=(960, 540), motion_type="pan_right")

    # 4. makeup-process.mp4 (4:5)
    create_cinematic_clip(temp_makeup_proc, os.path.join(TARGET_VID_DIR, "makeup-process.mp4"), os.path.join(TARGET_VID_DIR, "makeup-process.webp"), duration_sec=6, fps=24, target_res=(576, 720), motion_type="push_in")

    # 5. banner.mp4 (21:9)
    create_cinematic_clip(temp_banner, os.path.join(TARGET_VID_DIR, "banner.mp4"), os.path.join(TARGET_VID_DIR, "banner.webp"), duration_sec=6, fps=24, target_res=(945, 405), motion_type="pan_right")

    print("--- Completed all images and videos! ---")

if __name__ == "__main__":
    build_all()
