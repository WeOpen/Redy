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
          {/* V2 候选稿并排展示，便于在完成正式替换前对照原画与矢量渲染。 */}
          <MotionFigure className="card-surface image-card reveal-card">
            <span className="image-card__halo" aria-hidden="true" />
            <img alt="Redy 2.0 原始头像 PNG" src={homeImages.portraitReference} />
            <figcaption>Redy 2.0 · 原始头像参考</figcaption>
          </MotionFigure>
          <MotionFigure className="card-surface image-card reveal-card" delay={0.06}>
            <span className="image-card__halo" aria-hidden="true" />
            <img alt="Redy 2.0 V13 SVG 矢量渲染预览" src={homeImages.portraitVectorPreview} />
            <figcaption>
              Redy 2.0 · SVG V13 候选稿（
              <a
                href="https://github.com/WeOpen/Redy/blob/feat/redy-2-brand-refresh/brand/mascot/v2/redy-2-portrait-bezier-v13.svg"
                target="_blank"
                rel="noopener noreferrer"
              >
                查看 SVG 源文件
              </a>
              ）
            </figcaption>
          </MotionFigure>
          <p className="visual-gallery__notice">
            以下旧版全身与 Q 版立绘暂作对照；V13 尚未通过正式品牌母版验收。
          </p>
          <MotionFigure className="card-surface image-card reveal-card">
            {/* 光晕只承担视觉层次，不进入可访问名称。 */}
            <span className="image-card__halo" aria-hidden="true" />
            <img alt="Redy 1.0 标准角色立绘" src={homeImages.standardMascot} />
            <figcaption>1.0 标准角色 · 待替换</figcaption>
          </MotionFigure>
          <MotionFigure className="card-surface image-card reveal-card" delay={0.08}>
            <span className="image-card__halo" aria-hidden="true" />
            <img alt="Redy 1.0 Q 版角色" src={homeImages.chibiMascot} />
            <figcaption>1.0 Q 版角色 · 待替换</figcaption>
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
