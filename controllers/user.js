//管理路由中的处理响应的函数，输出出去，
// 需要使用时引入这个包即可
//用户模块
module.exports.showSignin = (req, res)=>{
    res.send('渲染登录页');
}

module.exports.handleSignin = (req, res) => {
    res.send('处理登录页')
  }
  
  module.exports.showSignup = (req, res) => {
    res.render('渲染注册页')
  }
  
  module.exports.handleSignup = (req, res) => {
    res.send('处理注册页')
  }
  
  module.exports.handleSignout = (req, res) => {
    res.send('处理退出页')
  }