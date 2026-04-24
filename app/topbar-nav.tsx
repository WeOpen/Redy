'use client';

import { useEffect, useMemo, useState } from 'react';

type NavigationItem = {
  label: string;
  href: `#${string}`;
};

type TopbarNavProps = {
  items: NavigationItem[];
};

const DEFAULT_ACTIVE = '#story';

export default function TopbarNav({ items }: TopbarNavProps) {
  const [activeHref, setActiveHref] = useState<string>(DEFAULT_ACTIVE);
  const [progress, setProgress] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const sectionIds = useMemo(() => items.map((item) => item.href.slice(1)), [items]);

  useEffect(() => {
    const updateScrollState = () => {
      if (typeof window === 'undefined' || typeof document === 'undefined') {
        return;
      }

      const viewportMarker = window.innerHeight * 0.28;
      let currentHref = items[0]?.href ?? DEFAULT_ACTIVE;

      for (const item of items) {
        const section = document.getElementById(item.href.slice(1));
        if (!section) continue;

        const rect = section.getBoundingClientRect();
        if (rect.top <= viewportMarker) {
          currentHref = item.href;
        }
      }

      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = scrollableHeight > 0 ? Math.min(window.scrollY / scrollableHeight, 1) : 0;

      setActiveHref(currentHref);
      setProgress(nextProgress);
    };

    updateScrollState();
    window.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);

    return () => {
      window.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [items]);

  return (
    <>
      <div className="topnav-shell">
        <button
          type="button"
          className={`topnav__menu-button${isMenuOpen ? ' topnav__menu-button--open' : ''}`}
          aria-expanded={isMenuOpen}
          aria-controls="topnav-menu"
          aria-label={isMenuOpen ? '收起页面导航' : '打开页面导航'}
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <span className="topnav__menu-icon" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
        <nav className={`topnav${isMenuOpen ? ' topnav--open' : ''}`} id="topnav-menu" aria-label="页面导航">
          {items.map((item) => {
            const isActive = activeHref === item.href;

            return (
              <a
                key={item.href}
                className={`topnav__link${isActive ? ' topnav__link--active' : ''}`}
                href={item.href}
                aria-current={isActive ? 'location' : undefined}
                data-section={sectionIds.includes(item.href.slice(1)) ? item.href.slice(1) : undefined}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="topnav__link-label">{item.label}</span>
                <span className="topnav__link-indicator" aria-hidden="true" />
              </a>
            );
          })}
        </nav>
      </div>
      <div className="topbar__progress" aria-hidden="true">
        <span className="topbar__progress-glow" />
        <span className="topbar__progress-bar" style={{ transform: `scaleX(${Math.max(progress, 0.06)})` }} />
      </div>
    </>
  );
}
