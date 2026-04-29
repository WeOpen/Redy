// 应用场景区块说明 Redy 视觉系统如何落到官网、仓库、README 和 CLI。
import { readmeAssets, useCases } from '../../_content/home';
import { MotionArticle, MotionFigure, MotionSection } from '../motion-effects';

/**
 * 渲染应用场景区块，并展示三个核心项目的 README 视觉资源。
 */
export default function UseCasesSection() {
  return (
    <MotionSection className="section-grid section-grid--contrast scroll-stage scroll-stage--contrast" id="use-cases">
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
          <MotionArticle key={item.title} className="note-card use-case-card reveal-card">
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </MotionArticle>
        ))}
      </div>
      <div className="readme-assets" aria-label="README 视觉资源">
        {/* README 资产保持项目差异化，但统一使用母品牌卡片结构。 */}
        {readmeAssets.map((asset) => (
          <MotionFigure key={asset.name} className="readme-asset card-surface reveal-card">
            <img alt={asset.alt} src={asset.src} />
            <figcaption>
              <strong>{asset.name}</strong>
              <span>{asset.body}</span>
            </figcaption>
          </MotionFigure>
        ))}
      </div>
    </MotionSection>
  );
}
