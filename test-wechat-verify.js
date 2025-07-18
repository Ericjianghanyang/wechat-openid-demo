const crypto = require('crypto');

// 微信验证参数
const token = 'mytoken123';
const timestamp = Math.floor(Date.now() / 1000).toString();
const nonce = Math.random().toString(36).substr(2, 15);
const echostr = 'test_echostr_' + Date.now();

// 生成签名
const tmpArr = [token, timestamp, nonce].sort();
const tmpStr = tmpArr.join('');
const sha1 = crypto.createHash('sha1');
sha1.update(tmpStr);
const signature = sha1.digest('hex');

console.log('=== 微信服务器验证测试 ===');
console.log('Token:', token);
console.log('Timestamp:', timestamp);
console.log('Nonce:', nonce);
console.log('Echostr:', echostr);
console.log('Signature:', signature);
console.log('');

// 构建测试URL
const testUrl = `https://c34808cf158b.ngrok-free.app/wechat/auth?signature=${signature}&timestamp=${timestamp}&nonce=${nonce}&echostr=${echostr}`;

console.log('测试URL:');
console.log(testUrl);
console.log('');
console.log('请在浏览器中访问上述URL，应该返回echostr值');
console.log('或者使用curl命令:');
console.log(`curl "${testUrl}"`); 