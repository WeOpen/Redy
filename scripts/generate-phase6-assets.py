from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parents[1]
WARM_RICE = "#F8F5F0"
CREAM = "#F6F1E9"
REDY_RUST = "#C14B30"
CHARCOAL = "#2D2A2E"
GIT_GREEN = "#2CC68E"
SOFT_BROWN = "#8B6E54"
PANEL = "#E9DED1"


def font(size: int, bold: bool = False):
    path = Path("C:/Windows/Fonts/msyhbd.ttc" if bold else "C:/Windows/Fonts/msyh.ttc")
    return ImageFont.truetype(str(path), size)


def rounded(draw, box, radius, fill, outline=None, width=1):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def load_rgba(path):
    return Image.open(ROOT / path).convert("RGBA")


def contain(img, size):
    out = img.copy()
    out.thumbnail(size, Image.Resampling.LANCZOS)
    return out


def paste_center(base, img, box):
    x0, y0, x1, y1 = box
    x = x0 + ((x1 - x0) - img.width) // 2
    y = y0 + ((y1 - y0) - img.height) // 2
    base.alpha_composite(img, (x, y))


def trim_pose(img, padding=8):
    pixels = img.convert("RGBA")
    mask = Image.new("L", pixels.size, 0)
    data = []
    for r, g, b, a in pixels.getdata():
        near_sheet_bg = r > 235 and g > 228 and b > 218
        data.append(0 if a == 0 or near_sheet_bg else 255)
    mask.putdata(data)
    bbox = mask.getbbox()
    if not bbox:
        return pixels
    left = max(0, bbox[0] - padding)
    top = max(0, bbox[1] - padding)
    right = min(pixels.width, bbox[2] + padding)
    bottom = min(pixels.height, bbox[3] + padding)
    return pixels.crop((left, top, right, bottom))


def write_text_center(draw, xy, text, fnt, fill):
    box = draw.textbbox((0, 0), text, font=fnt)
    draw.text((xy[0] - (box[2] - box[0]) / 2, xy[1] - (box[3] - box[1]) / 2), text, font=fnt, fill=fill)


def draw_branch(draw, origin, scale=1.0, color=GIT_GREEN, width=8):
    x, y = origin
    pts = [(x, y), (x + 42 * scale, y - 28 * scale), (x + 92 * scale, y - 28 * scale)]
    draw.line(pts, fill=color, width=int(width * scale), joint="curve")
    for px, py in [(x, y), (x + 42 * scale, y - 28 * scale), (x + 92 * scale, y - 28 * scale)]:
        draw.ellipse((px - 10 * scale, py - 10 * scale, px + 10 * scale, py + 10 * scale), fill=CREAM, outline=color, width=max(2, int(4 * scale)))


