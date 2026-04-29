# Redy 项目规范

本规范用于约束 Redy 官网、品牌资源、脚本和测试的日常维护。它参考了 Next.js App Router 的项目组织建议、React 的组件纯度规则、TypeScript 官方类型建议，以及 Google TypeScript 命名规范；落地时以本仓库现有结构和品牌资产边界为准。

## 1. 基本原则

- 先保持一致，再追求抽象。只有当重复已经影响维护时才提取公共模块。
- 页面默认以服务端组件组织；只有需要浏览器状态、事件、动画、滚动监听时才使用 `'use client'`。
- 品牌资产、页面代码、生成脚本、测试分别放在清晰边界内，不把一次性素材混进运行时代码。
- 每次视觉或交互调整都要有可验证结果：测试、构建、浏览器检查或截图比对至少覆盖一种。

## 2. 目录结构

```text
app/                    Next.js App Router 页面入口
app/_content/           路由私有的 typed content 与页面静态资源聚合
app/_components/        当前页面或路由私有的 UI / client 组件
app/_components/layout/ 页面 chrome，例如导航、浮动操作区
app/_components/sections/ 首页大区块组件
app/layout.tsx          全站 metadata、favicon、manifest、根布局
app/page.tsx            首页组合入口，只保留页面壳、装饰层和区块顺序
brand/                  品牌源资产，不直接作为普通 public 静态目录使用
brand/icons/            图标源文件、SVG、PNG、favicon 源图
brand/banners/          README / GitHub 展示横幅
brand/guidelines/       品牌视觉与设计规范文档
docs/                   项目工程文档、计划、实施记录
docs/plans/             阶段性设计和实施计划
public/                 Web 运行时直接公开的静态资源
scripts/                可复用生成脚本和本地自动化
tests/                  Vitest / Testing Library 测试
```

### 目录调整规则

- `app` 内只有特殊文件或路由文件会成为路由；页面私有内容统一放到 `_content`，页面私有组件统一放到 `_components`，避免和未来的 Next 特殊文件名冲突。
- 单页内的大区块放到 `_components/sections`，导航和浮动操作等页面 chrome 放到 `_components/layout`。
- 多个页面共享的通用能力再提升到根级 `components/`、`lib/` 或 `styles/`，当前单页站点不提前创建共享层。
- `brand` 保存源资产和设计产物；`public` 只保存浏览器需要按 URL 访问的发布资产，例如 favicon、manifest 相关图标。
- `tests` 按行为命名，不按实现文件一比一机械映射；例如 `home-page.test.tsx`、`brand-assets.test.ts`。

## 3. 分层架构

### 页面层

- `app/page.tsx` 负责页面壳、全局装饰层、区块顺序和顶层组合，不直接承载大段内容数据。
- 路由私有的首页数据与静态资源聚合放在 `app/_content/home.ts`，数组数据使用 `satisfies` 固定结构，避免字段漂移。
- 页面层不要直接写复杂浏览器副作用；滚动、动画、菜单状态等交给 client 组件。

### 组件层

- `app/_components/layout/*` 放置导航、浮动操作区等页面 chrome。
- `app/_components/sections/*` 放置首页大区块，优先保持 server-safe，只有需要 hooks 或事件时才转为 client 组件。
- `app/_components/motion-effects.tsx` 作为当前页面的动画封装层，集中维护 reduced-motion 行为。
- 组件名使用 `PascalCase`，文件名使用 `kebab-case.tsx`。
- Client 组件必须把 `'use client'` 放在文件第一行。
- 组件渲染保持纯净：不要在 render 过程中修改 props、state、模块级变量或外部对象。

### 资源层

- 运行时图片通过静态 import 引入，便于 Next 处理尺寸与路径。
- 新增 favicon 时必须同时检查 `app/layout.tsx` metadata、`app/manifest.ts`、`public/favicons/*` 和测试。
- SVG 图标应保留可读的分组和语义命名，不把复杂位图效果硬塞进不可维护的 path 堆。

### 脚本层

- `scripts/*` 只放可重复运行的生成或检查脚本。
- 脚本文件名使用动词或领域名，例如 `image-generator.ts`、`redy-welcome.ts`。
- 脚本输出应避免覆盖源资产，除非调用方明确知道目标文件。

## 4. 命名规范

### TypeScript / React

- 组件、类型、接口：`PascalCase`，如 `TopbarNavProps`。
- 变量、函数、属性、参数：`camelCase`，如 `projectLinks`、`activeHref`。
- 全局常量：只有真正跨模块且不可变的值才使用 `CONSTANT_CASE`；局部常量保持 `camelCase`。
- 缩写按普通单词处理：`githubUrl`、`htmlLabel`，不要写成 `githubURL` 或 `HTMLLabel`。
- 避免模糊缩写：不用 `cfg`、`tmpVal`、`n`；循环计数或坐标等极短生命周期变量除外。

