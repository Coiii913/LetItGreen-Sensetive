# Newgreen 功能规格说明书

## 1. 概述

Newgreen 是一个面向爱尔兰 Dublin 地区的可持续二手市场应用。核心价值：促进物品再利用、减少碳排放、通过地图让本地交易可视化。设计针对小空间用户（10-15㎡ 学生宿舍）。

**Version**: 1.0.0
**Created**: 2026-05-13

---

## 2. 用户故事

### 用户故事 1：浏览商品

**作为** 一个环保意识较强的 Dublin 居民或学生
**我想要** 快速浏览二手商品列表并筛选
**以便** 找到便宜且环保的二手物品

**验收标准：**
- 商品卡片展示：标题、价格、距离、碳节省量（kg CO₂）、图片
- 首页默认显示所有商品
- 支持按类别筛选（CategoryTabs）
- 支持关键词搜索（SearchBar）
- 点击卡片进入商品详情页（DetailPage）

---

### 用户故事 2：AI 智能发布

**作为** 一个希望快速发布二手商品的用户
**我想要** 用 AI 辅助生成商品描述和碳排放估算
**以便** 简化发布流程并突出环保价值

**验收标准：**
- 用户填写：标题、价格、地点、商品状况
- 可上传图片，AI 提取文字并生成描述建议
- AI 自动估算碳节省量
- 发布后商品立即出现在列表顶部

---

### 用户故事 3：收藏与购物车

**作为** 一个有明确购买意向的用户
**我想要** 将心仪商品加入收藏或购物车
**以便** 稍后统一管理和联系卖家

**验收标准：**
- 点击心形图标切换收藏状态
- 点击购物车图标将商品加入购物车
- 收藏页和购物车页分别展示对应商品
- 状态数据持久化到 localStorage

---

### 用户故事 4：地图展示

**作为** 一个希望本地交易的用户
**我想要** 在地图上查看商品位置
**以便** 找到距离近的卖家

**验收标准：**
- 地图页显示 Dublin 为中心
- 商品标记点显示在地图上
- 点击标记点显示商品简要信息
- 点击信息弹窗跳转到商品详情页

---

## 3. 功能需求

| 编号 | 功能 | 描述 | 优先级 |
|------|------|------|--------|
| F1.1 | 商品列表 | 移动端卡片流布局，每卡显示核心信息 | P0 |
| F1.2 | 类别筛选 | 预设类别：living, plant, electronics, clothing 等 | P0 |
| F1.3 | 关键词搜索 | 精确匹配 title/description/keywords | P0 |
| F1.4 | 碳节省显示 | 每张卡片显示 co2Saved 值 | P0 |
| F1.5 | 距离显示 | distanceKm 显示卖家距离 | P1 |
| F2.1 | 图片上传 | 支持 base64 格式图片 | P0 |
| F2.2 | OCR 图像识别 | Tesseract.js 提取图片文字 | P1 |
| F2.3 | AI 生成描述 | POST /api/vision/analyze 生成 title/description | P1 |
| F2.4 | AI 碳估算 | POST /api/items 时 AI 估算 CO₂ 节省量 | P0 |
| F2.5 | 地址地理编码 | Nominatim 将地址转换为经纬度 | P0 |
| F2.6 | AI 描述增强 | 可选调用 POST /api/ai/enhance 优化描述 | P2 |
| F3.1 | 收藏功能 | AppContext.favorites 状态管理 | P0 |
| F3.2 | 购物车功能 | AppContext.cart 状态管理 | P0 |
| F3.3 | 状态持久化 | localStorage 存储 favorites/cart | P0 |
| F3.4 | 移除操作 | 收藏页/购物车页支持单商品移除 | P0 |
| F4.1 | 地图初始化 | Leaflet + react-leaflet，中心 Dublin | P0 |
| F4.2 | 商品标记 | 每个商品 lat/lng 显示标记点 | P0 |
| F4.3 | 标记弹窗 | 显示标题、价格、距离 | P0 |
| F4.4 | 距离计算 | Haversine 公式计算两点间距离 | P1 |
| F4.5 | 点击跳转 | 弹窗点击跳转至 DetailPage | P0 |

