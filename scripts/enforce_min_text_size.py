import os
import glob
import re

def fix_min_font():
    files = glob.glob('src/**/*', recursive=True)
    count = 0
    for f in files:
        if os.path.isfile(f) and f.endswith(('.jsx', '.js', '.css')):
            with open(f, 'r', encoding='utf-8') as fl:
                content = fl.read()

            new_content = re.sub(r'text-\[1[0-2]px\]', 'text-[13px]', content)
            if new_content != content:
                with open(f, 'w', encoding='utf-8') as fl:
                    fl.write(new_content)
                count += 1
                print(f"Fixed min text size in {f}")
    print(f"Total files updated: {count}")

if __name__ == "__main__":
    fix_min_font()
