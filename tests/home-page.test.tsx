import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import HomePage from '@/app/page';

describe('HomePage', () => {
  it('renders the core Redy brand story as a single-page site', () => {
    render(<HomePage />);

    expect(
      screen.getByRole('heading', { name: /Redy, the warm guardian of open source\./i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/WeOpen 开源生态维护者/i, { selector: 'strong' })).toBeInTheDocument();
    expect(screen.getByText(/Build\. Pick\. Evolve\./i)).toBeInTheDocument();
    expect(screen.getByText(/GitHub Header/i)).toBeInTheDocument();
    expect(screen.getByText(/Ready to merge\./i)).toBeInTheDocument();
  });

  it('provides section navigation and calls to action for the single-page experience', () => {
    render(<HomePage />);

    expect(screen.getByRole('link', { name: /品牌故事/i })).toHaveAttribute('href', '#story');
    expect(screen.getByRole('link', { name: /视觉系统/i })).toHaveAttribute('href', '#visual-system');
    expect(screen.getByRole('link', { name: /应用场景/i })).toHaveAttribute('href', '#use-cases');
    expect(screen.getByRole('link', { name: /浏览品牌/i })).toHaveAttribute('href', '#story');
    expect(screen.getByRole('link', { name: /查看资产/i })).toHaveAttribute('href', '#visual-system');
  });

  it('shows the core mascot visuals and closing brand statement', () => {
    render(<HomePage />);

    expect(screen.getByAltText(/Redy 园丁场景/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Redy 标准立绘/i)).toBeInTheDocument();
    expect(screen.getByText(/温和看待技术，严谨对待代码/i)).toBeInTheDocument();
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
    expect(screen.getByRole('link', { name: /品牌故事/i })).toHaveAttribute('href', '#story');
    expect(screen.getByRole('link', { name: /视觉系统/i })).toHaveAttribute('href', '#visual-system');
    expect(screen.getByRole('link', { name: /应用场景/i })).toHaveAttribute('href', '#use-cases');
    expect(screen.getByRole('link', { name: /品牌文案/i })).toHaveAttribute('href', '#voice');
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
});
