// 首页内容层集中维护静态资源和品牌文案，避免页面入口承担数据职责。
import communityStickerPack from '../../brand/stickers/redy-community-sticker-pack-v1.png';
import expressionPack from '../../brand/stickers/expressions/redy-expression-pack-v1.png';
import logoLockup from '../../brand/logo/redy-logo-lockup-transparent.png';
import iconPrimary from '../../brand/icons/redy-icon-primary.png';
import wegitIcon from '../../brand/icons/wegit-icon-minimal.png';
import wemailIcon from '../../brand/icons/wemail-icon-minimal.png';
import weopenIcon from '../../brand/icons/weopen-icon-minimal.png';
import githubHeader from '../../brand/scenes/github-header-weopen.png';
import wemailReadmeHeader from '../../brand/banners/wemail-readme-header.png';
import wegitReadmeHeader from '../../brand/banners/wegit-readme-header.png';
import weopenReadmeHeader from '../../brand/banners/weopen-readme-header.png';

// 顶部导航只指向本页锚点，类型约束保证 href 始终是 section id。
export const navigation = [
  { label: '品牌故事', href: '#story' },
  { label: '视觉系统', href: '#visual-system' },
  { label: '应用场景', href: '#use-cases' },
  { label: '品牌文案', href: '#voice' },
] satisfies Array<{ label: string; href: `#${string}` }>;

// Hero 项目入口绑定真实仓库链接和最小化项目图标。
export const projectLinks = [
  {
    name: 'WeMail',
    href: 'https://github.com/WeOpen/WeMail',
    icon: wemailIcon.src,
  },
  {
    name: 'WeGit',
    href: 'https://github.com/WeOpen/WeGit',
    icon: wegitIcon.src,
  },
  {
    name: 'WeOpen',
    href: 'https://github.com/WeOpen/WeOpen',
    icon: weopenIcon.src,
  },
] satisfies Array<{ name: string; href: string; icon: string }>;

// 页面区块统一消费 src 字符串，避免每个区块重复导入品牌图片。
export const homeImages = {
  standardMascot: communityStickerPack.src,
  chibiMascot: expressionPack.src,
  logoLockup: logoLockup.src,
  iconPrimary: iconPrimary.src,
  githubHeader: githubHeader.src,
};

// 词云顺序会影响 CSS nth-child 布局，调整时需要同时检查桌面端重叠情况。
export const traits = [
  '冷静',
  '极客',
  '温和',
  '可靠',
  '专注',
  '审慎',
  '观察者',
  '维护者',
  '共建者',
  '准备就绪',
  '协作',
  '筛选',
  '整理',
  '生长',
  '开放',
];

// 品牌人格用成对短句表达正反边界，避免文案落入空泛营销话术。
export const valuePairs = [
  ['Warm, not noisy', '让技术品牌保留温度，但不走夸张、喧闹的表达路线。'],
  ['Technical, not cold', '保留 Git、分支、提交、模块入口等技术语义，同时避免工具感过重。'],
  ['Reliable, not rigid', '传达准备就绪、可靠协作的气质，让品牌看起来稳，但不僵硬。'],
  ['Curious, not chaotic', '像代码园丁一样观察、筛选、整理，让开源生态更有秩序地生长。'],
] satisfies Array<[string, string]>;

// 视觉系统条目覆盖识别形态、角色锚点和可延展的图形语言。
export const visualItems = [
  {
    title: '识别形态',
    body: '由 Logo / Icon、社区贴纸、表情包与园丁场景组成，覆盖社群传播、文档配图、反馈提示和官网主视觉。',
  },
  {
    title: '标志性特征',
    body: '护目镜、工具腰带与蓬松尾巴构成 Redy 的三大识别锚点，让角色在不同尺寸和场景中仍然可辨认。',
  },
  {
    title: '图形语言',
    body: 'Git 分支线、项目节点、模块卡片与像素笔刷尾巴共同组成辅助语言，支持官网、README、CLI 和运营物料延展。',
  },
] satisfies Array<{ title: string; body: string }>;

// 色板顺序对应首页色卡展示，新增颜色时应同步品牌 token 和规范文档。
export const palette = [
  ['主体锈红', '#C14B30'],
  ['奶油白', '#F6F1E9'],
  ['深炭灰', '#2D2A2E'],
  ['Git 绿', '#2CC68E'],
  ['暖米背景', '#F8F5F0'],
  ['柔边棕褐', '#8B6E54'],
] satisfies Array<[string, string]>;

// 应用场景连接官网、仓库、README、CLI 和异常页，体现同一套品牌语义。
export const useCases = [
  {
    title: '官网 Hero',
    body: '用开源森林与园丁概念建立第一印象，让 Redy 和 WeMail、WeGit、WeOpen 三个项目自然出现在同一个生态场景中。',
  },
  {
    title: 'GitHub Header',
    body: '通过 Redy 主视觉、Git 分支结构、项目节点与品牌字标，统一组织主页和仓库首页的第一视觉印象。',
  },
  {
    title: 'README / Badge',
    body: '让 WeMail、WeGit、WeOpen 拥有同一母品牌下的头图、图标与 Badge，同时保留各自的产品识别重点。',
  },
  {
    title: 'CLI 欢迎界面',
    body: '把初始化、扫描分支、cherry-pick 与 ready 状态转化为简洁的开场语，让命令行也有 Redy 的极客仪式感。',
  },
  {
    title: '404 / 异常页',
    body: '使用轻量化 Redy 表达“暂时没有找到路径”的状态，在保持清晰反馈的同时延续品牌温度。',
  },
] satisfies Array<{ title: string; body: string }>;

// README 资源保留各项目差异，同时维持 WeOpen 母品牌下的一致展示方式。
export const readmeAssets = [
  {
    name: 'WeMail',
    alt: 'WeMail README 头图',
    src: wemailReadmeHeader.src,
    body: '信封、蜡封、云轮廓和临时邮件卡片共同表达可信、私密、被正式递送的通信气质。',
  },
  {
    name: 'WeGit',
    alt: 'WeGit README 头图',
    src: wegitReadmeHeader.src,
    body: 'branch graph、commit node 与原生窗口轮廓承接版本演化、协作流程和桌面工具方向。',
  },
  {
    name: 'WeOpen',
    alt: 'WeOpen README 头图',
    src: weopenReadmeHeader.src,
    body: '模块卡片、控制台面板和统一入口框架强化平台感，呈现 WeOpen 作为生态主入口的角色。',
  },
] satisfies Array<{ name: string; alt: string; src: string; body: string }>;

// 品牌短句用于官网、README、CLI 等轻量触点，保持短促且可复用。
export const voiceItems = [
  'WeOpen · Redy | Open source, warm and ready.',
  'Build. Pick. Evolve.',
  'Grow your open-source forest.',
  'Ready to open, ready to collaborate.',
  'Keep it open, keep it warm.',
  'Ready to merge.',
];
