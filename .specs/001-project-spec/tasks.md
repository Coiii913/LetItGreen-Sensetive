# Newgreen 任务清单

## P1 - 核心功能

### T-1.1 商品列表页
**文件**：client/src/pages/HomePage.jsx, client/src/components/ProductCard.jsx
**步骤**：
1. 实现 HomePage 组件，调用 GET /api/items 获取商品列表
2. 实现 ProductCard 组件，显示 title、price、distanceKm、co2Saved、imageUrl
3. 集成 SearchBar 组件，支持关键词过滤
4. 集成 CategoryTabs 组件，支持类别筛选
**依赖**：-
**验收标准**：
- [ ] 首页加载时调用 GET /api/items 显示商品列表
- [ ] 商品卡片显示所有核心字段
- [ ] 搜索框输入关键词过滤列表
- [ ] 类别标签切换后显示对应商品

---

### T-1.2 商品详情页
**文件**：client/src/pages/DetailPage.jsx
**步骤**：
1. 实现 DetailPage 组件，通过 useParams 获取 item id
2. 调用 GET /api/items/:id 获取商品详情
3. 显示完整商品信息（标题、描述、价格、碳节省量、图片）
4. 添加收藏按钮和加入购物车按钮
**依赖**：T-1.1
**验收标准**：
- [ ] URL /items/:id 正确匹配详情页
- [ ] 显示完整商品信息
- [ ] 收藏/购物车按钮功能正常

---

### T-1.3 收藏功能
**文件**：client/src/state/AppContext.jsx, client/src/pages/FavoritesPage.jsx
**步骤**：
1. AppContext 添加 favorites 状态（Set\<itemId\>）
2. localStorage 持久化 favorites
3. 实现 FavoritesPage 页面，读取并显示收藏商品
4. 商品卡片添加收藏按钮（心形图标）
**依赖**：T-1.1
**验收标准**：
- [ ] 点击心形图标切换收藏状态
- [ ] 收藏页正确显示已收藏商品
- [ ] 刷新页面后收藏数据保留
- [ ] 收藏页支持移除商品

---

### T-1.4 购物车功能
**文件**：client/src/state/AppContext.jsx, client/src/pages/CartPage.jsx
**步骤**：
1. AppContext 添加 cart 状态（Item[]）
2. localStorage 持久化 cart
3. 实现 CartPage 页面，读取并显示购物车商品
4. 商品卡片/详情页添加加入购物车按钮
**依赖**：T-1.1, T-1.2
**验收标准**：
- [ ] 点击加入购物车按钮添加商品
- [ ] 购物车页正确显示所有商品
- [ ] 刷新页面后购物车数据保留
- [ ] 购物车页支持移除商品
- [ ] 同一商品最多加入 1 次

---

### T-1.5 发布商品页
**文件**：client/src/pages/PostPage.jsx
**步骤**：
1. 实现 PostPage 表单组件
2. 表单字段：标题、描述、价格、地点、商品状况、图片上传
3. 调用 POST /api/items 创建商品
4. 实现图片 base64 预览
**依赖**：T-1.1
**验收标准**：
- [ ] 表单字段完整（标题、描述、价格、地点、状况）
- [ ] 图片上传支持 base64 预览
- [ ] POST /api/items 成功后商品出现在列表顶部
- [ ] 表单验证：标题和描述必填，价格必须为正数

---

### T-1.6 地图展示页
**文件**：client/src/pages/MapPage.jsx, client/src/utils/geoUtils.js
**步骤**：
1. 实现 MapPage，集成 react-leaflet
2. 地图中心设为 Dublin (53.3498, -6.2603)
3. 遍历商品列表，添加 Marker 标记点
4. 实现标记弹窗，显示标题、价格、距离
5. 弹窗点击跳转到 DetailPage
**依赖**：T-1.1
**验收标准**：
- [ ] 地图正确加载并显示 Dublin 区域
- [ ] 所有带坐标的商品显示标记点
- [ ] 点击标记点弹出商品信息
- [ ] 弹窗点击跳转到对应商品详情页

---

### T-1.7 导航组件
**文件**：client/src/App.jsx
**步骤**：
1. 实现 TopNav 组件（顶部导航）
2. 实现 BottomNav 组件（底部导航栏）
3. 路由配置：/（首页）、/post、/items/:id、/map、/favorites、/cart
**依赖**：-
**验收标准**：
- [ ] TopNav 显示页面标题，支持返回首页
- [ ] BottomNav 显示 4 个导航按钮（地图、发布、收藏、购物车）
- [ ] 路由跳转正常

---

## P2 - 增强功能

