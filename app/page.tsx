// 首页路由入口负责组合页面壳、导航与各内容区块，具体文案和区块 JSX 分别下沉到内容层和组件层。
import { homeImages, navigation } from './_content/home';
import FloatingActions from './_components/layout/floating-actions';
import TopbarNav from './_components/layout/topbar-nav';
import { MotionFloat, MotionHeader, MotionLink, MotionPage } from './_components/motion-effects';
import HeroSection from './_components/sections/hero-section';
import SiteFooter from './_components/sections/site-footer';
import StorySection from './_components/sections/story-section';
import TraitsSection from './_components/sections/traits-section';
import UseCasesSection from './_components/sections/use-cases-section';
import VisualSystemSection from './_components/sections/visual-system-section';
import VoiceSection from './_components/sections/voice-section';

/**
 * 渲染 Redy 官网首页，并保持页面级装饰、导航与区块顺序集中可见。
 */
export default function HomePage() {
  return (
    <MotionPage className="page-shell">
      {/* 全页纸张纹理和漂浮光效跨越多个区块，因此保留在页面壳中维护。 */}
      <div className="paper-noise" />
      <MotionFloat className="paper-thread paper-thread--one" />
      <MotionFloat className="paper-thread paper-thread--two" />
      <MotionFloat className="branch-glow branch-glow-left" />
      <MotionFloat className="branch-glow branch-glow-right" />

      <MotionHeader className="topbar topbar--floating">
        <MotionLink className="brand-mark" href="#hero">
          <img alt="Redy 品牌图标" className="brand-mark__icon" src={homeImages.iconPrimary} />
          <span>Redy</span>
        </MotionLink>
        <TopbarNav items={navigation} />
      </MotionHeader>

      <HeroSection />
      <StorySection />
      <TraitsSection />
      <VisualSystemSection />
      <UseCasesSection />
      <VoiceSection />
      <SiteFooter />
      <FloatingActions />
    </MotionPage>
  );
}
