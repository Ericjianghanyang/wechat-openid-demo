# Vercel部署微信服务号项目指南

## 🎯 目标
使用Vercel免费部署微信服务号项目，获得HTTPS域名。

## 📋 完整步骤

### 第一步：准备GitHub仓库

#### 1.1 创建GitHub账号
1. 访问 https://github.com
2. 注册新账号（如果还没有的话）

#### 1.2 创建新仓库
1. 登录GitHub后，点击右上角 "+" → "New repository"
2. 填写仓库信息：
   - **Repository name**: `wechat-openid-demo`
   - **Description**: 微信服务号获取用户OpenID项目
   - **Visibility**: Public
   - **不要**勾选 "Add a README file"
3. 点击 "Create repository"

#### 1.3 上传代码到GitHub
在本地项目目录运行：
```bash
# 替换为你的GitHub用户名
git remote add origin https://github.com/你的用户名/wechat-openid-demo.git
git push -u origin master
```

### 第二步：使用Vercel部署

#### 2.1 注册Vercel账号
1. 访问 https://vercel.com
2. 点击 "Sign Up"
3. 选择 "Continue with GitHub"（推荐）
4. 授权Vercel访问你的GitHub

#### 2.2 导入项目
1. 登录Vercel后，点击 "New Project"
2. 在 "Import Git Repository" 中找到你的 `wechat-openid-demo` 仓库
3. 点击 "Import"

#### 2.3 配置项目
1. **Project Name**: `wechat-openid-demo`（或自定义）
2. **Framework Preset**: 选择 "Node.js"
3. **Root Directory**: 保持默认（./）
4. **Build Command**: 保持默认
5. **Output Directory**: 保持默认
6. **Install Command**: 保持默认

#### 2.4 环境变量配置
在 "Environment Variables" 部分添加：
- **Name**: `WECHAT_APP_ID`
- **Value**: 你的微信AppID
- **Environment**: Production, Preview, Development

- **Name**: `WECHAT_APP_SECRET`
- **Value**: 你的微信AppSecret
- **Environment**: Production, Preview, Development

- **Name**: `WECHAT_TOKEN`
- **Value**: `mytoken123`
- **Environment**: Production, Preview, Development

#### 2.5 部署
1. 点击 "Deploy"
2. 等待部署完成（通常1-2分钟）
3. 部署成功后，你会得到一个域名，类似：
   `https://wechat-openid-demo-xxx.vercel.app`

### 第三步：修改项目配置

#### 3.1 更新config.js
将 `config.js` 修改为使用环境变量：
```javascript
module.exports = {
  wechat: {
    appId: process.env.WECHAT_APP_ID || 'YOUR_APP_ID',
    appSecret: process.env.WECHAT_APP_SECRET || 'YOUR_APP_SECRET',
    token: process.env.WECHAT_TOKEN || 'mytoken123',
  },
  server: {
    port: process.env.PORT || 3000,
    host: '0.0.0.0'
  },
  domain: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://你的域名.com'
};
```

#### 3.2 重新部署
1. 在本地修改 `config.js` 文件
2. 提交并推送更改：
```bash
git add config.js
git commit -m "Update config to use environment variables"
git push
```
3. Vercel会自动重新部署

### 第四步：配置微信公众平台

#### 4.1 获取Vercel域名
部署完成后，复制Vercel给你的域名，类似：
`https://wechat-openid-demo-xxx.vercel.app`

#### 4.2 配置服务器地址
在微信公众平台 "开发" → "基本配置"：
- **URL**: `https://你的vercel域名/wechat/auth`
- **Token**: `mytoken123`
- **EncodingAESKey**: 点击"随机生成"
- **消息加解密方式**: 明文模式

#### 4.3 配置自定义菜单
在 "自定义菜单" 中：
- **菜单名称**: 用户信息
- **菜单类型**: 跳转网页
- **网页链接**: `https://你的vercel域名/userinfo.html`

### 第五步：测试

#### 5.1 测试网站
1. 访问你的Vercel域名
2. 应该看到"微信服务号开发测试"页面

#### 5.2 测试微信验证
1. 在微信公众平台点击"提交"服务器配置
2. 如果成功，会显示"配置成功"

#### 5.3 测试用户信息获取
1. 用微信关注你的服务号
2. 点击自定义菜单"用户信息"
3. 应该跳转到用户信息页面

## 🔧 技术说明

### Vercel的优势
- ✅ 免费HTTPS证书
- ✅ 全球CDN加速
- ✅ 自动部署
- ✅ 环境变量管理
- ✅ 无服务器架构

### 项目适配
- 使用 `vercel.json` 配置路由
- 环境变量管理敏感信息
- 适配无服务器环境

## 🚨 注意事项

### 1. 域名限制
- Vercel的免费域名格式：`项目名-xxx.vercel.app`
- 如果需要自定义域名，需要付费升级

### 2. 环境变量
- 不要在代码中硬编码AppSecret
- 使用Vercel的环境变量功能

### 3. 冷启动
- 无服务器函数有冷启动时间
- 首次访问可能稍慢

### 4. 请求限制
- Vercel免费版有请求限制
- 对于微信开发通常够用

## 🔄 更新部署

每次修改代码后：
```bash
git add .
git commit -m "更新说明"
git push
```

Vercel会自动检测到GitHub的更改并重新部署。

## 📞 常见问题

### Q1: 部署失败
**检查**：
- GitHub仓库是否正确
- 环境变量是否配置
- 代码是否有语法错误

### Q2: 微信验证失败
**检查**：
- 域名是否正确
- Token是否一致
- 路由配置是否正确

### Q3: 获取不到用户信息
**检查**：
- 环境变量是否正确设置
- 用户是否已关注服务号
- 菜单配置是否正确

## 🎉 完成！

部署完成后，你就有了一个免费的HTTPS域名，可以用于微信服务号开发了！ 