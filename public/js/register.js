//注册页面的js

//注册页面表单验证 -使用bootstrap-validator插件 基于jquery
$(function(){
    $('#register_form').bootstrapValidator({
     
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
            // 昵称
            nickname: {//验证input项：验证规则
              validators: {
                notEmpty: {
                  message: '昵称不能为空'
                },
                stringLength: {
                  min: 2,
                  max: 30,
                  message: '昵称的长度必须在2到30之间'
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
                different: {//不能和用户名相同
                  field: 'username',//需要进行比较的input name值
                  message: '不能和用户名相同'
                }
              }
            }
          }
    })

    //错误验证
    // .on('error.form.bv', function(e) {
    //     console.log('error');

    //     // Active the panel element containing the first invalid element
    //     var $form         = $(e.target),
    //         validator     = $form.data('bootstrapValidator'),
    //         $invalidField = validator.getInvalidFields().eq(0),
    //         $collapse     = $invalidField.parents('.collapse');

    //     $collapse.collapse('show');
    // });
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
            url: '/signup',  //注册/signup 
            data: $form.serialize(),   
            success: function(data){
                console.log(data);
                // 根据获取到的状态吗
                if (data.code == 1002) {
                  location.href = '/';
                }
                if(data.code == 10001){
                  alert(data.message);
                }
                if(data.code == 1000){
                  alert(data.message);
                }

            }
            
        })
    })



})


