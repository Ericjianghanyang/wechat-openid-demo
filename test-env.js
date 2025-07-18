// 测试环境变量设置
console.log('=== 环境变量检查 ===');
console.log('WECHAT_APP_ID:', process.env.WECHAT_APP_ID ? '已设置' : '未设置');
console.log('WECHAT_APP_SECRET:', process.env.WECHAT_APP_SECRET ? '已设置' : '未设置');
console.log('WECHAT_TOKEN:', process.env.WECHAT_TOKEN ? '已设置' : '未设置');

if (process.env.WECHAT_TOKEN) {
  console.log('Token值:', process.env.WECHAT_TOKEN);
}

console.log('\n=== 微信验证测试 ===');
const crypto = require('crypto');

// 模拟微信验证参数
const timestamp = '1234567890';
const nonce = 'abcdef123456';
const echostr = 'test_echostr';

// 使用环境变量中的token
const token = process.env.WECHAT_TOKEN || 'mytoken123';
const tmpArr = [token, timestamp, nonce].sort();
const tmpStr = tmpArr.join('');
const sha1 = crypto.createHash('sha1');
sha1.update(tmpStr);
const hash = sha1.digest('hex');

console.log('Token:', token);
console.log('Timestamp:', timestamp);
console.log('Nonce:', nonce);
console.log('排序后的字符串:', tmpStr);
console.log('生成的签名:', hash);

// 生成测试URL
const testUrl = `https://jovial-kelpie-d0c56b.netlify.app/wechat/auth?signature=${hash}&timestamp=${timestamp}&nonce=${nonce}&echostr=${echostr}`;
console.log('\n测试URL:');
console.log(testUrl); 