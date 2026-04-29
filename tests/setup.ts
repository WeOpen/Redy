// 测试环境入口集中注册 Testing Library 的 DOM 断言，并在每个用例后清理 React 渲染结果。
import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

afterEach(() => {
  cleanup();
});
