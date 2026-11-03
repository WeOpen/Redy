#!/usr/bin/env python3
"""Render candidate Redy 2.0 SVG icon family into reproducible PNG exports.

Requires: pip install cairosvg pillow
The generated icons are candidates only and do not overwrite active website assets.
"""

from __future__ import annotations

import argparse
from pathlib import Path
import xml.etree.ElementTree as ET

import cairosvg
from PIL import Image

SIZES = {
    16: "nano-v1.svg",
    32: "micro-v1.svg",
    48: "micro-v1.svg",
    64: "micro-v1.svg",
    96: "micro-v1.svg",
    128: "standard-v1.svg",
    180: "standard-v1.svg",
    192: "standard-v1.svg",
    256: "standard-v1.svg",
    512: "standard-v1.svg",
}


def check_vector(svg_path: Path) -> None:
    root = ET.parse(svg_path).getroot()
    if not root.tag.endswith("}svg") or root.attrib.get("viewBox") is None:
        raise ValueError(f"Missing SVG/viewBox: {svg_path}")
    tags = [node.tag.split("}")[-1] for node in root.iter()]
    if "title" not in tags or "desc" not in tags:
        raise ValueError(f"Missing accessible title/description: {svg_path}")
    if any(tag in tags for tag in ["image", "script", "foreignObject"]):
        raise ValueError(f"Embedded raster/script not allowed: {svg_path}")
    if "data:image/" in svg_path.read_text(encoding="utf8"):
        raise ValueError(f"Embedded raster data not allowed: {svg_path}")


def export(source_dir: Path, output_dir: Path) -> None:
    output_dir.mkdir(parents=True, exist_ok=True)
    for filename in sorted(set(SIZES.values())):
        check_vector(source_dir / filename)
    for size, filename in SIZES.items():
        output = output_dir / f"redy-2-icon-{size}.png"
        cairosvg.svg2png(url=str(source_dir / filename), write_to=str(output), output_width=size, output_height=size)
        with Image.open(output) as img:
            if img.size != (size, size) or img.mode != "RGBA":
                raise ValueError(f"Invalid PNG size or mode: {output}")
        print(f"{filename} => {output.name}")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source-dir", type=Path, default=Path(__file__).resolve().parents[1] / "brand/icons/redy-2")
    parser.add_argument("--output-dir", type=Path, required=True)
    args = parser.parse_args()
    export(args.source_dir, args.output_dir)


if __name__ == "__main__":
    main()
