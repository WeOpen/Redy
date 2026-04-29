// 视觉系统区块集中展示角色形态、视觉原则和品牌色板。
import { homeImages, palette, visualItems } from '../../_content/home';
import { MotionDiv, MotionFigure, MotionSection } from '../motion-effects';

/**
 * 渲染视觉系统区块，连接 Redy 图像资产、识别锚点和色彩规范。
 */
export default function VisualSystemSection() {
  return (
    <MotionSection className="section-grid scroll-stage" id="visual-system">
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
          <MotionFigure className="card-surface image-card reveal-card">
            {/* 光晕只承担视觉层次，不进入可访问名称。 */}
            <span className="image-card__halo" aria-hidden="true" />
            <img alt="Redy 标准立绘" src={homeImages.standardMascot} />
            <figcaption>标准立绘</figcaption>
          </MotionFigure>
          <MotionFigure className="card-surface image-card reveal-card" delay={0.08}>
            <span className="image-card__halo" aria-hidden="true" />
            <img alt="Redy 轻量化形态" src={homeImages.chibiMascot} />
            <figcaption>轻量化形态</figcaption>
          </MotionFigure>
        </div>
        <div className="visual-copy">
          {visualItems.map((item) => (
            <MotionDiv key={item.title} className="note-card">
              <strong>{item.title}</strong>
              <p>{item.body}</p>
            </MotionDiv>
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
    </MotionSection>
  );
}
