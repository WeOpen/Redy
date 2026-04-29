// 404 页面复用首页视觉语言，让异常路径也保持 Redy 品牌温度。
import React from 'react';

import chibiMascot from '../brand/tmp/redy-shape-d-chibi-sheet.png';
import logoLockup from '../brand/logo/redy-logo-lockup-transparent.png';

/**
 * 渲染品牌化 404 页面，并提供回首页和应用场景区块的恢复路径。
 */
export default function NotFound() {
  return (
    <main className="page-shell not-found-shell">
      <div className="paper-noise" />
      <div className="branch-glow branch-glow-left" />
      <div className="branch-glow branch-glow-right" />

      {/* 404 内容沿用首页卡片和动效钩子，避免异常页形成另一套视觉系统。 */}
      <section className="not-found-card card-surface scroll-stage">
        <div className="not-found-card__copy">
          <p className="eyebrow">404 / Redy is searching</p>
          <h1>这条分支还没有长出来。</h1>
          <p className="lead">
            Redy 正在开源森林里寻找这个地址，但它暂时还没有对应的页面。你可以回到品牌首页，继续查看 Redy 的角色设定、视觉系统与 GitHub / README / CLI 等应用场景。
          </p>
          <div className="hero__actions">
            <a className="button button--primary" href="/">
              <span className="button__label">回到 Redy 首页</span>
              <span className="button__shine" aria-hidden="true" />
            </a>
            <a className="button button--secondary" href="/#use-cases">
              <span className="button__label">查看应用场景</span>
              <span className="button__shine" aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="not-found-card__visual">
          <span className="not-found-card__code">404</span>
          <img alt="Redy 404 轻量化视觉" src={chibiMascot.src} />
          <div className="not-found-card__brand">
            <img alt="Redy Logo Lockup" src={logoLockup.src} />
            <span>Ready to open, ready to collaborate.</span>
          </div>
        </div>
      </section>
    </main>
  );
}
