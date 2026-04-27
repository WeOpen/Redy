# T15 三项目图标系统校对结果

## 校对结论

T15 已完成 WeMail / WeGit / WeOpen 三项目图标系统校对。三组资产采用统一母品牌语法，同时保留项目差异：
- 统一：圆角容器、暖白底、柔边棕线、深炭结构线、小面积项目强调色。
- 差异：WeMail 以信封与蜡封识别；WeGit 以 branch graph 与 commit node 识别；WeOpen 以模块卡片与统一入口识别。

## 交付资产

| 任务 | 资产 |
| --- | --- |
| T06 | `brand/icons/wemail-icon.svg` |
| T07 | `brand/icons/wemail-icon-minimal.svg` |
| T08 | `brand/icons/wemail-badge.png` |
| T09 | `brand/icons/wegit-icon.svg` |
| T10 | `brand/icons/wegit-icon-minimal.svg` |
| T11 | `brand/icons/wegit-badge.png` |
| T12 | `brand/icons/weopen-icon.svg` |
| T13 | `brand/icons/weopen-icon-minimal.svg` |
| T14 | `brand/icons/weopen-badge.png` |

## 通过项

- WeMail 已包含蜡封元素，不再停留在文案层。
- WeGit 沿用 Redy 的 Git 绿，不新增独立主色。
- WeOpen 使用暖灰米色与锈红延展，视觉更稳、更平台化。
- 主图标与极简图标均为 SVG，便于后续前端和设计继续调整。
- Badge 统一为 `960×320 px` PNG，可直接用于 README 或展示页占位。

## 后续建议

- 阶段 3 的 README 头图应直接复用本轮主图标，不重新发明项目符号。
- 若后续制作 Figma 源文件，应以本轮 SVG 为源矢量导入。
- 小尺寸 favicon 场景优先使用 `*-icon-minimal.svg`。
