// 登录页面的js
//点击登陆按钮获取输入框中的数据 
//判断是否为空，是 提示， 否 发送ajax 路径/signin

$(function(){
    //bootstrap-validator做表单验证
    $('#login_form').bootstrapValidator({
     
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',//显示验证成功或者失败时的一个小图标
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //文件域/*验证：规则*/
        fields: {
            //文件域的name值，
            email: {
              validators: {
                notEmpty: {
                  message: '邮箱不能为空'
                },
                emailAddress: {
                  message: '请输入正确的邮件地址如：123@qq.com'
                },
                callback : {
                  message: '邮箱不存在'
                }
              }
            },
           
            password: {
              validators: {
                notEmpty: {
                  message: '密码不能为空'
                },
                stringLength: {
                  min: 3,
                  max: 30,
                  message: '密码长度必须在3到30之间'
                },
                callback : {
                  message: '密码错误'
                }
               
              }
            }
          }
    })

//正确验证， 如果正确则发送ajax请求，并发送数据
  .on('success.form.bv', function(e){
    //取消submit的默认事件
    e.preventDefault();
    //创建form的实例对象
    var $form = $(e.target);
    //创建bootstrapValidator 的实例对象
    var bv = $form.data('bootstrapValidator');

    //发送ajax
    $.ajax({
        type: 'post',
        url: '/signin',  //登录signin
        data: $form.serialize(),   
        success: function(data){
            //console.log(data);
            // 登录成功后 检测是否存在returnUrl 
            if (data.code == 10004) {   //登录成功
              //从url中获取returnUrl
              var url = new URLSearchParams(location.search);
              var returnUrl = url.get('returnUrl');
              console.log(returnUrl);
              if(returnUrl) {
                location.href = returnUrl;
                 console.log(returnUrl);
              }else {
                location.href = '/';
              }
              
            }
            if(data.code == 10005){  //密码错误
              // alert(data.message);
              // 更新文件域提示                           
              bv.updateStatus('password', 'INVALID', 'callback'); 

            }
            if(data.code == 10003){   //用户名不正确
             // alert(data.message);
              bv.updateStatus('email', 'INVALID', 'callback'); 
            }

        }
        
    })
})


})

//有时间可以改善一下alert 成mui.alert 等。。