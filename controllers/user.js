//管理路由中的处理响应的函数，输出出去，
// 需要使用时引入这个包即可
//用户模块
module.exports.showSignin = (req, res) => {
  // res.send('渲染登录页');
  res.render('login.html');
}

module.exports.handleSignin = (req, res) => {
  res.send('处理登录页')
}

module.exports.showSignup = (req, res) => {
  // res.render('渲染注册页')
  res.render('register.html')
}

//处理/signup标识符的post请求
module.exports.handleSignup = (req, res) => {
  res.send('处理注册页');
  //接收表单post请求的数据 body-parser方法
  let email = req.body.email;
  let nickname = req.body.nickname;

  //链接数据库，检验数据库是否存在相同的数据
  

}

module.exports.handleSignout = (req, res) => {
  res.send('处理退出页');
}