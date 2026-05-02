// 首页测试覆盖项目规范、分层结构、核心品牌叙事和移动端导航交互。
import React from 'react';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import HomePage from '@/app/page';
import NotFound from '@/app/not-found';

const rootDir = process.cwd();

// 规范测试防止文档回退时丢失中文注释要求。
describe('Project standards', () => {
  it('documents Chinese file, method, and line comment rules', () => {
    const projectStandards = readFileSync(path.join(rootDir, 'docs/project-standards.md'), 'utf8');

    expect(projectStandards).toContain('文件注释');
    expect(projectStandards).toContain('方法注释');
    expect(projectStandards).toContain('行注释');
    expect(projectStandards).toContain('中文注释');
  });
});

// 架构测试确保首页继续保持 route-private 的内容、布局和区块分层。
describe('HomePage architecture', () => {
  it('keeps homepage content, layout chrome, and sections in route-private layers', () => {
    for (const filePath of [
      'app/_content/home.ts',
      'app/_components/layout/topbar-nav.tsx',
      'app/_components/layout/floating-actions.tsx',
      'app/_components/sections/hero-section.tsx',
      'app/_components/sections/story-section.tsx',
      'app/_components/sections/traits-section.tsx',
      'app/_components/sections/visual-system-section.tsx',
      'app/_components/sections/use-cases-section.tsx',
      'app/_components/sections/voice-section.tsx',
      'app/_components/sections/site-footer.tsx',
    ]) {
      expect(existsSync(path.join(rootDir, filePath))).toBe(true);
    }
  });
});

