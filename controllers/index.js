//这里面装的是 路由监听各个标识符的回调函数

//首页的
module.exports.showIndex = (req,res)=>{
   // res.send('首页');
   res.render('index.html');
}