---

## 4. 成功标准

### 4.1 浏览模块
- [ ] GET /api/items 返回商品列表
- [ ] 搜索框输入关键词后过滤列表
- [ ] 类别标签切换后显示对应商品
- [ ] 碳节省数值正确计算并显示

### 4.2 发布模块
- [ ] 上传图片后 OCR 提取的文字显示在描述框
- [ ] AI 生成的标题和描述出现在表单预览区
- [ ] 发布后 AI 估算的碳节省量正确显示在商品卡片
- [ ] AI 服务失败时有降级方案（使用启发式默认值）

### 4.3 收藏购物车模块
- [ ] 点击心形图标 favorites 状态切换
- [ ] 点击购物车图标 cart 状态添加商品
- [ ] 刷新页面后收藏/购物车数据保留
- [ ] 购物车页面正确显示所有添加的商品
- [ ] 移除操作后列表正确更新

### 4.4 地图模块
- [ ] 地图正确加载并显示 Dublin 区域
- [ ] 所有带坐标的商品显示标记点
- [ ] 点击标记点弹出商品信息
- [ ] distanceKm() 函数正确计算距离
- [ ] 弹窗点击跳转到对应商品详情页

---

## 5. 关键实体

### Item（商品）
```typescript
interface Item {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: "EUR";
  distanceKm: number;
  location: {
    label: string;
    city: string;
    address: string;
    postcode: string;
    lat: number;
    lng: number;
  };
  condition: string;
  brand: string;
  co2Kg: number;           // 原始碳排放（负值表示节省）
  co2Saved: number;        // 计算后的碳节省量
  imageUrl: string;
  tags: string[];
  keywords: string[];
  postedMinutesAgo: number;
  compatibilityScore?: number;  // AI 搜索附加
  valueIndex?: number;          // AI 搜索附加
  matchReason?: string;        // AI 搜索附加
}
```

### CreateItemDto（创建商品请求）
```typescript
interface CreateItemDto {
  title: string;
  description: string;
  price: number;
  currency?: "EUR";
  location: {
    label?: string;
    city?: string;
    address?: string;
    postcode?: string;
    lat?: number;
    lng?: number;
    distanceKm?: number;
  };
  condition?: string;
  brand?: string;
  co2Kg?: number;
  imageUrl?: string;
  tags?: string[];
}
```

### CarbonCategory（碳排放类别）
```typescript
interface CarbonCategory {
  category: 'plant' | 'electronics' | 'clothes' | 'furniture' | 'books' | 'sports' | 'default';
  baseEmission: number;    // 基准排放量 (kg CO₂)
  decayRate: number;       // 衰减率
  formula: 'CO2_Saved = Production_Emission × (1 - Decay_Rate)';
}
```

### VisionResult（图像分析结果）
```typescript
interface VisionResult {
  status: "ok" | "error";
  suggestion: {
    title: string;
    description: string;
  };
  extractedText?: string;
}
```

---

## 6. API 契约

| 端点 | 方法 | 请求体 | 响应 |
|------|------|--------|------|
| /api/items | GET | - | Item[] |
| /api/items/:id | GET | - | Item |
| /api/items | POST | CreateItemDto | Item |
| /api/search | POST | { query: string } | { items: Item[] } |
| /api/vision/analyze | POST | { image: string } | VisionResult |
| /api/ai/enhance | POST | { text: string } | { status, enhancedText, keywords } |

---

## 7. 技术约束

- **移动优先**：设计针对 375px 宽度优化
- **AI 降级**：所有 AI 调用必须有确定性回退逻辑
- **数据持久化**：favorites/cart 使用 localStorage
- **地理编码回退**：Nominatim 失败时使用 IRISH_CITY_COORDS 城市中心坐标
- **碳排放计算**：客户端 carbonCalculator.js 与服务端 computeCo2SavedForItem() 逻辑一致