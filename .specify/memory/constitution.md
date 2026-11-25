---
name: newgreen-constitution
description: Newgreen 项目宪法 - 绿色二手市场核心规范
metadata:
  type: constitution
---

# Newgreen 项目宪法

## 核心原则

### 可持续优先市场（Sustainability-first Marketplace）
每个功能必须促进再利用、减少浪费，并使碳减排可见。产品设计和数据建模必须优先考虑二手价值、本地再利用和环境影响，而非新颖性。

### 移动优先可访问体验（Mobile-first Accessible Experience）
UI 必须渲染为紧凑的移动市场（375px 基准），在小屏幕上保持可导航性，并使用可访问的语义控件、alt 文本和清晰的点击目标。所有新页面和组件必须保持内容可读、交互性和响应性。

### 服务契约与弹性（Service Contract & Resilience）
前端和后端通过明确的 API 契约通信；端点必须稳定、经过验证，并在 AI 或网络服务失败时优雅降级。数据流必须可预测和可恢复。

### 负责任的 AI 增强（Responsible AI Augmentation）
AI 是辅助层，不是核心功能的前置条件。AI 驱动的搜索、描述增强和视觉分析必须干净降级到确定性后备逻辑，并通过避免不透明行为来维护用户信任。

### 验证集成与稳定性（Verified Integration & Stability）
测试是核心应用流程的强制要求。更改必须通过自动化测试和代码审查验证后才能发布。

---

## 技术栈约定

### 前端
- **框架**：React 18 + Vite 5
- **路由**：React Router 6
- **状态**：React Context（AppContext）+ localStorage 持久化
- **地图**：Leaflet + react-leaflet
- **HTTP**：Axios
- **样式**：单一 CSS 文件（styles.css），移动优先响应式设计

### 后端
- **运行时**：Node.js + Express
- **AI 集成**：OpenAI SDK（baseURL: https://api.deepseek.com）
- **图像处理**：Sharp + Tesseract.js
- **地理编码**：OpenStreetMap Nominatim

### API 契约
```
GET    /api/items           → 商品列表
GET    /api/items/:id       → 单个商品详情
POST   /api/items           → 创建商品
POST   /api/search          → AI 搜索
POST   /api/vision/analyze  → 图像分析
POST   /api/ai/enhance      → 描述增强
```

### 开发环境
- 前端：`http://localhost:5173`（Vite dev server）
- 后端：`http://localhost:3000`
- Vite 代理 `/api` 请求到后端

### 目录结构
```
client/
  src/
    components/   # 可复用 UI 组件
    pages/        # 页面级组件
    state/        # Context 和状态管理
    utils/        # 纯函数工具（carbonCalculator、geoUtils）
    App.jsx       # 路由配置
    main.jsx      # 入口
    styles.css    # 全局样式
server/
  index.js       # Express 服务器
```

---

## 文档语言规范

所有项目文档（`.md` 文件：spec.md、plan.md、tasks.md、constitution.md 等）使用**中文（简体中文）**编写。代码文件（`.js`、`.jsx`、`.css`）和代码内注释使用**英文**。

**Why**：非英语母语团队可无障碍参与，中文文档是项目事实真相的唯一来源。

---

## 开发工作流

### Git 分支模型
- 功能开发：`feature/<功能名称>`
- 缺陷修复：`fix/<问题描述>`
- 发布分支：`release/<版本号>`
- 直接提交到 `main` 必须通过 PR 审查

### Commit Message 规范
- 使用中文描述改动
- 格式：`<type>: <简短描述>`
- type：feat、fix、docs、refactor、test、chore

### PR 审查要求
- PR 必须引用相关 spec 或 issue
- 核心原则合规性检查（可持续性、AI 降级、移动优先）
- 测试覆盖率验证通过

### 测试强制要求
- 核心流程（列表、搜索、收藏、购物车、地图、API 契约）必须通过自动化测试
- AI 功能必须验证降级逻辑
- 每个用户故事包含独立测试用例

### 技术债务管理
- 技术债务必须在 30 天内偿还或记录在案
- 重大重构需要先更新 spec.md

---

## 治理条款

### 宪法地位
此宪法是项目的真理来源。所有架构决策、模板和实施计划必须与之一致。

### 修正案流程
1. 在 PR 中提出宪法修改建议
2. 说明修改原因和影响范围
3. 获得至少 1 名审查者同意
4. 更新宪法版本号（patch +0.0.1，minor +0.1，major +1）
5. 在修改日志中记录变更

### 审查者职责
- 验证核心原则和测试覆盖率的合规性
- 确保 API 契约不被破坏
- 检查移动优先和可访问性要求

---

**Version**: 1.0.0
**Ratified**: 2026-05-13
**Last Amended**: 2026-05-13