describe('HomePage', () => {
  it('renders the core Redy brand story as a single-page site', () => {
    render(<HomePage />);

    expect(
      screen.getByRole('heading', { name: /Redy, the warm guardian of open source\./i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/WeOpen 开源生态维护者/i, { selector: 'strong' })).toBeInTheDocument();
    expect(screen.getByText(/Build\. Pick\. Evolve\./i)).toBeInTheDocument();
    expect(screen.getAllByText(/GitHub Header/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/Ready to merge\./i)).toBeInTheDocument();
  });

  it('provides section navigation and calls to action for the single-page experience', () => {
    render(<HomePage />);

    expect(screen.getByRole('link', { name: '品牌故事' })).toHaveAttribute('href', '#story');
    expect(screen.getByRole('link', { name: '视觉系统' })).toHaveAttribute('href', '#visual-system');
    expect(screen.getByRole('link', { name: '应用场景' })).toHaveAttribute('href', '#use-cases');
    expect(screen.getByRole('link', { name: '了解 Redy' })).toHaveAttribute('href', '#story');
    expect(screen.getByRole('link', { name: '查看视觉系统' })).toHaveAttribute('href', '#visual-system');
  });

  it('shows the core mascot visuals and closing brand statement', () => {
    const { container } = render(<HomePage />);

    expect(screen.getByAltText(/Redy Logo Lockup/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Redy GitHub Header 主视觉/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Redy 社区贴纸/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Redy 表情包/i)).toBeInTheDocument();
    expect(screen.getByText(/温和看待技术，严谨对待代码/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /打开 WeMail 项目/i })).toHaveAttribute(
      'href',
      'https://github.com/WeOpen/WeMail',
    );
    expect(screen.getByRole('link', { name: /打开 WeGit 项目/i })).toHaveAttribute(
      'href',
      'https://github.com/WeOpen/WeGit',
    );
    expect(screen.getByRole('link', { name: /打开 WeOpen 项目/i })).toHaveAttribute(
      'href',
      'https://github.com/WeOpen/WeOpen',
    );
    expect(container.querySelectorAll('.hero__asset-card img').length).toBe(3);
    expect(container.querySelector('.hero__logo-panel + .hero__asset-strip + .hero__image')).not.toBeNull();
    expect(container.querySelector('.hero__asset-strip')).not.toBeNull();
    expect(screen.queryByText(/临时邮箱与轻量通信入口/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Git 协作与版本演化工具/i)).not.toBeInTheDocument();
  });

  it('shows sticker and expression pack previews in the visual gallery', () => {
    render(<HomePage />);

    expect(screen.getByText('社区贴纸')).toBeInTheDocument();
    expect(screen.getByText('表情包')).toBeInTheDocument();
    expect(screen.queryByText('标准立绘')).not.toBeInTheDocument();
    expect(screen.queryByText('轻量化形态')).not.toBeInTheDocument();
  });

  it('connects the phase 4 homepage hero to GitHub and README visual assets', () => {
    render(<HomePage />);

    expect(screen.getAllByText(/Open source, warm and ready/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByAltText(/WeMail README 头图/i)).toBeInTheDocument();
    expect(screen.getByAltText(/WeGit README 头图/i)).toBeInTheDocument();
    expect(screen.getByAltText(/WeOpen README 头图/i)).toBeInTheDocument();
  });

  it('renders hooks for animated branch lines, lens glow, and reveal cards', () => {
    const { container } = render(<HomePage />);

    expect(container.querySelector('.hero__beam')).not.toBeNull();
    expect(container.querySelector('.hero__lens-glow')).not.toBeNull();
    expect(container.querySelectorAll('.reveal-card').length).toBeGreaterThan(3);
  });

  it('renders hooks for the branch track, button shimmer, and breathing tags', () => {
    const { container } = render(<HomePage />);

    expect(container.querySelector('.hero__track')).not.toBeNull();
    expect(container.querySelector('.button__shine')).not.toBeNull();
    expect(container.querySelector('.hero__notes span')).toHaveClass('hero-note');
  });

  it('renders section dividers, image halos, and footer glow hooks for deeper page rhythm', () => {
    const { container } = render(<HomePage />);

    expect(container.querySelectorAll('.section-heading__rule').length).toBeGreaterThan(3);
    expect(container.querySelectorAll('.image-card__halo').length).toBeGreaterThan(1);
    expect(container.querySelector('.footer__glow')).not.toBeNull();
  });

  it('renders hooks for active section navigation and scroll progress', () => {
    const { container } = render(<HomePage />);

    expect(container.querySelector('.topbar__progress')).not.toBeNull();
    expect(container.querySelector('.topbar__progress-bar')).not.toBeNull();
    expect(container.querySelectorAll('.topnav__link-indicator').length).toBeGreaterThan(3);
  });

  it('renders scroll-stage hooks to layer section entry rhythm', () => {
    const { container } = render(<HomePage />);

    expect(container.querySelectorAll('.scroll-stage').length).toBeGreaterThan(5);
    expect(container.querySelector('.scroll-stage--hero')).not.toBeNull();
    expect(container.querySelector('.scroll-stage--contrast')).not.toBeNull();
  });

  it('renders section markers with manual-like indexes for long-form reading', () => {
    const { container } = render(<HomePage />);

    expect(container.querySelectorAll('.section-marker').length).toBeGreaterThan(4);
    expect(container.querySelectorAll('.section-marker__index').length).toBeGreaterThan(4);
    expect(container.querySelector('.section-marker__label')).not.toBeNull();
  });

  it('renders hooks for a floating topbar and neon reading glow', () => {
    const { container } = render(<HomePage />);

    expect(container.querySelector('.topbar')).toHaveClass('topbar--floating');
    expect(container.querySelector('.topbar__progress-glow')).not.toBeNull();
  });

  it('renders a collapsible menu button for the mobile top navigation', () => {
    render(<HomePage />);

    const menuButton = screen.getByRole('button', { name: /打开页面导航/i });
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(menuButton);

    expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('link', { name: '品牌故事' })).toHaveAttribute('href', '#story');
    expect(screen.getByRole('link', { name: '视觉系统' })).toHaveAttribute('href', '#visual-system');
    expect(screen.getByRole('link', { name: '应用场景' })).toHaveAttribute('href', '#use-cases');
    expect(screen.getByRole('link', { name: '品牌文案' })).toHaveAttribute('href', '#voice');
  });

  it('renders a floating action dock for scroll-to-top and repository navigation', () => {
    render(<HomePage />);

    expect(screen.getByRole('link', { name: /回到顶部/i })).toHaveAttribute('href', '#hero');
    expect(screen.getByRole('link', { name: /打开 github 仓库/i })).toHaveAttribute(
      'href',
      'https://github.com/WeOpen/Redy',
    );

    const dock = document.querySelector('.floating-actions');
    expect(dock).not.toBeNull();
  });

  it('renders the phase 4 branded 404 page with recovery links', () => {
    render(<NotFound />);

    expect(screen.getByRole('heading', { name: /这条分支还没有长出来/i })).toBeInTheDocument();
    expect(screen.getByAltText(/Redy 404 轻量化视觉/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /回到 Redy 首页/i })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: /查看应用场景/i })).toHaveAttribute('href', '/#use-cases');
  });
});
