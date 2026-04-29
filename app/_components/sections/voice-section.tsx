// 品牌文案区块沉淀 Redy 的长描述和可复用短句。
import { voiceItems } from '../../_content/home';
import { MotionDiv, MotionList, MotionSection } from '../motion-effects';

/**
 * 渲染品牌文案区块，提供一句完整叙事和一组短句素材。
 */
export default function VoiceSection() {
  return (
    <MotionSection className="section-grid section-grid--voice scroll-stage" id="voice">
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
        <MotionDiv className="card-surface quote-card reveal-card">
          <p>
            Redy 是 WeOpen 的开源守护者，一只温润又极客的红熊猫。它细心观察分支、提交与贡献，持续 cherry-pick 最值得被保留与生长的部分，让开源协作更温暖、更可靠，也更 Ready。
          </p>
        </MotionDiv>
        <MotionList className="voice-list card-surface reveal-card">
          {voiceItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </MotionList>
      </div>
    </MotionSection>
  );
}
