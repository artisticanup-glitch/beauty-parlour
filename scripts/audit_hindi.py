import re

def audit_file(file_path):
    print(f"Auditing {file_path} for English words in Hindi fields...")
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Look for all string values after a colon
    matches = re.findall(r':\s*"([^"]+)"', content)
    matches += re.findall(r':\s*`([^`]+)`', content)

    for val in matches:
        eng = re.findall(r'[A-Za-z]+', val)
        if eng:
            print(f"  Found English: {eng} in '{val}'")

if __name__ == "__main__":
    audit_file("src/i18n/hi.js")
    audit_file("src/data/services.js")
    audit_file("src/data/packages.js")
    audit_file("src/data/gallery.js")
    audit_file("src/data/reviews.js")
    audit_file("src/data/faq.js")
    audit_file("src/data/site.js")
