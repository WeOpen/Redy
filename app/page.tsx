import React from 'react';
import standardMascot from '../brand/mascot/standard/redy-shape-b-standard-sheet.png';
import gardenerMascot from '../brand/mascot/scenes/redy-shape-c-gardener-sheet.png';
import chibiMascot from '../brand/mascot/chibi/redy-shape-d-chibi-sheet.png';
import logoLockup from '../brand/logo/redy-logo-lockup.png';
import iconPrimary from '../brand/icons/redy-icon-primary.png';
import TopbarNav from './topbar-nav';

const navigation = [
  { label: '品牌故事', href: '#story' },
  { label: '视觉系统', href: '#visual-system' },
  { label: '应用场景', href: '#use-cases' },
  { label: '品牌文案', href: '#voice' },
] satisfies Array<{ label: string; href: `#${string}` }>;

const traits = ['冷静', '极客', '温和', '可靠', '专注', '审慎', '观察者', '维护者', '共建者'];

const valuePairs = [
  ['Warm, not noisy', '以安静、陪伴感的方式表达品牌温度。'],
  ['Technical, not cold', '保留 Git 与开源语义，但不走冰冷的工具感。'],
  ['Reliable, not rigid', '强调准备就绪、可靠协作，而不是僵硬流程。'],
  ['Curious, not chaotic', '像代码园丁一样观察、筛选、培育更好的开源体验。'],
];

const visualItems = [
  {
    title: '识别形态',
    body: '由 Logo / Icon、标准立绘、园丁场景与 Q 版形态组成，覆盖 favicon 到主视觉的完整层级。',
  },
  {
    title: '标志性特征',
    body: '护目镜、工具腰带与蓬松尾巴构成 Redy 的三大识别锚点。',
  },
  {
    title: '图形语言',
    body: 'Git 分支线、三项目识别系统与像素笔刷尾巴，让角色系统能够延展到页面和运营物料。',
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
    body: '用园丁场景建立第一印象，把 Redy 与 WeMail、WeGit、WeOpen 三项目生态放在同一张视觉中。',
  },
  {
    title: 'GitHub Header',
    body: '左侧角色、中部 Git 分支与项目节点、右侧品牌字锁，适合组织主页和仓库形象统一。',
  },
  {
    title: 'README / Badge',
    body: '让 WeMail、WeGit、WeOpen 在同一母品牌下拥有可区分的图标、Badge 与头图资产。',
  },
  {
    title: 'CLI 欢迎界面',
    body: '让初始化、扫描分支、准备就绪这些动作拥有更有仪式感的开场。',
  },
  {
    title: '404 / 异常页',
    body: '用 Q 版 Redy 的观察姿态表达“路径尚未被合并”的轻量反馈。',
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
            Redy 是 WeOpen 的品牌吉祥物与角色系统。它把温暖的陪伴感、开源协作的秩序感，以及开发者世界里的技术审美连接成一个可长期演进的品牌入口。
          </p>
          <div className="hero__actions">
            <a className="button button--primary" href="#story">
              <span className="button__label">浏览品牌</span>
              <span className="button__shine" aria-hidden="true" />
            </a>
            <a className="button button--secondary" href="#visual-system">
              <span className="button__label">查看资产</span>
              <span className="button__shine" aria-hidden="true" />
            </a>
          </div>
          <div className="hero__notes">
            <span className="hero-note">开源守护者</span>
            <span className="hero-note">代码园丁</span>
            <span className="hero-note">分支探险家</span>
          </div>
        </div>

        <div className="hero__visual card-surface reveal-card reveal-card--visual">
          <div className="hero__lens-glow" aria-hidden="true" />
          <img alt="Redy 园丁场景" className="hero__image" src={gardenerMascot.src} />
          <div className="hero__visual-note">
            <img alt="Redy Logo Lockup" src={logoLockup.src} />
            <p>
              一只在开源森林里持续观察分支、连接 WeMail、WeGit、WeOpen 三项目生态并维护协作温度的红熊猫。
            </p>
          </div>
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
          <h2>Redy 不只是 mascot，而是 WeOpen 的品牌人格化代表。</h2>
        </div>
        <div className="story-layout">
          <div className="card-surface prose-card reveal-card">
            <p>
              README 将 Redy 定义为 WeOpen 开源生态维护者 / 代码园丁 / 分支探险家。它来自 Red 与 Ready，代表准备就绪、可靠、可协作的品牌气质。
            </p>
            <p>
              在最新方案里，Redy 不再使用水果隐喻来映射项目，而是直接连接 WeMail、WeGit、WeOpen 三个核心项目，让品牌叙事和实际产品生态保持一致。
            </p>
          </div>
          <div className="story-tags">
            <div className="note-card reveal-card">
              <strong>WeOpen 开源生态维护者</strong>
              <p>用观察、整理与维护建立长期品牌信任。</p>
            </div>
            <div className="note-card reveal-card">
              <strong>代码园丁</strong>
              <p>把协作想象成共同生长的森林，而不是机械流程。</p>
            </div>
            <div className="note-card reveal-card">
              <strong>分支探险家</strong>
              <p>将 Git 分支、项目节点与协作演化变成 Redy 的叙事语言。</p>
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
          <h2>温和，但不幼态；专业，但不冰冷。</h2>
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
          <h2>从角色本体到图形语言，Redy 是一套可执行的品牌系统。</h2>
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
              <img alt="Redy Q 版形态" src={chibiMascot.src} />
              <figcaption>Q 版形态</figcaption>
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
          <h2>官网、GitHub、CLI 与社区运营，都可以沿着同一套语义展开。</h2>
        </div>
        <div className="use-case-grid">
          {useCases.map((item) => (
            <article key={item.title} className="note-card use-case-card reveal-card">
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
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
          <h2>一句话能被记住，一组短句能被持续复用。</h2>
        </div>
        <div className="voice-layout">
          <div className="card-surface quote-card reveal-card">
            <p>
              Redy 是 WeOpen 的开源守护者，一只温润又极客的红熊猫。它观察每一条分支、每一次提交与每一份贡献，持续挑选最值得被保留与生长的部分。
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
          让开源不只是协作，更是一片持续生长的森林。
        </p>
        <div className="footer__actions">
          <a href="#hero">回到顶部</a>
          <a href="https://github.com/WeOpen/Redy" target="_blank" rel="noreferrer">
            Explore the repository
          </a>
        </div>
      </footer>
    </main>
  );
}
