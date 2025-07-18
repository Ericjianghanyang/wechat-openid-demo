# GitHub仓库创建详细指南

## 📋 第一步：创建GitHub仓库

### 1. 访问GitHub
打开浏览器，访问：https://github.com

### 2. 登录账号
- 如果已登录，跳过此步骤
- 如果未登录，输入用户名和密码登录

### 3. 创建新仓库
1. 点击右上角的 **"+"** 号
2. 选择 **"New repository"**

### 4. 填写仓库信息
在创建页面填写以下信息：

- **Repository name**: `wechat-openid-demo`
- **Description**: `微信服务号获取用户OpenID项目`
- **Visibility**: 选择 **"Public"** ✅
- **不要**勾选 "Add a README file" ❌
- **不要**勾选 "Add .gitignore" ❌
- **不要**勾选 "Choose a license" ❌

### 5. 创建仓库
点击 **"Create repository"** 按钮

## 📋 第二步：上传代码

### 1. 在本地项目目录运行命令

创建仓库后，回到你的本地项目目录，运行以下命令：

```bash
# 设置远程仓库（替换为你的用户名）
git remote set-url origin https://github.com/你的用户名/wechat-openid-demo.git

# 推送代码
git push -u origin master
```

### 2. 验证上传成功
- 刷新GitHub页面
- 应该能看到你的项目文件

## 📋 第三步：使用Vercel部署

### 1. 注册Vercel
1. 访问：https://vercel.com
2. 点击 **"Sign Up"**
3. 选择 **"Continue with GitHub"**
4. 授权Vercel访问你的GitHub

### 2. 导入项目
1. 登录Vercel后，点击 **"New Project"**
2. 在 "Import Git Repository" 中找到你的 `wechat-openid-demo` 仓库
3. 点击 **"Import"**

### 3. 配置项目
1. **Project Name**: `wechat-openid-demo`
2. **Framework Preset**: 选择 **"Node.js"**
3. 其他选项保持默认

### 4. 配置环境变量
在 "Environment Variables" 部分添加：

| Name | Value | Environment |
|------|-------|-------------|
| `WECHAT_APP_ID` | 你的微信AppID | Production, Preview, Development |
| `WECHAT_APP_SECRET` | 你的微信AppSecret | Production, Preview, Development |
| `WECHAT_TOKEN` | `mytoken123` | Production, Preview, Development |

### 5. 部署
点击 **"Deploy"** 按钮，等待部署完成

## 📋 第四步：获取域名

部署成功后，你会得到一个域名，类似：
```
https://wechat-openid-demo-xxx.vercel.app
```

## 📋 第五步：配置微信公众平台

### 1. 配置服务器地址
在微信公众平台 "开发" → "基本配置"：
- **URL**: `https://你的vercel域名/wechat/auth`
- **Token**: `mytoken123`
- **EncodingAESKey**: 点击"随机生成"
- **消息加解密方式**: 明文模式

### 2. 配置自定义菜单
在 "自定义菜单" 中：
- **菜单名称**: 用户信息
- **菜单类型**: 跳转网页
- **网页链接**: `https://你的vercel域名/userinfo.html`

## 🎉 完成！

现在你有了一个免费的HTTPS域名，可以用于微信服务号开发了！

## 🔧 常见问题

### Q: 创建仓库时提示名称已存在
**解决**: 换一个仓库名称，比如 `wechat-openid-demo-2024`

### Q: 推送代码时提示权限错误
**解决**: 确保你已登录GitHub，并且有权限创建仓库

### Q: Vercel部署失败
**解决**: 检查环境变量是否正确配置，确保GitHub仓库是公开的 