#!/bin/bash

echo "🚀 微信服务号Vercel部署脚本"
echo "================================"

# 检查Git是否安装
if ! command -v git &> /dev/null; then
    echo "❌ Git未安装，请先安装Git"
    exit 1
fi

# 检查Node.js是否安装
if ! command -v node &> /dev/null; then
    echo "❌ Node.js未安装，请先安装Node.js"
    exit 1
fi

echo "✅ 环境检查通过"

# 提示用户创建GitHub仓库
echo ""
echo "📋 第一步：创建GitHub仓库"
echo "1. 访问 https://github.com"
echo "2. 创建新仓库：wechat-openid-demo"
echo "3. 复制仓库地址"
echo ""

read -p "请输入你的GitHub用户名: " github_username

if [ -z "$github_username" ]; then
    echo "❌ 用户名不能为空"
    exit 1
fi

# 设置远程仓库
echo "🔗 设置GitHub远程仓库..."
git remote remove origin 2>/dev/null
git remote add origin "https://github.com/$github_username/wechat-openid-demo.git"

# 提交更改
echo "📝 提交代码更改..."
git add .
git commit -m "Update config for Vercel deployment"

# 推送到GitHub
echo "⬆️  推送到GitHub..."
git push -u origin master

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ 代码已成功推送到GitHub！"
    echo ""
    echo "📋 第二步：使用Vercel部署"
    echo "1. 访问 https://vercel.com"
    echo "2. 使用GitHub账号登录"
    echo "3. 点击 'New Project'"
    echo "4. 选择你的 wechat-openid-demo 仓库"
    echo "5. 配置环境变量："
    echo "   - WECHAT_APP_ID: 你的微信AppID"
    echo "   - WECHAT_APP_SECRET: 你的微信AppSecret"
    echo "   - WECHAT_TOKEN: mytoken123"
    echo "6. 点击 'Deploy'"
    echo ""
    echo "📋 第三步：配置微信公众平台"
    echo "部署完成后，你会得到一个域名，类似："
    echo "https://wechat-openid-demo-xxx.vercel.app"
    echo ""
    echo "在微信公众平台配置："
    echo "- URL: https://你的vercel域名/wechat/auth"
    echo "- Token: mytoken123"
    echo "- 自定义菜单链接: https://你的vercel域名/userinfo.html"
    echo ""
    echo "🎉 完成！"
else
    echo "❌ 推送失败，请检查GitHub仓库是否正确创建"
fi 