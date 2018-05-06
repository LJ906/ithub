//1. 引包
let express = require('express')
//引入 router 
const router = require('./router')

//2.创建web服务
let app = express();

//3.监听访问请求标识符，绑定函数
// 由路由监听标识符并给予响应 所有的标识符都在路由池子中
//把路由挂在到app上
app.use(router);


//端口监听
app.listen(3000, ()=>{
    console.log('可以访问3000d端口了')
});