### T-2.1 AI 搜索
**文件**：server/index.js（/api/search）
**步骤**：
1. 实现 POST /api/search 端点
2. 调用 Deepseek API 分析查询意图
3. 返回匹配商品列表及 compatibilityScore、valueIndex
4. AI 失败时回退到关键词精确匹配
**依赖**：T-1.1
**验收标准**：
- [ ] POST /api/search 返回匹配商品
- [ ] 响应包含 compatibilityScore 和 valueIndex
- [ ] AI 服务失败时回退到关键词搜索
- [ ] 搜索结果正确高亮匹配原因

---

### T-2.2 AI 碳估算
**文件**：server/index.js（/api/items POST）
**步骤**：
1. 在 POST /api/items 中调用 Deepseek API 估算碳节省量
2. AI 失败时使用启发式回退（基于 tags + price）
3. 将估算结果附加到 newItem.co2Kg
**依赖**：T-1.5
**验收标准**：
- [ ] 发布商品时 AI 估算碳节省量
- [ ] AI 失败时使用启发式默认值
- [ ] co2Saved 正确显示在商品卡片

---

### T-2.3 图片 OCR 识别
**文件**：server/index.js（/api/vision/analyze）
**步骤**：
1. 实现 POST /api/vision/analyze 端点
2. 使用 Tesseract.js 提取图片文字
3. 使用 Sharp 分析图片主色调判断类别
4. 调用 Deepseek API 生成 title 和 description
5. AI 失败时回退到提取文字 + 颜色判断
**依赖**：T-1.5
**验收标准**：
- [ ] 上传图片后返回提取的文字
- [ ] 根据主色调判断商品类别（绿=plant，蓝=electronics）
- [ ] AI 生成 title 和 description
- [ ] AI 失败时有合理回退

---

### T-2.4 地理编码
**文件**：server/index.js（geocodeAddress 函数）
**步骤**：
1. 实现 geocodeAddress 函数，调用 Nominatim API
2. 将地址字符串转换为 lat/lng
3. Nominatim 失败时使用 IRISH_CITY_COORDS 城市中心坐标
**依赖**：T-1.5
**验收标准**：
- [ ] 用户填写地址后自动解析为坐标
- [ ] 地理编码失败时使用 Dublin 中心坐标
- [ ] 商品详情页正确显示位置信息

---

## P3 - 优化功能

### T-3.1 AI 描述增强
**文件**：server/index.js（/api/ai/enhance）
**步骤**：
1. 实现 POST /api/ai/enhance 端点
2. 调用 Deepseek API 优化商品描述
3. 返回 enhancedText 和 keywords
4. AI 失败时返回原始文本
**依赖**：T-2.2
**验收标准**：
- [ ] 短描述输入后返回增强版本
- [ ] 响应包含 enhancedText 和 keywords
- [ ] AI 失败时返回原始文本

---

### T-3.2 图像分析完整流程
**文件**：client/src/pages/PostPage.jsx
**步骤**：
1. PostPage 集成 /api/vision/analyze 调用
2. 图片上传后自动调用 OCR + AI 分析
3. 分析结果填充到表单字段
4. 用户可编辑 AI 生成的内容
**依赖**：T-2.3
**验收标准**：
- [ ] 上传图片后自动触发分析
- [ ] 分析结果显示在表单预览区
- [ ] 用户可修改 AI 生成的内容
- [ ] 降级状态下显示原始 OCR 文字

---

### T-3.3 商品排序
**文件**：client/src/pages/HomePage.jsx
**步骤**：
1. HomePage 添加排序选项（价格升/降、距离、碳节省）
2. 前端实现排序逻辑
3. UI 显示当前排序方式和排序选项
**依赖**：T-1.1
**验收标准**：
- [ ] 支持按价格升序/降序排序
- [ ] 支持按距离排序
- [ ] 支持按碳节省量排序
- [ ] 排序选项 UI 显示正常

---

## 任务状态速查

| 任务 | 状态 | 依赖 |
|------|------|------|
| T-1.1 商品列表页 | 待办 | - |
| T-1.2 商品详情页 | 待办 | T-1.1 |
| T-1.3 收藏功能 | 待办 | T-1.1 |
| T-1.4 购物车功能 | 待办 | T-1.1, T-1.2 |
| T-1.5 发布商品页 | 待办 | T-1.1 |
| T-1.6 地图展示页 | 待办 | T-1.1 |
| T-1.7 导航组件 | 待办 | - |
| T-2.1 AI 搜索 | 待办 | T-1.1 |
| T-2.2 AI 碳估算 | 待办 | T-1.5 |
| T-2.3 图片 OCR 识别 | 待办 | T-1.5 |
| T-2.4 地理编码 | 待办 | T-1.5 |
| T-3.1 AI 描述增强 | 待办 | T-2.2 |
| T-3.2 图像分析完整流程 | 待办 | T-2.3 |
| T-3.3 商品排序 | 待办 | T-1.1 |

---

**Version**: 1.0.0
**Created**: 2026-05-13
**Based on**: plan.md v1.0.0