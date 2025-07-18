module.exports = {
  // 微信公众平台配置
  wechat: {
    appId: process.env.WECHAT_APP_ID || 'YOUR_APP_ID', // 从环境变量获取
    appSecret: process.env.WECHAT_APP_SECRET || 'YOUR_APP_SECRET', // 从环境变量获取
    token: process.env.WECHAT_TOKEN || 'mytoken123', // 从环境变量获取
    encodingAESKey: process.env.WECHAT_ENCODING_AES_KEY || 'YOUR_ENCODING_AES_KEY' // 可选
  },
  
  // 服务器配置
  server: {
    port: process.env.PORT || 3000,
    host: '0.0.0.0'
  },
  
  // 网站域名（Vercel会自动提供）
  domain: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://你的域名.com'
}; 