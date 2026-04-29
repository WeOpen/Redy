// Hero 区块承载首页第一印象，连接品牌主张、行动入口和三项目入口。
import { homeImages, projectLinks } from '../../_content/home';
import { MotionDiv, MotionLink, MotionSection } from '../motion-effects';

/**
 * 渲染首页 Hero 区块，并保持首屏文案、项目入口和主视觉的固定顺序。
 */
export default function HeroSection() {
  return (
    <MotionSection className="hero scroll-stage scroll-stage--hero" id="hero" delay={0.04}>
      <MotionDiv className="hero__copy reveal-card reveal-card--hero" delay={0.06}>
        {/* Hero 装饰钩子由 CSS 接管，用于分支线、光束和轨道动画。 */}
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
          <MotionLink className="button button--primary" href="#story">
            <span className="button__label">了解 Redy</span>
            <span className="button__shine" aria-hidden="true" />
          </MotionLink>
          <MotionLink className="button button--secondary" href="#visual-system">
            <span className="button__label">查看视觉系统</span>
            <span className="button__shine" aria-hidden="true" />
          </MotionLink>
        </div>
        <div className="hero__notes">
          <span className="hero-note">开源生态维护者</span>
          <span className="hero-note">代码园丁</span>
          <span className="hero-note">分支探险家</span>
        </div>
      </MotionDiv>

      <MotionDiv className="hero__visual card-surface reveal-card reveal-card--visual" delay={0.16}>
        <div className="hero__lens-glow" aria-hidden="true" />
        <div className="hero__logo-panel">
          <img alt="Redy Logo Lockup" src={homeImages.logoLockup} />
        </div>
        <div className="hero__asset-strip" aria-label="WeOpen 子项目入口">
          {projectLinks.map((project) => (
            <MotionLink
              key={project.name}
              className="hero__asset-card"
              href={project.href}
              target="_blank"
              rel="noreferrer"
              ariaLabel={`打开 ${project.name} 项目`}
            >
              <img alt="" src={project.icon} aria-hidden="true" />
              <strong>{project.name}</strong>
            </MotionLink>
          ))}
        </div>
        <img alt="Redy GitHub Header 主视觉" className="hero__image" src={homeImages.githubHeader} />
        <p className="hero__visual-note">
          Redy 在开源森林中观察分支、整理贡献，并把 WeMail、WeGit、WeOpen 三个项目节点连接到同一套 WeOpen 母品牌视觉里。
        </p>
      </MotionDiv>
    </MotionSection>
  );
}
