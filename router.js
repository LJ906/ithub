//路由
//请求标识符的池子
//创建路由表 
//路由监听所有的标识符并绑定函数给与响应的响应
//3.监听访问请求标识符，绑定函数
//函数是index.js定义好的

// router是express里的
const express = require('express');
//创建一个路由容器
const router = express.Router();
//处理响应函数index.js user.js
let index =require('./controllers/index');
let user =require('./controllers/user');
let topic = require('./controllers/topic');

//首页模块
router.get('/', index.showIndex);

//用户模块   包括请求get ,post两种方式//signin 登录  signup注册
router.get('/signin', user.showSignin);   
router.post('/signin', user.handleSignin);
router.get('/signup', user.showSignup);
router.post('/signup', user.handleSignup);   //登录时
router.post('/logout', user.handleLogout);
router.get('/logout', user.handleLogout);


//话题模块

router
  .get('/topic/create', topic.showCreate)       //展示创建话题页面
  .post('/topic/create', topic.handleCreate)
  .get('/topic/show', topic.showTopic)
  .get('/topic/edit', topic.showEdit)
  .post('/topic/edit', topic.handleEdit)
  .get('/topic/delete', topic.handleDelete)



//4. 输出路由等等个
module.exports = router;
