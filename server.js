const express = require('express');
const crypto = require('crypto');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');

const app = express();

// 中间件
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// 存储access_token
let accessToken = null;
let tokenExpireTime = 0;

// 获取access_token
async function getAccessToken() {
  const now = Date.now();
  
  // 如果token还有效，直接返回
  if (accessToken && now < tokenExpireTime) {
    return accessToken;
  }
  
  try {
    const response = await axios.get(
      `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${config.wechat.appId}&secret=${config.wechat.appSecret}`
    );
    
    if (response.data.access_token) {
      accessToken = response.data.access_token;
      tokenExpireTime = now + (response.data.expires_in - 300) * 1000; // 提前5分钟过期
      console.log('获取access_token成功');
      return accessToken;
    } else {
      console.error('获取access_token失败:', response.data);
      throw new Error('获取access_token失败');
    }
  } catch (error) {
    console.error('获取access_token错误:', error.message);
    throw error;
  }
}

// 微信服务器验证
app.get('/wechat/auth', (req, res) => {
  const { signature, timestamp, nonce, echostr } = req.query;
  
  // 验证签名
  const token = config.wechat.token;
  const tmpArr = [token, timestamp, nonce].sort();
  const tmpStr = tmpArr.join('');
  const sha1 = crypto.createHash('sha1');
  sha1.update(tmpStr);
  const hash = sha1.digest('hex');
  
  if (hash === signature) {
    console.log('微信服务器验证成功');
    res.send(echostr);
  } else {
    console.log('微信服务器验证失败');
    res.status(403).send('验证失败');
  }
});

// 处理微信消息
app.post('/wechat/auth', (req, res) => {
  console.log('收到微信消息:', req.body);
  res.send('success');
});

// 获取用户openid的接口
app.get('/api/get-openid', async (req, res) => {
  const { code } = req.query;
  
  if (!code) {
    return res.status(400).json({ error: '缺少code参数' });
  }
  
  try {
    // 通过code获取access_token和openid
    const response = await axios.get(
      `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${config.wechat.appId}&secret=${config.wechat.appSecret}&code=${code}&grant_type=authorization_code`
    );
    
    if (response.data.openid) {
      console.log('获取openid成功:', response.data.openid);
      res.json({
        success: true,
        openid: response.data.openid,
        access_token: response.data.access_token
      });
    } else {
      console.error('获取openid失败:', response.data);
      res.status(500).json({ error: '获取openid失败', details: response.data });
    }
  } catch (error) {
    console.error('获取openid错误:', error.message);
    res.status(500).json({ error: '获取openid错误', details: error.message });
  }
});

// 获取用户信息的接口
app.get('/api/get-user-info', async (req, res) => {
  const { openid, access_token } = req.query;
  
  if (!openid || !access_token) {
    return res.status(400).json({ error: '缺少openid或access_token参数' });
  }
  
  try {
    // 获取用户基本信息
    const response = await axios.get(
      `https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${openid}&lang=zh_CN`
    );
    
    if (response.data.openid) {
      console.log('获取用户信息成功:', response.data.nickname);
      res.json({
        success: true,
        userInfo: response.data
      });
    } else {
      console.error('获取用户信息失败:', response.data);
      res.status(500).json({ error: '获取用户信息失败', details: response.data });
    }
  } catch (error) {
    console.error('获取用户信息错误:', error.message);
    res.status(500).json({ error: '获取用户信息错误', details: error.message });
  }
});

// 启动服务器
const PORT = config.server.port;
app.listen(PORT, config.server.host, () => {
  console.log(`服务器运行在 http://${config.server.host}:${PORT}`);
  console.log('请确保你的域名已配置HTTPS，并在微信公众平台设置服务器地址');
});

// 导出app供Vercel使用
module.exports = app; 