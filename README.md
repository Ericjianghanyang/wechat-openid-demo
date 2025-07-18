# 微信服务号获取用户OpenID和用户资料

这是一个完整的微信服务号开发示例，演示如何获取用户的OpenID和基本信息。

## 功能特性

- ✅ 微信服务器验证
- ✅ 获取用户OpenID
- ✅ 获取用户基本信息（昵称、头像、性别、地区等）
- ✅ 美观的用户界面
- ✅ 错误处理和提示

## 项目结构

```
WeChat-openid/
├── config.js          # 配置文件
├── server.js          # 服务器主文件
├── package.json       # 项目依赖
├── public/            # 静态文件
│   └── userinfo.html  # 用户信息页面
└── README.md          # 说明文档
```

## 安装和配置

### 1. 安装依赖

```bash
npm install
```

### 2. 配置微信公众平台

#### 2.1 获取AppID和AppSecret
1. 登录微信公众平台 (mp.weixin.qq.com)
2. 进入"开发"→"基本配置"
3. 记录下AppID和AppSecret

#### 2.2 配置服务器地址
在"基本配置"页面：
- **URL**: `https://你的域名/wechat/auth`
- **Token**: `mytoken123` (或自定义)
- **EncodingAESKey**: 自动生成
- **消息加解密方式**: 明文模式

#### 2.3 配置自定义菜单
在"自定义菜单"中：
- **菜单名称**: 用户信息
- **菜单类型**: 跳转网页
- **网页链接**: `https://你的域名/userinfo.html`

### 3. 修改配置文件

编辑 `config.js` 文件：

```javascript
module.exports = {
  wechat: {
    appId: 'YOUR_APP_ID',        // 替换为你的AppID
    appSecret: 'YOUR_APP_SECRET', // 替换为你的AppSecret
    token: 'mytoken123',         // 与公众平台设置的token一致
  },
  server: {
    port: 3000,
    host: '0.0.0.0'
  },
  domain: 'https://你的域名.com'  // 替换为你的域名
};
```

### 4. 部署到服务器

#### 4.1 本地测试
```bash
npm start
```

#### 4.2 生产环境部署
确保你的服务器：
- 有公网IP或域名
- 配置了HTTPS证书（微信要求）
- 开放了3000端口（或你设置的端口）

## 使用流程

### 1. 用户访问流程
1. 用户关注你的微信服务号
2. 用户点击自定义菜单"用户信息"
3. 微信跳转到你的网页，并带上授权码(code)
4. 网页自动获取用户信息并显示

### 2. 技术流程
1. 微信跳转：`https://你的域名/userinfo.html?code=xxx`
2. 前端获取code参数
3. 调用后端API获取OpenID：`/api/get-openid?code=xxx`
4. 调用后端API获取用户信息：`/api/get-user-info?openid=xxx&access_token=xxx`
5. 显示用户信息

## API接口说明

### 1. 获取OpenID
```
GET /api/get-openid?code=xxx
```

**响应示例：**
```json
{
  "success": true,
  "openid": "oW_123456789",
  "access_token": "ACCESS_TOKEN"
}
```

### 2. 获取用户信息
```
GET /api/get-user-info?openid=xxx&access_token=xxx
```

**响应示例：**
```json
{
  "success": true,
  "userInfo": {
    "openid": "oW_123456789",
    "nickname": "用户昵称",
    "sex": "1",
    "province": "广东",
    "city": "深圳",
    "country": "中国",
    "headimgurl": "http://...",
    "privilege": []
  }
}
```

## 常见问题

### Q1: 为什么需要HTTPS？
A: 微信要求所有网页必须使用HTTPS协议，这是安全要求。

### Q2: 如何获取HTTPS证书？
A: 可以使用Let's Encrypt免费证书，或者购买商业证书。

### Q3: 为什么获取不到用户信息？
A: 可能的原因：
- 用户没有授权
- AppID或AppSecret错误
- 域名没有在微信公众平台配置
- 用户取消了关注

### Q4: 如何测试？
A: 建议使用微信开发者工具或真机测试，浏览器直接访问可能无法正常工作。

## 安全注意事项

1. **保护AppSecret**: 不要在前端代码中暴露AppSecret
2. **HTTPS**: 必须使用HTTPS协议
3. **域名白名单**: 在微信公众平台配置合法域名
4. **Token验证**: 确保Token的安全性

## 扩展功能

你可以基于这个基础项目扩展更多功能：
- 用户数据存储
- 消息推送
- 支付功能
- 客服消息
- 模板消息

## 技术支持

如果遇到问题，请检查：
1. 微信公众平台配置是否正确
2. 服务器是否正常运行
3. 网络连接是否正常
4. 控制台是否有错误信息

## 许可证

MIT License 