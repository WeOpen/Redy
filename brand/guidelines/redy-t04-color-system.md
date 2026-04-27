# T04 Redy 色板与三项目强调色规范

## 任务结论

T04 已确认主色板与 WeMail / WeGit / WeOpen 三项目强调色规范，标准交付文件为：
- `brand/tokens/color.tokens.json`
- `brand/guidelines/redy-t04-color-system.md`

## 母品牌主色板

| Token | Hex | 用途 |
| --- | --- | --- |
| `color.brand.redyRust` | `#C14B30` | Redy 主体毛发、主视觉强调、母品牌识别 |
| `color.brand.cream` | `#F6F1E9` | 面部、胸口、耳内、温暖浅色表面 |
| `color.brand.charcoal` | `#2D2A2E` | 文字、护目镜皮带、深色结构细节 |
| `color.brand.gitGreen` | `#2CC68E` | Git 分支、终端光标、镜片反光、小面积反馈 |
| `color.brand.warmRice` | `#F8F5F0` | 官网背景、规范页底色、柔和留白 |
| `color.brand.softBrown` | `#8B6E54` | 柔边描线、皮革、圆环和温暖结构线 |

## 三项目强调色

| 项目 | Token | Hex | 角色 |
| --- | --- | --- | --- |
| WeMail | `color.project.wemail.cloudMist` | `#DDE8EC` | 信封、收件箱、云雾感辅助面 |
| WeMail | `color.project.wemail.coolLight` | `#F0FAFC` | 邮件卡片高光、轻量通信表面 |
| WeMail | `color.project.wemail.waxSeal` | `#A75A4C` | 蜡封、可信投递、私密标记 |
| WeGit | `color.project.wegit.branchGreen` | `#2CC68E` | branch graph、commit node、技术反馈 |
| WeGit | `color.project.wegit.graphTint` | `#DDF7EE` | 分支图浅底、节点柔和填充 |
| WeGit | `color.project.wegit.graphDark` | `#2F4F46` | 分支结构线、深色技术细节 |
| WeOpen | `color.project.weopen.platformRice` | `#E9DED1` | 平台面板、模块卡片、组织入口底色 |
| WeOpen | `color.project.weopen.panelBrown` | `#B58A68` | 控制台框架、模块边界、温暖结构层 |
| WeOpen | `color.project.weopen.rustExtension` | `#C14B30` | 与母品牌 Redy 的小面积延展 |

## 使用规则

- Redy 母品牌画面优先使用 `redyRust`、`cream`、`charcoal`、`warmRice` 与 `softBrown`；`gitGreen` 只能作为小面积技术强调。
- 三项目不另建独立主色体系，只在同一母品牌语境里使用轻量强调色。
- 同一画面最多让一个项目强调色成为局部焦点，避免 WeMail、WeGit、WeOpen 的辅助色互相抢占。
- WeMail 必须保留蜡封或信封语义；WeGit 必须保留 Git 绿色与分支结构；WeOpen 必须更稳、更中性，强调平台入口和模块骨架。
- 后续图标、Badge、README 头图、官网 Hero 与 CLI 输出均应从 `brand/tokens/color.tokens.json` 读取或手动映射这些 token。