def make_stickers():
    out_dir = ROOT / "brand" / "stickers"
    out_dir.mkdir(parents=True, exist_ok=True)
    pose_sheet = load_rgba("brand/tmp/redy-shape-d-chibi-sheet.png")
    sheet = Image.new("RGBA", (1600, 1500), WARM_RICE)
    draw = ImageDraw.Draw(sheet)
    title_font = font(64, True)
    label_font = font(34, True)
    small_font = font(24)
    draw.text((72, 58), "Redy 社群贴纸初版", font=title_font, fill=CHARCOAL)
    draw.text((76, 132), "Pose extensions from Hello to Break, ready for community reactions.", font=small_font, fill=SOFT_BROWN)

    variants = [
        ("Hello", "HELLO", "#F6F1E9", (652, 506, 742, 584)),
        ("Good Job", "GOOD", "#DDF7EE", (804, 500, 896, 584)),
        ("Cherry-pick", "PICK", "#FDE8BC", (954, 506, 1064, 588)),
        ("Merge Done", "MERGE", "#F6F1E9", (1106, 502, 1212, 584)),
        ("Hmm?", "?", "#F6F1E9", (636, 658, 754, 742)),
        ("404", "404", "#F0FAFC", (786, 658, 908, 750)),
        ("Coding", ">_", "#F6F1E9", (946, 666, 1068, 744)),
        ("Break", "COFFEE", "#E9DED1", (1112, 658, 1220, 744)),
    ]
    positions = [(64, 210), (442, 210), (820, 210), (1198, 210), (64, 760), (442, 760), (820, 760), (1198, 760)]

    for idx, ((title, badge, bg, crop_box), (x, y)) in enumerate(zip(variants, positions), start=1):
        card = Image.new("RGBA", (340, 460), (0, 0, 0, 0))
        cd = ImageDraw.Draw(card)
        rounded(cd, (12, 12, 328, 438), 42, bg, SOFT_BROWN, 4)
        rounded(cd, (28, 30, 312, 302), 34, (255, 255, 255, 130), None, 0)

        pose = pose_sheet.crop(crop_box)
        pose = contain(pose, (286, 250))
        paste_center(card, pose, (24, 42, 316, 292))

        rounded(cd, (44, 322, 296, 374), 25, CHARCOAL, None, 0)
        write_text_center(cd, (170, 346), title, label_font, CREAM)
        cd.text((32, 396), f"Redy #{idx:02d}", font=small_font, fill=SOFT_BROWN)
        if badge in (">_", "404", "?"):
            cd.text((260, 54), badge, font=font(34, True), fill=GIT_GREEN if badge == ">_" else REDY_RUST)
        else:
            draw_branch(cd, (236, 78), .52)
        sheet.alpha_composite(card, (x, y))

        single = Image.new("RGBA", (512, 512), (0, 0, 0, 0))
        sticker = contain(card, (480, 480))
        paste_center(single, sticker, (0, 0, 512, 512))
        safe_title = title.lower().replace(" ", "-").replace("?", "hmm").replace("!", "")
        single.save(out_dir / f"redy-sticker-{idx:02d}-{safe_title}.png")

    draw.text((70, 1430), "Use as community stickers, docs reactions, lightweight onboarding moments.", font=small_font, fill=SOFT_BROWN)
    # The official sticker sheet is generated directly from the image model so
    # the poses are fully redrawn instead of cropped from the reference sheet.
    # Preserve that curated bitmap when this helper is rerun for poster/merch.
    pack_path = out_dir / "redy-community-sticker-pack-v1.png"
    if not pack_path.exists():
        sheet.save(pack_path)


def make_poster():
    out_dir = ROOT / "brand" / "posters"
    out_dir.mkdir(parents=True, exist_ok=True)
    poster_path = out_dir / "redy-event-poster-kv-v1.png"
    if poster_path.exists():
        print(f"skip existing manually revised poster: {poster_path}")
        return
    chibi = contain(load_rgba("brand/mascot/chibi/redy-chibi.png"), (560, 560))
    icons = [
        contain(load_rgba("brand/icons/wemail-icon.png"), (150, 150)),
        contain(load_rgba("brand/icons/wegit-icon.png"), (150, 150)),
        contain(load_rgba("brand/icons/weopen-icon.png"), (150, 150)),
    ]
    img = Image.new("RGBA", (1600, 900), WARM_RICE)
    draw = ImageDraw.Draw(img)
    draw.rectangle((0, 0, 1600, 900), fill=WARM_RICE)
    draw.rounded_rectangle((72, 72, 1528, 828), radius=56, fill="#FFF9F0", outline="#D8C8B4", width=3)
    draw.text((140, 150), "Build. Pick. Evolve.", font=font(88, True), fill=CHARCOAL)
    draw.text((146, 258), "WeOpen × Redy  开源协作传播 KV", font=font(34, True), fill=REDY_RUST)
    draw.text((148, 324), "Keep it open, keep it warm.", font=font(42), fill=SOFT_BROWN)
    draw_branch(draw, (152, 454), 1.5, GIT_GREEN, 7)
    draw.text((150, 538), "WeMail / WeGit / WeOpen", font=font(30, True), fill=CHARCOAL)
    draw.text((152, 590), "Mascot assets for product, docs, CLI, and community.", font=font(25), fill=SOFT_BROWN)
    for i, icon in enumerate(icons):
        x = 148 + i * 178
        draw.rounded_rectangle((x, 672, x + 132, 804), radius=30, fill=CREAM, outline="#D8C8B4", width=2)
        paste_center(img, icon, (x + 10, 682, x + 122, 794))
    draw.ellipse((1012, 176, 1460, 742), fill="#F1E1CF")
    img.alpha_composite(chibi, (938, 168))
    draw.rounded_rectangle((1104, 738, 1454, 790), radius=26, fill=CHARCOAL)
    write_text_center(draw, (1279, 762), "READY TO OPEN", font(28, True), CREAM)
    img.save(poster_path)


