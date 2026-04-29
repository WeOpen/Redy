// 品牌故事区块解释 Redy 命名、角色定位和 WeOpen 生态关系。
import { MotionDiv, MotionSection } from '../motion-effects';

/**
 * 渲染品牌故事区块，并用三张说明卡片拆解 Redy 的核心身份。
 */
export default function StorySection() {
  return (
    <MotionSection className="section-grid section-grid--story scroll-stage" id="story">
      {/* 手册式编号帮助长页面形成稳定阅读节奏。 */}
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
        <MotionDiv className="card-surface prose-card reveal-card">
          <p>
            Redy 的命名来自 Red 与 Ready，既对应红熊猫的核心色彩，也传达“准备就绪、可靠、可协作”的品牌气质。它不是孤立的装饰图案，而是 WeOpen 在官网、GitHub、README、CLI 与社区传播中的共同角色入口。
          </p>
          <p>
            在叙事上，Redy 穿梭于代码森林，观察每一条分支、每一次提交与每一份贡献。它不再借助额外隐喻来解释项目，而是直接连接 WeMail、WeGit、WeOpen 三个核心产品，让品牌故事和实际产品生态保持一致。
          </p>
        </MotionDiv>
        <div className="story-tags">
          <MotionDiv className="note-card reveal-card">
            <strong>WeOpen 开源生态维护者</strong>
            <p>用观察、整理与维护建立长期品牌信任，让开源协作显得更可靠、更有温度。</p>
          </MotionDiv>
          <MotionDiv className="note-card reveal-card" delay={0.06}>
            <strong>代码园丁</strong>
            <p>把开源协作想象成持续生长的生态，而不是冷冰冰的流程堆叠。</p>
          </MotionDiv>
          <MotionDiv className="note-card reveal-card" delay={0.12}>
            <strong>分支探险家</strong>
            <p>将 Git 分支、提交节点与版本演化变成可被看见、可被记住的视觉语言。</p>
          </MotionDiv>
        </div>
      </div>
    </MotionSection>
  );
}
