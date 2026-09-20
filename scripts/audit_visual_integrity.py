#!/usr/bin/env python3
"""Fail fast when the scene markup and its visual stylesheet drift apart."""
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
html = (ROOT / "index.html").read_text(encoding="utf-8")
css = (ROOT / "css/styles.css").read_text(encoding="utf-8")
main_js = (ROOT / "js/main.js").read_text(encoding="utf-8")
all_text = html + css + main_js + (ROOT / "js/animation.js").read_text(encoding="utf-8")

assert not re.search(r"^(<<<<<<<|=======|>>>>>>>)", all_text, re.MULTILINE), "conflict marker found"

class SceneParser(HTMLParser):
    void = {"meta", "link", "br", "hr", "img", "input", "path", "circle", "ellipse", "stop", "use", "feGaussianBlur", "feDropShadow"}
    def __init__(self):
        super().__init__()
        self.stack = []
        self.ids = []
        self.parents = {}
        self.classes = set()
    def handle_starttag(self, tag, attrs):
        data = dict(attrs)
        element_id = data.get("id")
        self.classes.update(data.get("class", "").split())
        if element_id:
            self.ids.append(element_id)
            self.parents[element_id] = next((item[1] for item in reversed(self.stack) if item[1]), None)
        if tag not in self.void:
            self.stack.append((tag, element_id))
    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in self.void:
            self.stack.pop()
    def handle_endtag(self, tag):
        for index in range(len(self.stack) - 1, -1, -1):
            if self.stack[index][0] == tag:
                del self.stack[index:]
                return

scene = SceneParser()
scene.feed(html)
duplicates = [item for item, count in Counter(scene.ids).items() if count > 1]
assert not duplicates, f"duplicate IDs: {duplicates}"
assert scene.parents.get("left-shoe") == "left-leg", "left shoe is detached from left leg"
assert scene.parents.get("right-shoe") == "right-leg", "right shoe is detached from right leg"
assert scene.parents.get("bouquet") == "bouquet-arm", "bouquet is detached from carrying arm"
assert html.count('d="M0 25C-20-3-8-34 7-16 23-38 39-9 20 24Z"') == 12, "bouquet must contain exactly 12 blooms"
assert 'id="bob"' in html, "character missing from DOM"

required_rules = {
    ".world", ".sky", ".seafloor", ".ground-path", ".pineapple-house",
    ".pineapple-body", ".pineapple-grid", ".house-windows", ".house-door",
    ".field-back", ".field-mid", ".foreground-field", ".garden-tulip",
    ".character", ".sponge-body", ".nose", ".bouquet-blooms",
    ".letter-stage", ".final", ".farewell",
}
missing = sorted(rule for rule in required_rules if rule not in css)
assert not missing, f"missing CSS rules: {missing}"
compatibility_rules = {
    ".ocean", ".camera", ".scenery", ".floor", ".road", ".house",
    ".pine-body", ".pine-texture", ".windows", ".door", ".flower-field",
    ".flower-field--back", ".flower-field--mid", ".flower-field--front",
    ".bob-wrap", ".sponge", ".pants", ".limb", ".tulip-head",
}
missing_compatibility = sorted(rule for rule in compatibility_rules if rule not in css)
assert not missing_compatibility, f"missing compatibility rules: {missing_compatibility}"
assert css.count(":root{") == 1 and css.count(".experience{") == 1, "multiple complete CSS implementations detected"
assert "populateSvgGarden(backField, 48" in main_js, "background garden population missing"
assert "populateSvgGarden(midFields[0], 16" in main_js and "populateSvgGarden(midFields[1], 16" in main_js, "midground garden population missing"
assert len(re.findall(r"\[[\d.-]+, [\d.-]+, [\d.-]+, -?[\d.-]+\]", main_js.split("const foregroundLayout = [", 1)[1].split("];", 1)[0])) == 40, "foreground layout must define 40 tulips per side"
assert "setAttribute('height', Math.round(width * 2.5))" in main_js, "SVG garden tulips need an explicit height"
print("Visual integrity audit passed: compatible CSS, connected rig, 12-flower bouquet, and populated 72/56/80 garden layers.")
