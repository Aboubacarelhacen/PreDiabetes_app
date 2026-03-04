from PIL import Image
import os
import math

def hex_to_rgb(h):
    h = h.lstrip('#')
    return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))

def rgb_to_hsv(r, g, b):
    r, g, b = r / 255.0, g / 255.0, b / 255.0
    mx = max(r, g, b)
    mn = min(r, g, b)
    df = mx - mn
    if mx == mn:
        h = 0
    elif mx == r:
        h = (60 * ((g - b) / df) + 360) % 360
    elif mx == g:
        h = (60 * ((b - r) / df) + 120) % 360
    elif mx == b:
        h = (60 * ((r - g) / df) + 240) % 360
    s = 0 if mx == 0 else (df / mx)
    v = mx
    return h, s, v

def replace_color_hue(image_path, target_color):
    try:
        img = Image.open(image_path)
        img = img.convert("RGBA")
        datas = img.getdata()
        
        target_r, target_g, target_b = target_color
        
        newData = []
        # We want to replace all blue-ish and teal-ish hues with red
        for item in datas:
            r, g, b, a = item
            if a > 0:
                h, s, v = rgb_to_hsv(r, g, b)
                # Blue/teal is roughly 160-260 hue
                if 160 < h < 260 and s > 0.2 and v > 0.2:
                    # scale by brightness
                    brightness = v
                    new_r = min(255, int(target_r * brightness))
                    new_g = min(255, int(target_g * brightness))
                    new_b = min(255, int(target_b * brightness))
                    newData.append((new_r, new_g, new_b, a))
                    continue
            newData.append(item)
                
        img.putdata(newData)
        img.save(image_path, "PNG")
        print(f"Processed {image_path}")
    except Exception as e:
        print(f"Error processing {image_path}: {e}")

target = hex_to_rgb('#ed254e')
assets = ['assets/icon.png', 'assets/favicon.png', 'assets/splash-icon.png', 'assets/android-icon-foreground.png']
for f in assets:
    if os.path.exists(f):
        replace_color_hue(f, target)
    else:
        print(f"Not found: {f}")
