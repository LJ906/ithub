//1. 引包
const express = require('express');
//引入 router 路由包
const router = require('./router');
//引入template
const template= require('art-template');
//引入body-parser
const bodyParser = require('body-parser');

//2.创建web服务
const app = express();

//配置模板 在这个页面配置也行
app.engine('html', require('express-art-template'));

//静态资源 2个
app.use('/node_modules', express.static('node_modules'));
app.use('/public', express.static('public'));

//3.监听访问请求标识符，绑定函数
// 由路由监听标识符并给予响应 所有的标识符都在路由池子中
//把路由挂在到app上
app.use(router);


//端口监听
app.listen(3000, ()=>{
    console.log('可以访问3000端口了');
});