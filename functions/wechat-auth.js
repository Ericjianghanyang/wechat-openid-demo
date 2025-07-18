const crypto = require('crypto');

// 微信配置
const config = {
  wechat: {
    appId: 'wxe877716401fdb4c9',
    appSecret: 'ba18b658d81d63bdcd60a01d9fa0b3d8',
    token: 'mytoken123',
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
    const { signature, timestamp, nonce, echostr } = event.queryStringParameters || {};

    // 如果是GET请求，尝试微信验证
    if (event.httpMethod === 'GET') {
      // 检查是否有微信验证所需的参数
      if (signature && timestamp && nonce) {
        // 验证签名
        const token = config.wechat.token;
        const tmpArr = [token, timestamp, nonce].sort();
        const tmpStr = tmpArr.join('');
        const sha1 = crypto.createHash('sha1');
        sha1.update(tmpStr);
        const hash = sha1.digest('hex');

        console.log('微信验证参数:', { signature, timestamp, nonce, echostr, hash });

        if (hash === signature) {
          console.log('微信服务器验证成功');
          return {
            statusCode: 200,
            headers: { 'Content-Type': 'text/plain; charset=utf-8' },
            body: echostr || 'success'
          };
        } else {
          console.log('微信服务器验证失败');
          return {
            statusCode: 403,
            headers: { 'Content-Type': 'text/plain; charset=utf-8' },
            body: '验证失败'
          };
        }
      } else {
        // 没有验证参数，返回说明
        return {
          statusCode: 200,
          headers: { 'Content-Type': 'text/plain; charset=utf-8' },
          body: '微信验证接口 - 请提供正确的验证参数'
        };
      }
    }

    // 处理POST请求（微信消息）
    if (event.httpMethod === 'POST') {
      console.log('收到微信消息:', event.body);
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'text/plain' },
        body: 'success'
      };
    }

    return {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain' },
      body: '无效请求'
    };

  } catch (error) {
    console.error('处理微信请求错误:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'text/plain' },
      body: '服务器错误'
    };
  }
}; 