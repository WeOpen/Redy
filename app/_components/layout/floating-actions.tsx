// 浮动操作区提供跨区块的快捷返回和仓库入口，属于页面 chrome 而非内容区块。
import { MotionLink } from '../motion-effects';

/**
 * 渲染固定在页面边缘的快捷操作按钮组。
 */
export default function FloatingActions() {
  return (
    <div className="floating-actions" aria-label="快捷操作">
      <MotionLink className="floating-actions__button" href="#hero" ariaLabel="回到顶部">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 5l-6 6 1.4 1.4 3.6-3.6V19h2V8.8l3.6 3.6L18 11z" />
        </svg>
      </MotionLink>
      <MotionLink
        className="floating-actions__button"
        href="https://github.com/WeOpen/Redy"
        target="_blank"
        rel="noreferrer"
        ariaLabel="打开 GitHub 仓库"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2C6.48 2 2 6.59 2 12.25c0 4.53 2.87 8.38 6.84 9.74.5.1.68-.22.68-.49 0-.24-.01-1.05-.01-1.91-2.78.62-3.37-1.21-3.37-1.21-.46-1.19-1.11-1.51-1.11-1.51-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.86.09-.67.35-1.12.63-1.38-2.22-.26-4.55-1.14-4.55-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.72 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 6.96c.85 0 1.7.12 2.5.36 1.9-1.33 2.74-1.05 2.74-1.05.56 1.42.21 2.46.1 2.72.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.95.68 1.92 0 1.39-.01 2.5-.01 2.84 0 .27.18.6.69.49A10.25 10.25 0 0 0 22 12.25C22 6.59 17.52 2 12 2z" />
        </svg>
      </MotionLink>
    </div>
  );
}