### 文件与目录

- 普通文件和目录使用 `kebab-case`：`motion-effects.tsx`、`brand-assets.test.ts`。
- Next 私有目录使用 `_components`、`_lib` 这类前缀形式。
- 测试文件使用 `*.test.ts` 或 `*.test.tsx`。
- 图片资源使用小写短横线，并在需要时加尺寸或用途后缀：`favicon-192x192.png`、`redy-icon-primary-transparent.png`。

### CSS

- 类名采用稳定的 BEM-like 结构：`block__element--modifier`。
- 设计 token 使用 CSS 变量，并集中在 `:root` 或语义区域中维护。
- 不用一次性颜色名作为类名，例如 `blue-card`；用语义名，例如 `note-card`、`brand-mark`。

## 5. 注释规范

- 新增注释统一使用中文注释；命令、标识符、错误信息、第三方 API 名称保持原文。
- 注释解释“为什么”、职责边界和维护约束，不只复述代码正在做什么。
- 不用注释掩盖命名问题。若注释只是翻译变量名，应先重命名。
- 临时 TODO 必须写明后续动作或触发条件，例如 `TODO: 自动化 favicon 流程后移除`。

### 文件注释

- 主要源码、测试、脚本文件顶部应有文件注释，说明文件在当前分层架构中的职责。
- 文件注释只描述稳定职责，不写本次任务、历史迁移或临时状态。
- 纯类型声明、生成文件、锁文件、JSON 配置、二进制资源和 SVG 资产不强制添加文件注释。

### 方法注释

- 导出的组件、函数、关键 helper 使用中文 JSDoc，说明用途、输入输出约束或维护注意点。
- React 组件的方法注释应说明该组件承担的页面职责，不逐项解释 props 传递。
- 私有小函数只有存在非显而易见的算法、阈值、格式约束时才补方法注释。

### 行注释

- 行注释用于解释关键阈值、浏览器兼容、动画降级、滚动判定、测试夹具和资源格式读取等细节。
- 行注释应靠近相关代码，保持一行内说明清楚。
- 不给普通 JSX 标签、直接映射、显而易见的条件判断添加机械行注释。

## 6. TypeScript 规则

- 保持 `strict: true`，新增代码不得引入隐式 `any`。
- 不使用 `String`、`Number`、`Boolean` 这类装箱类型；使用 `string`、`number`、`boolean`。
- 不确定外部输入类型时优先用 `unknown`，缩小类型后再使用。
- 回调返回值不被消费时使用 `void`。
- 优先使用联合类型和可选参数，不为同一返回值写重复 overload。

## 7. UI 与交互规范

- 页面内容优先服务品牌展示，不做营销落地页式的空泛装饰。
- 动画必须尊重 `prefers-reduced-motion`；新增 Framer Motion 动画时要保留降级路径。
- 固定格式区域需要明确尺寸、比例或响应式约束，避免 hover、加载、文案变化导致布局跳动。
- 移动端检查至少覆盖：横向溢出、导航可用、正文不重叠、关键图片不被裁到不可识别。

## 8. 测试与验证

常规改动完成后按风险选择验证：

```bash
npm run build
npx vitest run tests/home-page.test.tsx
npx vitest run tests/brand-assets.test.ts
```

- 页面结构、文案、导航、交互：优先跑 `home-page.test.tsx`。
- 图标、favicon、品牌资产：优先跑 `brand-assets.test.ts`。
- 视觉布局或动画：在本地浏览器检查 desktop 和 mobile 视口，必要时记录截图。
- 如果全量 `npm test` 失败，要区分本次改动导致的问题和已存在的资产基线差异，并在交付说明中写清楚。

## 9. 变更流程

1. 先读现有实现和相关测试，确认边界。
2. 小步修改，避免顺手重构无关模块。
3. 更新或新增能证明行为的测试。
4. 跑针对性验证，再跑构建。
5. 交付时说明改了哪些文件、验证了什么、还有哪些已知风险。

## 参考资料

- [Next.js Project Organization and File Colocation](https://nextjs.org/docs/14/app/building-your-application/routing/colocation)
- [React: Keeping Components Pure](https://react.dev/learn/keeping-components-pure)
- [React: Components and Hooks must be pure](https://react.dev/reference/rules/components-and-hooks-must-be-pure)
- [TypeScript: Do's and Don'ts](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
- [Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html)
