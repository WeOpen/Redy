import React from 'react';
import standardMascot from '../brand/mascot/standard/redy-full-body.png';
import chibiMascot from '../brand/tmp/redy-shape-d-chibi-sheet.png';
import logoLockup from '../brand/logo/redy-logo-lockup-transparent.png';
import iconPrimary from '../brand/icons/redy-icon-primary.png';
import wegitIcon from '../brand/icons/wegit-icon-minimal.png';
import wemailIcon from '../brand/icons/wemail-icon-minimal.png';
import weopenIcon from '../brand/icons/weopen-icon-minimal.png';
import githubHeader from '../brand/scenes/github-header-weopen.png';
import wemailReadmeHeader from '../brand/banners/wemail-readme-header.png';
import wegitReadmeHeader from '../brand/banners/wegit-readme-header.png';
import weopenReadmeHeader from '../brand/banners/weopen-readme-header.png';
import TopbarNav from './topbar-nav';

const navigation = [
  { label: '品牌故事', href: '#story' },
  { label: '视觉系统', href: '#visual-system' },
  { label: '应用场景', href: '#use-cases' },
  { label: '品牌文案', href: '#voice' },
] satisfies Array<{ label: string; href: `#${string}` }>;

const projectLinks = [
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

const traits = ['冷静', '极客', '温和', '可靠', '专注', '审慎', '观察者', '维护者', '共建者'];

const valuePairs = [
  ['Warm, not noisy', '让技术品牌保留温度，但不走夸张、喧闹的表达路线。'],
  ['Technical, not cold', '保留 Git、分支、提交、模块入口等技术语义，同时避免工具感过重。'],
  ['Reliable, not rigid', '传达准备就绪、可靠协作的气质，让品牌看起来稳，但不僵硬。'],
  ['Curious, not chaotic', '像代码园丁一样观察、筛选、整理，让开源生态更有秩序地生长。'],
];

const visualItems = [
  {
    title: '识别形态',
    body: '由 Logo / Icon、标准立绘、园丁场景与轻量化形态组成，覆盖 favicon、仓库头像、README 头图和官网主视觉。',
  },
  {
    title: '标志性特征',
    body: '护目镜、工具腰带与蓬松尾巴构成 Redy 的三大识别锚点，让角色在不同尺寸和场景中仍然可辨认。',
  },
  {
    title: '图形语言',
    body: 'Git 分支线、项目节点、模块卡片与像素笔刷尾巴共同组成辅助语言，支持官网、README、CLI 和运营物料延展。',
  },
];

const palette = [
  ['主体锈红', '#C14B30'],
  ['奶油白', '#F6F1E9'],
  ['深炭灰', '#2D2A2E'],
  ['Git 绿', '#2CC68E'],
  ['暖米背景', '#F8F5F0'],
  ['柔边棕褐', '#8B6E54'],
];

const useCases = [
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
];

const readmeAssets = [
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
];

const voiceItems = [
  'WeOpen · Redy | Open source, warm and ready.',
  'Build. Pick. Evolve.',
  'Grow your open-source forest.',
  'Ready to open, ready to collaborate.',
  'Keep it open, keep it warm.',
  'Ready to merge.',
];

export default function HomePage() {
  return (
    <main className="page-shell">
      <div className="paper-noise" />
      <div className="paper-thread paper-thread--one" />
      <div className="paper-thread paper-thread--two" />
      <div className="branch-glow branch-glow-left" />
      <div className="branch-glow branch-glow-right" />

      <header className="topbar topbar--floating">
        <a className="brand-mark" href="#hero">
          <img alt="Redy 品牌图标" className="brand-mark__icon" src={iconPrimary.src} />
          <span>Redy</span>
        </a>
        <TopbarNav items={navigation} />
      </header>

      <section className="hero scroll-stage scroll-stage--hero" id="hero">
        <div className="hero__copy reveal-card reveal-card--hero">
          <div className="hero__beam" aria-hidden="true" />
          <div className="hero__track" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="hero__rail" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <p className="eyebrow">Open source, warm and ready.</p>
          <h1>Redy, the warm guardian of open source.</h1>
          <p className="lead">
            Redy 是 WeOpen 的开源生态维护者、代码园丁与分支探险家。它把温暖亲和的角色气质、Git 与开源文化的技术隐喻，以及 WeMail、WeGit、WeOpen 的项目识别连接成一套可长期使用的品牌视觉系统。
          </p>
          <div className="hero__actions">
            <a className="button button--primary" href="#story">
              <span className="button__label">了解 Redy</span>
              <span className="button__shine" aria-hidden="true" />
            </a>
            <a className="button button--secondary" href="#visual-system">
              <span className="button__label">查看视觉系统</span>
              <span className="button__shine" aria-hidden="true" />
            </a>
          </div>
          <div className="hero__notes">
            <span className="hero-note">开源生态维护者</span>
            <span className="hero-note">代码园丁</span>
            <span className="hero-note">分支探险家</span>
          </div>
        </div>

        <div className="hero__visual card-surface reveal-card reveal-card--visual">
          <div className="hero__lens-glow" aria-hidden="true" />
          <div className="hero__logo-panel">
            <img alt="Redy Logo Lockup" src={logoLockup.src} />
          </div>
          <div className="hero__asset-strip" aria-label="WeOpen 子项目入口">
            {projectLinks.map((project) => (
              <a
                key={project.name}
                className="hero__asset-card"
                href={project.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`打开 ${project.name} 项目`}
              >
                <img alt="" src={project.icon} aria-hidden="true" />
                <strong>{project.name}</strong>
              </a>
            ))}
          </div>
          <img alt="Redy GitHub Header 主视觉" className="hero__image" src={githubHeader.src} />
          <p className="hero__visual-note">
            Redy 在开源森林中观察分支、整理贡献，并把 WeMail、WeGit、WeOpen 三个项目节点连接到同一套 WeOpen 母品牌视觉里。
          </p>
        </div>
      </section>

      <section className="section-grid section-grid--story scroll-stage" id="story">
        <div className="section-marker" aria-hidden="true">
          <span className="section-marker__index">01</span>
          <span className="section-marker__label">Story</span>
        </div>
        <div className="section-heading">
          <span className="section-heading__rule" aria-hidden="true" />
          <p className="eyebrow">品牌故事</p>
          <h2>Redy 不只是一个角色形象，而是 WeOpen 的品牌人格化代表。</h2>
        </div>
        <div className="story-layout">
          <div className="card-surface prose-card reveal-card">
            <p>
              Redy 的命名来自 Red 与 Ready，既对应红熊猫的核心色彩，也传达“准备就绪、可靠、可协作”的品牌气质。它不是孤立的装饰图案，而是 WeOpen 在官网、GitHub、README、CLI 与社区传播中的共同角色入口。
            </p>
            <p>
              在叙事上，Redy 穿梭于代码森林，观察每一条分支、每一次提交与每一份贡献。它不再借助额外隐喻来解释项目，而是直接连接 WeMail、WeGit、WeOpen 三个核心产品，让品牌故事和实际产品生态保持一致。
            </p>
          </div>
          <div className="story-tags">
            <div className="note-card reveal-card">
              <strong>WeOpen 开源生态维护者</strong>
              <p>用观察、整理与维护建立长期品牌信任，让开源协作显得更可靠、更有温度。</p>
            </div>
            <div className="note-card reveal-card">
              <strong>代码园丁</strong>
              <p>把开源协作想象成持续生长的生态，而不是冷冰冰的流程堆叠。</p>
            </div>
            <div className="note-card reveal-card">
              <strong>分支探险家</strong>
              <p>将 Git 分支、提交节点与版本演化变成可被看见、可被记住的视觉语言。</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-grid scroll-stage" id="traits">
        <div className="section-marker" aria-hidden="true">
          <span className="section-marker__index">02</span>
          <span className="section-marker__label">Traits</span>
        </div>
        <div className="section-heading">
          <span className="section-heading__rule" aria-hidden="true" />
          <p className="eyebrow">品牌人格</p>
          <h2>温和，但不幼态；专业，但不疏离。</h2>
        </div>
        <div className="traits-layout">
          <div className="trait-cloud card-surface reveal-card">
            {traits.map((trait) => (
              <span key={trait} className="trait-pill">
                {trait}
              </span>
            ))}
          </div>
          <div className="value-pairs">
            {valuePairs.map(([title, body]) => (
              <div key={title} className="note-card">
                <strong>{title}</strong>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-grid scroll-stage" id="visual-system">
        <div className="section-marker" aria-hidden="true">
          <span className="section-marker__index">03</span>
          <span className="section-marker__label">Visual</span>
        </div>
        <div className="section-heading">
          <span className="section-heading__rule" aria-hidden="true" />
          <p className="eyebrow">视觉系统</p>
          <h2>从角色本体到图形语言，Redy 是一套可以被持续使用的品牌系统。</h2>
        </div>
        <div className="visual-layout">
          <div className="visual-gallery">
            <figure className="card-surface image-card reveal-card">
              <span className="image-card__halo" aria-hidden="true" />
              <img alt="Redy 标准立绘" src={standardMascot.src} />
              <figcaption>标准立绘</figcaption>
            </figure>
            <figure className="card-surface image-card reveal-card">
              <span className="image-card__halo" aria-hidden="true" />
              <img alt="Redy 轻量化形态" src={chibiMascot.src} />
              <figcaption>轻量化形态</figcaption>
            </figure>
          </div>
          <div className="visual-copy">
            {visualItems.map((item) => (
              <div key={item.title} className="note-card">
                <strong>{item.title}</strong>
                <p>{item.body}</p>
              </div>
            ))}
            <div className="palette-grid card-surface">
              {palette.map(([name, color]) => (
                <div key={name} className="swatch-item">
                  <span className="swatch" style={{ backgroundColor: color }} />
                  <div>
                    <strong>{name}</strong>
                    <p>{color}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-grid section-grid--contrast scroll-stage scroll-stage--contrast" id="use-cases">
        <div className="section-marker" aria-hidden="true">
          <span className="section-marker__index">04</span>
          <span className="section-marker__label">Use Cases</span>
        </div>
        <div className="section-heading">
          <span className="section-heading__rule" aria-hidden="true" />
          <p className="eyebrow">应用场景</p>
          <h2>官网、GitHub、README、CLI 与社区传播，都可以沿着同一套语义展开。</h2>
        </div>
        <div className="use-case-grid">
          {useCases.map((item) => (
            <article key={item.title} className="note-card use-case-card reveal-card">
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
        <div className="readme-assets" aria-label="README 视觉资源">
          {readmeAssets.map((asset) => (
            <figure key={asset.name} className="readme-asset card-surface reveal-card">
              <img alt={asset.alt} src={asset.src} />
              <figcaption>
                <strong>{asset.name}</strong>
                <span>{asset.body}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="section-grid section-grid--voice scroll-stage" id="voice">
        <div className="section-marker" aria-hidden="true">
          <span className="section-marker__index">05</span>
          <span className="section-marker__label">Voice</span>
        </div>
        <div className="section-heading">
          <span className="section-heading__rule" aria-hidden="true" />
          <p className="eyebrow">品牌文案</p>
          <h2>一句话建立记忆点，一组短句支撑长期复用。</h2>
        </div>
        <div className="voice-layout">
          <div className="card-surface quote-card reveal-card">
            <p>
              Redy 是 WeOpen 的开源守护者，一只温润又极客的红熊猫。它细心观察分支、提交与贡献，持续 cherry-pick 最值得被保留与生长的部分，让开源协作更温暖、更可靠，也更 Ready。
            </p>
          </div>
          <ul className="voice-list card-surface reveal-card">
            {voiceItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <footer className="footer card-surface scroll-stage">
        <div className="footer__glow" aria-hidden="true" />
        <p className="footer__title">温和看待技术，严谨对待代码。</p>
        <p>
          让开源不只是协作，更是一片被精心维护、持续生长的森林。
        </p>
      </footer>

      <div className="floating-actions" aria-label="快捷操作">
        <a className="floating-actions__button" href="#hero" aria-label="回到顶部">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 5l-6 6 1.4 1.4 3.6-3.6V19h2V8.8l3.6 3.6L18 11z" />
          </svg>
        </a>
        <a
          className="floating-actions__button"
          href="https://github.com/WeOpen/Redy"
          target="_blank"
          rel="noreferrer"
          aria-label="打开 GitHub 仓库"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2C6.48 2 2 6.59 2 12.25c0 4.53 2.87 8.38 6.84 9.74.5.1.68-.22.68-.49 0-.24-.01-1.05-.01-1.91-2.78.62-3.37-1.21-3.37-1.21-.46-1.19-1.11-1.51-1.11-1.51-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.86.09-.67.35-1.12.63-1.38-2.22-.26-4.55-1.14-4.55-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.72 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 6.96c.85 0 1.7.12 2.5.36 1.9-1.33 2.74-1.05 2.74-1.05.56 1.42.21 2.46.1 2.72.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.95.68 1.92 0 1.39-.01 2.5-.01 2.84 0 .27.18.6.69.49A10.25 10.25 0 0 0 22 12.25C22 6.59 17.52 2 12 2z" />
          </svg>
        </a>
      </div>
    </main>
  );
}
