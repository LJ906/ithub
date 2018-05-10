//创建新话题页面


$(function () {
    //点击提交按钮， 获取表单中的数据
    $('#createTopic').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',//显示验证成功或者失败时的一个小图标
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //文件域/*验证：规则*/
        fields: {
            //文件域的name值，
            title: {
              validators: {
                notEmpty: {
                  message: '标题不能为空'
                },
               
              }
            },
           
            content: {
              validators: {
                notEmpty: {
                  message: '内容不能为空'
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

    console.log($form.serialize());
       // console.log(newtopicObj);
        $.ajax({
            url: '/topic/create',
            data: $form.serialize(),
            type: 'post',
            //dataType: 'text',
            success: function (data) {
                //console.log(data);
                if(data.code ==1006){
                    //alert(data.message);
                    //成功后跳转到 展示新话题的页面， 根据insertid（后台给的）
                    location.href = "/topic/show?id="+ data.insertId;
                }else {
                    alert("提交失败");   //要写吗
                }
            }

        })
    })
})