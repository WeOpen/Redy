from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Image, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "brand" / "guidelines" / "redy-brand-guidelines.pdf"
FONT_REGULAR = "NotoSansSC"
FONT_PATH = Path("C:/Windows/Fonts/simsun.ttc")


def image(path: str, width_mm: int):
    full_path = ROOT / path
    img = Image(str(full_path))
    ratio = img.imageHeight / img.imageWidth
    img.drawWidth = width_mm * mm
    img.drawHeight = width_mm * mm * ratio
    return img


def table(rows):
    t = Table(rows, hAlign="LEFT", colWidths=[46 * mm, 94 * mm])
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#F6F1E9")),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.HexColor("#2D2A2E")),
                ("FONTNAME", (0, 0), (-1, -1), FONT_REGULAR),
                ("FONTSIZE", (0, 0), (-1, -1), 9),
                ("LEADING", (0, 0), (-1, -1), 13),
                ("GRID", (0, 0), (-1, -1), 0.35, colors.HexColor("#D8C8B4")),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 7),
                ("RIGHTPADDING", (0, 0), (-1, -1), 7),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
            ]
        )
    )
    return t


def main():
    pdfmetrics.registerFont(TTFont(FONT_REGULAR, str(FONT_PATH), subfontIndex=0))

    styles = getSampleStyleSheet()
    title = ParagraphStyle(
        "TitleCN",
        parent=styles["Title"],
        fontName=FONT_REGULAR,
        fontSize=24,
        leading=31,
        textColor=colors.HexColor("#2D2A2E"),
        spaceAfter=12,
    )
    h2 = ParagraphStyle(
        "H2CN",
        parent=styles["Heading2"],
        fontName=FONT_REGULAR,
        fontSize=15,
        leading=20,
        textColor=colors.HexColor("#C14B30"),
        spaceBefore=12,
        spaceAfter=8,
    )
    body = ParagraphStyle(
        "BodyCN",
        parent=styles["BodyText"],
        fontName=FONT_REGULAR,
        fontSize=10.5,
        leading=16,
        textColor=colors.HexColor("#2D2A2E"),
        spaceAfter=7,
    )

    doc = SimpleDocTemplate(
        str(OUT),
        pagesize=A4,
        rightMargin=18 * mm,
        leftMargin=18 * mm,
        topMargin=16 * mm,
        bottomMargin=16 * mm,
        title="Redy Brand Guidelines",
        author="WeOpen",
    )

    story = [
        Paragraph("Redy 品牌视觉规范", title),
        Paragraph("WeOpen mascot and visual identity package", body),
        image("brand/mascot/chibi/redy-chibi.png", 72),
        Spacer(1, 5 * mm),
        Paragraph("1. 品牌定位", h2),
        Paragraph(
            "Redy 是 WeOpen 的开源生态维护者、代码园丁与分支探险家。它以温和手绘感为主体，以 Git 绿色微光、护目镜和工具腰带表达技术观察与协作维护能力。",
            body,
        ),
        Paragraph("2. 核心资产", h2),
        table(
            [
                ["资产", "路径"],
                ["主 Logo", "brand/logo/weopen-redy-primary.svg"],
                ["极简头像", "brand/logo/weopen-redy-avatar.png"],
                ["标准立绘", "brand/mascot/standard/redy-full-body.png"],
                ["Q 版迷你版", "brand/mascot/chibi/redy-chibi.png"],
                ["GitHub Header", "brand/scenes/github-header-weopen.png"],
            ]
        ),
        Paragraph("3. 色彩系统", h2),
        table(
            [
                ["Token", "Hex / 用途"],
                ["redyRust", "#C14B30 / Redy 主体毛发与母品牌强调"],
                ["cream", "#F6F1E9 / 面部、胸口、暖色表面"],
                ["charcoal", "#2D2A2E / 文本、护目镜、深色结构"],
                ["gitGreen", "#2CC68E / Git、终端、镜片微光"],
                ["warmRice", "#F8F5F0 / 页面与规范底色"],
                ["softBrown", "#8B6E54 / 柔边描线、皮革、结构线"],
            ]
        ),
        Paragraph("4. 三项目识别", h2),
        table(
            [
                ["项目", "识别规则"],
                ["WeMail", "信封、蜡封、收件箱、临时邮件卡片；使用云雾蓝灰与蜡封红棕局部强调。"],
                ["WeGit", "branch graph、commit node、仓库标识；延续 Git 绿，不另造独立主色。"],
                ["WeOpen", "模块卡片、控制台面板、dashboard 骨架；使用暖灰米色与少量锈红延展。"],
            ]
        ),
        Paragraph("5. 动效规则", h2),
        Paragraph(
            "动效以 motion.tokens.json 为准。默认使用 softAppear、goggleGlint、branchPulse 与 tinyWave。所有装饰循环必须支持 prefers-reduced-motion，并避免高弹跳、频繁抖动或吵闹反馈。",
            body,
        ),
        Paragraph("6. 导出与源文件", h2),
        table(
            [
                ["交付项", "路径"],
                ["SVG 导出包", "brand/exports/svg/"],
                ["PNG 导出包", "brand/exports/png/"],
                ["Figma 交接包", "brand/figma/README.md"],
                ["资产清单", "brand/guidelines/redy-asset-checklist.md"],
            ]
        ),
        Paragraph("7. 使用边界", h2),
        Paragraph(
            "不要把 Redy 改成过度夸张、吵闹或纯幼态的 mascot；不要重新启用水果符号系统；项目视觉差异必须建立在统一母品牌系统之内。",
            body,
        ),
    ]

    doc.build(story)
    print(OUT)


if __name__ == "__main__":
    main()
