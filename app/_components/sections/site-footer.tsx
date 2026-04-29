// 页脚区块为长页面收束品牌态度，并保留底部光效钩子。
/**
 * 渲染 Redy 首页页脚，作为品牌叙事的最后一句收束。
 */
export default function SiteFooter() {
  return (
    <footer className="footer card-surface scroll-stage">
      <div className="footer__glow" aria-hidden="true" />
      <p className="footer__title">温和看待技术，严谨对待代码。</p>
      <p>让开源不只是协作，更是一片被精心维护、持续生长的森林。</p>
    </footer>
  );
}
