// 品牌人格区块展示 Redy 的关键词云和价值边界。
import { traits, valuePairs } from '../../_content/home';
import { MotionDiv, MotionSection, MotionWord } from '../motion-effects';

/**
 * 渲染品牌人格区块，用词云和价值对照表达“温暖但专业”的气质。
 */
export default function TraitsSection() {
  return (
    <MotionSection className="section-grid scroll-stage" id="traits">
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
        <MotionDiv className="trait-cloud card-surface reveal-card" ariaLabel="Redy 品牌人格词云">
          {/* 词云布局依赖内容顺序，新增词条时需要同步检查 CSS 定位。 */}
          {traits.map((trait) => (
            <MotionWord key={trait} className="trait-cloud__word">
              {trait}
            </MotionWord>
          ))}
        </MotionDiv>
        <div className="value-pairs">
          {valuePairs.map(([title, body]) => (
            <MotionDiv key={title} className="note-card">
              <strong>{title}</strong>
              <p>{body}</p>
            </MotionDiv>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
