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

console.log('=== 详细微信验证测试 ===');
console.log('Token:', token);
console.log('Timestamp:', timestamp);
console.log('Nonce:', nonce);
console.log('Echostr:', echostr);
console.log('Signature:', signature);
console.log('');

// 构建测试URL
const testUrl = `https://jovial-kelpie-d0c56b.netlify.app/wechat/auth?signature=${signature}&timestamp=${timestamp}&nonce=${nonce}&echostr=${echostr}`;

console.log('测试URL:');
console.log(testUrl);
console.log('');

// 验证签名计算过程
console.log('=== 签名验证过程 ===');
console.log('1. 排序后的数组:', tmpArr);
console.log('2. 拼接字符串:', tmpStr);
console.log('3. SHA1哈希:', signature);
console.log('');

// 测试不同的URL
console.log('=== 测试不同路径 ===');
console.log('1. 直接函数路径:');
console.log(`curl "https://jovial-kelpie-d0c56b.netlify.app/.netlify/functions/wechat-auth?signature=${signature}&timestamp=${timestamp}&nonce=${nonce}&echostr=${echostr}"`);
console.log('');
console.log('2. 重定向路径:');
console.log(`curl "https://jovial-kelpie-d0c56b.netlify.app/wechat/auth?signature=${signature}&timestamp=${timestamp}&nonce=${nonce}&echostr=${echostr}"`); 