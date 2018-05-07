//管理路由中的处理响应的函数，输出出去，
// 需要使用时引入这个包即可
//引入数据库db.js
const db = require('./db');  //拿到一个链接
const connection = require('./db');
//引入事件moment的包
const moment = require('moment');
//引入md5的包
const md5 = require('md5');
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

  //接收表单post请求的数据 body-parser方法
  let email = req.body.email;
  let nickname = req.body.nickname;
  //链接数据库，检验数据库是否存在相同的数据
  let selectSql= "select * from users where email = '" + email +"'";
  let selectNickname = "select * from users where email = '" + nickname +"'";
  // let selectNickname = 'select * from users where nickname=? ',req.body.nickname;

  //console.log(selectSql);
  connection.query(selectSql, function (error, results, fields) {
    if(error){
      return res.send(error);
    }
    //console.log(results);  //results是一个数组
    //如果能够筛选到东西则，证明存在同名的数据则
    // 返回一个对象给前端提示用户名已存在
    if(results[0]){ //如果存在第一个就是有数据
      return  res.status(200).send({
        code: 1000,          //错误码
        message: '该邮箱已经被注册'
      })
    }

    //如果邮箱没有重复， 验证nickname 
    connection.query(selectNickname, (error, results) => {
      if (error) {
        return res.send(error);
      }
      //如果查询到信息证明已经存在
      if (results[0]) {
        return res.status(200).json({
          code: 10001,
          message: "昵称已被占用"
        })
      }

    })

    //如果没有东西证明可以注册，则把数据保存到数据库
    let newUser = {
      email: email,     //上面已经声明了
      password: md5(md5(req.body.password)),//加密2次   
      nickname: nickname,
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss') , 
      updatedAt: moment().format('YYYY-MM-DD HH:mm:ss') ,
    }

    connection.query('insert into users set?', newUser, (error, results)=>{
      if(error){
        return res.send({
          code: error.code,
          message:error.message
        })
      }

      //如果没有错误，则提示注册成功
      console.log(results); //返回一个成功的对象，
      if(results.insertId){ //如果insertId存在证明成功了
          res.send({
            code: 1002,
            message: '注册成功'
          })
      }
    })
    
    


});

}

module.exports.handleSignout = (req, res) => {
  res.send('处理退出页');
}