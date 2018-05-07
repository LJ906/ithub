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
                  message: '邮件不能为空'
                },
                emailAddress: {
                  message: '请输入正确的邮件地址如：123@qq.com'
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
            console.log(data);
            // 根据获取到的状态吗
            // if (data.code == 1002) {
            //   location.href = '/';
            // }
            // if(data.code == 10001){
            //   alert(data.message);
            // }
            // if(data.code == 1000){
            //   alert(data.message);
            // }

        }
        
    })
})


})
