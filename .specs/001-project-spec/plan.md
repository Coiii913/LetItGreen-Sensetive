# Newgreen 实施计划

## 1. 技术架构

### 1.1 前端架构
```
client/src/
├── components/     # ProductCard, ItemCard, SearchBar, CategoryTabs
├── pages/          # HomePage, PostPage, DetailPage, MapPage, FavoritesPage, CartPage
├── state/          # AppContext (favorites, cart, items)
├── utils/          # carbonCalculator.js, geoUtils.js
├── App.jsx         # 路由配置
├── main.jsx        # 入口
└── styles.css      # 全局样式（移动优先 375px）
```

**状态管理**：React Context + localStorage 持久化
- `AppContext.favorites`: Set\<itemId\>
- `AppContext.cart`: Item[]

### 1.2 后端架构
```
server/
└── index.js        # Express 服务器（所有 API 端点）
```

**数据存储**：In-memory array（当前）+ 预留扩展接口

### 1.3 AI 集成架构
```
OpenAI SDK → Deepseek API (baseURL: https://api.deepseek.com)
├── /api/search        AI 语义搜索
├── /api/vision/analyze  OCR + 图像分析
├── /api/ai/enhance    描述增强
└── /api/items (POST) 碳估算 + 关键词提取

降级策略：AI 失败时使用确定性启发式回退
```

### 1.4 地图架构
```
Leaflet + react-leaflet
├── 中心点：Dublin (53.3498, -6.2603)
├── 标记点：商品 lat/lng
├── 弹窗：标题、价格、距离
└── 工具函数：geoUtils.distanceKm() (Haversine 公式)
```

---

## 2. 任务拆分

### P1 - 核心功能（必须完成）

| 任务 | 描述 | 依赖 |
|------|------|------|
| P1.1 | 商品列表页 HomePage + ProductCard | - |
| P1.2 | 商品详情页 DetailPage | P1.1 |
| P1.3 | 收藏功能 AppContext.favorites + localStorage | P1.1 |
| P1.4 | 购物车功能 AppContext.cart + localStorage | P1.1 |
| P1.5 | 发布页 PostPage + 表单验证 | P1.1 |
| P1.6 | 地图页 MapPage + 标记点 | P1.1 |

### P2 - 增强功能（计划内）

| 任务 | 描述 | 依赖 |
|------|------|------|
| P2.1 | AI 搜索 POST /api/search | P1.1 |
| P2.2 | AI 碳估算 + 关键词提取 | P1.5 |
| P2.3 | 图片上传 + OCR 识别 | P1.5 |
| P2.4 | 类别筛选 CategoryTabs | P1.1 |
| P2.5 | 地理编码 Nominatim | P1.5 |
| P2.6 | Haversine 距离计算优化 | P1.6 |

### P3 - 优化功能（可选）

| 任务 | 描述 | 依赖 |
|------|------|------|
| P3.1 | AI 描述增强 /api/ai/enhance | P2.2 |
| P3.2 | AI 图像分析 /api/vision/analyze | P2.3 |
| P3.3 | 搜索历史记录 | P2.1 |
| P3.4 | 商品排序（价格/距离/碳节省） | P1.1 |

---

## 3. 测试策略

### 3.1 单元测试
- `carbonCalculator.js`：验证各类别碳节省计算
- `geoUtils.js`：验证 Haversine 距离计算
- API 端点：验证请求响应格式

### 3.2 集成测试
- 核心流程：列表 → 详情 → 收藏 → 购物车
- AI 降级：模拟 AI 服务失败，验证回退逻辑
- 地图交互：标记点击 → 弹窗 → 跳转

### 3.3 测试覆盖目标
| 模块 | 覆盖率要求 |
|------|-----------|
| 碳计算逻辑 | 100% |
| 距离计算逻辑 | 100% |
| API 契约 | 100% |
| 状态管理 | 80% |

### 3.4 测试工具
- Vitest（前端单元测试）
- Jest + Supertest（后端 API 测试）
- Playwright（E2E 测试，可选）

---

## 4. 风险应对

### 4.1 AI 服务不可用
**风险**：Deepseek API 限流或不可用，导致发布/搜索功能失败
**应对**：
- 所有 AI 调用必须有确定性回退
- 发布商品使用启发式碳估算（基于 tags + price）
- 搜索功能回退到关键词精确匹配
- 实现熔断器：连续失败 3 次后自动切换降级模式

### 4.2 地理编码失败
**风险**：Nominatim 服务不可用，地址无法转换为坐标
**应对**：
- 预设 IRISH_CITY_COORDS 城市中心坐标表
- 地理编码失败时使用对应城市中心坐标
- 允许用户手动调整位置

### 4.3 数据持久化丢失
**风险**：localStorage 满或被清除，favorites/cart 数据丢失
**应对**：
- 定期将状态同步到服务端（预留接口）
- 提供导出/导入功能（预留）
- 简洁的 localStorage 策略：仅存储 itemId[] 而非完整对象

### 4.4 移动端性能
**风险**：商品列表卡顿，地图加载慢
**应对**：
- 图片懒加载
- 分页加载（当前 seed 数据量小，预留分页接口）
- 地图标记聚合（商品数量增加时）

### 4.5 API 契约破坏
**风险**：修改 Item 结构导致前后端不兼容
**应对**：
- 宪法规定：API 契约变更需 PR 审查确认
- 预留 version 字段用于未来版本控制
- 单元测试覆盖所有 API 端点响应格式

---

## 5. 里程碑

| 阶段 | 内容 | 完成标准 |
|------|------|----------|
| M1 | 基础浏览 + 收藏购物车 | 核心流程跑通 |
| M2 | 发布功能 + AI 碳估算 | 商品可正常发布 |
| M3 | 地图展示 + 距离计算 | 地图交互完成 |
| M4 | AI 搜索 + 描述增强 | AI 功能完整 |
| M5 | 测试覆盖 + 文档完善 | 可维护性达标 |

---

**Version**: 1.0.0
**Created**: 2026-05-13
**Based on**: spec.md v1.0.0