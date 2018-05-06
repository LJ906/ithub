//路由
//请求标识符的池子
//app.js用到的所有路由都写到这里
// router是express里的
const express = require('express');
//创建一个路由容器
let router = express.Router();
//引入所有的回调函数
let index =require('./controllers/index');
let user =require('./controllers/user');

//创建路由表 
//路由监听所有的标识符并绑定函数给与响应的响应
//3.监听访问请求标识符，绑定函数
//函数是index.js定义好的

//首页模块
router.get('/', index.showIndex);


//用户模块 包括请求get ,post两种方式
router.get('/signin', user.showSignin);
router.post('/signin', user.handleSignin);
router.get('/signup', user.showSignup);
router.post('/signup', user.handleSignup);
router.post('/signout', user.handleSignout);



//4. 输出路由

module.exports = router;
