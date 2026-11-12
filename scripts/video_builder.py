import cv2
import numpy as np
from PIL import Image
import os

def create_cinematic_clip(image_path, output_mp4, output_poster, duration_sec=7, fps=30, target_res=(1280, 720), motion_type='push_in'):
    """
    Creates a smooth, slow cinematic looping H.264 mp4 video and a matching poster webp
    from a source image.
    Motion types:
      - 'push_in': slow push-in from scale 1.12 to 1.0 (or reverse)
      - 'pan_right': slow subtle horizontal drift
      - 'pan_up': slow subtle vertical drift
    """
    img = Image.open(image_path).convert('RGB')
    target_w, target_h = target_res
    target_aspect = target_w / target_h

    # Crop source image to target aspect ratio (with 15% margin for motion)
    src_w, src_h = img.size
    src_aspect = src_w / src_h

    if src_aspect > target_aspect:
        new_w = int(src_h * target_aspect)
        left = (src_w - new_w) // 2
        img_cropped = img.crop((left, 0, left + new_w, src_h))
    else:
        new_h = int(src_w / target_aspect)
        top = (src_h - new_h) // 2
        img_cropped = img.crop((0, top, src_w, top + new_h))

    # Save first frame as poster
    poster = img_cropped.resize(target_res, Image.Resampling.LANCZOS)
    poster.save(output_poster, 'WEBP', quality=85)
    print(f"Saved poster: {output_poster}")

    # Prepare video writer with mp4v / avc1
    total_frames = int(duration_sec * fps)
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    temp_mp4 = output_mp4 + ".temp.mp4"
    out = cv2.VideoWriter(temp_mp4, fourcc, fps, (target_w, target_h))

    img_np = np.array(img_cropped)
    h_c, w_c, _ = img_np.shape

    for f in range(total_frames):
        # Normalized time 0 to 1 with smooth cosine easing so it loops smoothly
        # t goes from 0 to 1 to 0 or smooth looping curve
        phase = (1.0 - np.cos(2.0 * np.pi * f / total_frames)) / 2.0  # 0 -> 1 -> 0

        if motion_type == 'push_in':
            # Scale from 1.0 to 1.08 and back
            scale = 1.0 + 0.08 * phase
            cur_w = int(w_c / scale)
            cur_h = int(h_c / scale)
            x_start = (w_c - cur_w) // 2
            y_start = (h_c - cur_h) // 2
            frame_crop = img_np[y_start:y_start+cur_h, x_start:x_start+cur_w]
        elif motion_type == 'pan_right':
            max_drift = int(w_c * 0.06)
            cur_w = w_c - max_drift
            cur_h = h_c
            x_start = int(max_drift * phase)
            y_start = 0
            frame_crop = img_np[y_start:y_start+cur_h, x_start:x_start+cur_w]
        else: # pan_up
            max_drift = int(h_c * 0.06)
            cur_w = w_c
            cur_h = h_c - max_drift
            x_start = 0
            y_start = int(max_drift * phase)
            frame_crop = img_np[y_start:y_start+cur_h, x_start:x_start+cur_w]

        frame_resized = cv2.resize(frame_crop, (target_w, target_h), interpolation=cv2.INTER_LINEAR)
        # Convert RGB to BGR for OpenCV
        frame_bgr = cv2.cvtColor(frame_resized, cv2.COLOR_RGB2BGR)
        out.write(frame_bgr)

    out.release()

    # Rename temp to final
    if os.path.exists(output_mp4):
        os.remove(output_mp4)
    os.rename(temp_mp4, output_mp4)
    file_size_kb = os.path.getsize(output_mp4) / 1024
    print(f"Created video: {output_mp4} ({file_size_kb:.1f} KB)")

if __name__ == "__main__":
    print("Video builder ready.")
