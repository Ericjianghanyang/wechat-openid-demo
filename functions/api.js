const axios = require('axios');

// 微信配置
const config = {
  wechat: {
    appId: process.env.WECHAT_APP_ID || 'wxe877716401fdb4c9',
    appSecret: process.env.WECHAT_APP_SECRET || 'ba18b658d81d63bdcd60a01d9fa0b3d8',
    token: process.env.WECHAT_TOKEN || 'mytoken123',
  }
};

exports.handler = async (event, context) => {
  // 设置CORS头
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  };

  // 处理OPTIONS请求
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    const path = event.path.replace('/.netlify/functions/api/', '');
    const { code, openid, access_token } = event.queryStringParameters || {};

    // 获取OpenID
    if (path === 'get-openid' && code) {
      const response = await axios.get(
        `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${config.wechat.appId}&secret=${config.wechat.appSecret}&code=${code}&grant_type=authorization_code`
      );

      if (response.data.openid) {
        console.log('获取openid成功:', response.data.openid);
        return {
          statusCode: 200,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            success: true,
            openid: response.data.openid,
            access_token: response.data.access_token
          })
        };
      } else {
        console.error('获取openid失败:', response.data);
        return {
          statusCode: 500,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ error: '获取openid失败', details: response.data })
        };
      }
    }

    // 获取用户信息
    if (path === 'get-user-info' && openid && access_token) {
      const response = await axios.get(
        `https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${openid}&lang=zh_CN`
      );

      if (response.data.openid) {
        console.log('获取用户信息成功:', response.data.nickname);
        return {
          statusCode: 200,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            success: true,
            userInfo: response.data
          })
        };
      } else {
        console.error('获取用户信息失败:', response.data);
        return {
          statusCode: 500,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ error: '获取用户信息失败', details: response.data })
        };
      }
    }

    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: '无效的API路径' })
    };

  } catch (error) {
    console.error('API处理错误:', error.message);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: '服务器错误', details: error.message })
    };
  }
}; 