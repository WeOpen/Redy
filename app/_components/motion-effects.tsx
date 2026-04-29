'use client';

// 动效组件层集中封装 Framer Motion 行为，确保全站 reduced-motion 策略一致。
import type { CSSProperties, ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type MotionBaseProps = {
  children?: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  ariaLabel?: string;
};

type MotionLinkProps = MotionBaseProps & {
  href: string;
  target?: string;
  rel?: string;
};

const easeOut = [0.22, 1, 0.36, 1] as const;

/**
 * 生成入场动画参数，并在用户偏好减少动态效果时禁用动画。
 */
function entrance(delay = 0, reducedMotion: boolean | null = false) {
  if (reducedMotion) {
    return {
      initial: false as const,
      whileInView: undefined,
      animate: undefined,
      transition: undefined,
    };
  }

  return {
    initial: { opacity: 0, y: 34, scale: 0.985 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: 0.72, ease: easeOut, delay },
  };
}

/**
 * 为首页主内容提供首屏淡入效果和 main 语义容器。
 */
export function MotionPage({ children, className }: MotionBaseProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.main
      className={className}
      initial={reducedMotion ? false : { opacity: 0 }}
      animate={reducedMotion ? undefined : { opacity: 1 }}
      transition={{ duration: 0.45, ease: easeOut }}
    >
      {children}
    </motion.main>
  );
}

/**
 * 为浮动顶栏提供轻量进入动画，避免导航在首屏突然跳入。
 */
export function MotionHeader({ children, className }: MotionBaseProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.header
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: -18, scale: 0.985 }}
      animate={reducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.64, ease: easeOut, delay: 0.12 }}
    >
      {children}
    </motion.header>
  );
}

/**
 * 为页面区块统一应用入场节奏，并保留 section id 供锚点导航使用。
 */
export function MotionSection({ children, className, id, delay }: MotionBaseProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.section className={className} id={id} {...entrance(delay, reducedMotion)}>
      {children}
    </motion.section>
  );
}

/**
 * 为普通卡片容器提供入场和 hover 反馈。
 */
export function MotionDiv({ children, className, ariaLabel, delay }: MotionBaseProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      aria-label={ariaLabel}
      {...entrance(delay, reducedMotion)}
      whileHover={reducedMotion ? undefined : { y: -4, transition: { duration: 0.22 } }}
    >
      {children}
    </motion.div>
  );
}

/**
 * 为文章式卡片提供稍强的 hover 抬升效果。
 */
export function MotionArticle({ children, className, delay }: MotionBaseProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.article
      className={className}
      {...entrance(delay, reducedMotion)}
      whileHover={reducedMotion ? undefined : { y: -5, transition: { duration: 0.22 } }}
    >
      {children}
    </motion.article>
  );
}

/**
 * 为图片展示卡片提供入场、抬升和轻微缩放反馈。
 */
export function MotionFigure({ children, className, delay }: MotionBaseProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.figure
      className={className}
      {...entrance(delay, reducedMotion)}
      whileHover={reducedMotion ? undefined : { y: -5, scale: 1.01, transition: { duration: 0.24 } }}
    >
      {children}
    </motion.figure>
  );
}

/**
 * 为列表容器提供统一入场动画，列表项本身保持普通语义结构。
 */
export function MotionList({ children, className, delay }: MotionBaseProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.ul className={className} {...entrance(delay, reducedMotion)}>
      {children}
    </motion.ul>
  );
}

/**
 * 为链接按钮提供 hover/tap 反馈，同时保留原生 anchor 语义。
 */
export function MotionLink({ children, className, href, target, rel, ariaLabel }: MotionLinkProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.a
      className={className}
      href={href}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
      whileHover={reducedMotion ? undefined : { y: -3, scale: 1.025 }}
      whileTap={reducedMotion ? undefined : { scale: 0.975 }}
      transition={{ duration: 0.2, ease: easeOut }}
    >
      {children}
    </motion.a>
  );
}

/**
 * 为人格词云的单词提供独立浮动层，避免动画影响外层布局计算。
 */
export function MotionWord({ children, className }: MotionBaseProps) {
  const reducedMotion = useReducedMotion();

  return (
    <span className={className}>
      {/* 外层 span 负责词云布局，内层 motion span 只负责浮动与 hover 动效。 */}
      <motion.span
        className="trait-cloud__word-motion"
        animate={reducedMotion ? undefined : { y: [0, -3, 0] }}
        whileHover={reducedMotion ? undefined : { scale: 1.08, y: -5 }}
        transition={
          reducedMotion
            ? undefined
            : {
                duration: 4.2,
                ease: 'easeInOut',
                repeat: Infinity,
                repeatType: 'mirror',
              }
        }
      >
        {children}
      </motion.span>
    </span>
  );
}

/**
 * 为背景装饰元素提供循环漂浮动画，并默认从辅助技术中隐藏。
 */
export function MotionFloat({
  children,
  className,
  style,
}: MotionBaseProps & {
  style?: CSSProperties;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      style={style}
      animate={reducedMotion ? undefined : { y: [0, -10, 0], rotate: [0, 1.6, 0] }}
      transition={reducedMotion ? undefined : { duration: 7.4, ease: 'easeInOut', repeat: Infinity }}
      aria-hidden="true"
    >
      {children}
    </motion.div>
  );
}
