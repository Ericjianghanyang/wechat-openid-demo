module.exports = {
  // 微信公众平台配置
  wechat: {
    appId: 'YOUR_APP_ID', // 替换为你的AppID
    appSecret: 'YOUR_APP_SECRET', // 替换为你的AppSecret
    token: 'mytoken123', // 与公众平台设置的token一致
    encodingAESKey: 'YOUR_ENCODING_AES_KEY' // 可选，如果使用加密模式
  },
  
  // 服务器配置
  server: {
    port: process.env.PORT || 3000,
    host: '0.0.0.0'
  },
  
  // 网站域名（需要是HTTPS）
  domain: 'https://你的域名.com'
}; 