def make_merch_board():
    out_dir = ROOT / "brand" / "merch"
    out_dir.mkdir(parents=True, exist_ok=True)
    chibi = contain(load_rgba("brand/mascot/chibi/redy-chibi.png"), (260, 260))
    logo = contain(load_rgba("brand/logo/redy-logo-lockup-transparent.png"), (180, 180))
    img = Image.new("RGBA", (1600, 1000), WARM_RICE)
    draw = ImageDraw.Draw(img)
    draw.text((80, 60), "Redy 周边打样启动板", font=font(64, True), fill=CHARCOAL)
    draw.text((84, 132), "Sticker / Tee / Tote / Mug first sampling directions", font=font(28), fill=SOFT_BROWN)

    panels = [(80, 210, 480, 850), (520, 210, 920, 850), (960, 210, 1320, 850), (1360, 210, 1520, 850)]
    labels = ["贴纸包", "T-shirt", "托特包", "马克杯"]
    for box, label in zip(panels, labels):
        rounded(draw, box, 42, "#FFF9F0", "#D8C8B4", 3)
        write_text_center(draw, ((box[0] + box[2]) // 2, box[1] + 48), label, font(30, True), CHARCOAL)

    # Sticker pack
    for i in range(3):
        for j in range(2):
            x = 126 + i * 110
            y = 310 + j * 150
            draw.ellipse((x, y, x + 88, y + 88), fill=CREAM, outline=SOFT_BROWN, width=3)
            small = contain(chibi, (78, 78))
            paste_center(img, small, (x + 5, y + 5, x + 83, y + 83))
    draw_branch(draw, (168, 690), 1.2)

    # Tee
    draw.polygon([(650, 305), (590, 395), (640, 450), (680, 400), (680, 760), (800, 760), (800, 400), (840, 450), (890, 395), (830, 305)], fill=CREAM, outline=SOFT_BROWN)
    paste_center(img, logo, (664, 450, 816, 622))
    draw.text((625, 798), "胸前小章 + 背后 branch line", font=font(22), fill=SOFT_BROWN)

    # Tote
    draw.arc((1060, 290, 1220, 430), 180, 360, fill=SOFT_BROWN, width=8)
    draw.rounded_rectangle((1032, 370, 1250, 760), radius=20, fill=CREAM, outline=SOFT_BROWN, width=5)
    paste_center(img, chibi, (1070, 470, 1215, 645))
    draw.text((1036, 798), "暖米帆布 + Redy Q版", font=font(22), fill=SOFT_BROWN)

    # Mug
    draw.rounded_rectangle((1388, 420, 1502, 655), radius=28, fill=CREAM, outline=SOFT_BROWN, width=5)
    draw.arc((1482, 470, 1558, 610), -80, 90, fill=SOFT_BROWN, width=8)
    tiny = contain(chibi, (92, 92))
    paste_center(img, tiny, (1398, 485, 1492, 585))
    draw.text((1372, 798), "镜片微光版", font=font(22), fill=SOFT_BROWN)

    img.save(out_dir / "redy-merch-sampling-board-v1.png")


def main():
    make_stickers()
    make_poster()
    make_merch_board()


if __name__ == "__main__":
    main()
