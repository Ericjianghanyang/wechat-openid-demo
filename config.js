module.exports = {
  // 微信公众平台配置
  wechat: {
    appId: process.env.WECHAT_APP_ID || 'wxe877716401fdb4c9', // 你的AppID
    appSecret: process.env.WECHAT_APP_SECRET || 'ba18b658d81d63bdcd60a01d9fa0b3d8', // 你的AppSecret
    token: process.env.WECHAT_TOKEN || 'mytoken123', // 与公众平台设置的token一致
    encodingAESKey: process.env.WECHAT_ENCODING_AES_KEY || 'YOUR_ENCODING_AES_KEY' // 可选
  },
  
  // 服务器配置
  server: {
    port: process.env.PORT || 3000,
    host: '0.0.0.0'
  },
  
  // 网站域名（本地测试时使用ngrok地址）
  domain: process.env.NGROK_URL || 'http://localhost:3000'
}; 