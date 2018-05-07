//创建新话题页面
let moment

$(function () {
    //点击提交按钮， 获取表单中的数据
    $('.btn-default').on('click', function (e) {
        e.preventDefault();  //阻止submit的默认事件

        let category = $('.form-control option:selected').val();
        let title = $('#title').val();
        let content = $('#newcontent').val();
        // console.log(category);
        // console.log(title);
        // console.log(content);

        if (category == '') {
            alert('请选择分类模块');
            return;
        }
        if (title == '') {
            alert('标题不能为空');
            return;
        }
        if (content == '') {
            alert('内容不能为空');
            return;
        }
        //分类categoryId 
        let categoryId;  //外面声明
        switch (category) {
            case '分享':
                categoryId = 1;
                break;
            case '问答':
                categoryId = 2;
                break;
            case '招聘':
                categoryId = 3;
                break;
            case '客户端测试':
                categoryId = 4;
                break;
        }


      //  console.log(categoryId);
        let newtopicObj = {
            title: title,
            content: content,
            categoryId:categoryId,
        }
       // console.log(newtopicObj);
        $.ajax({
            url: '/topic/create',
            data: newtopicObj,
            type: 'post',
            dataType: 'text',
            success: function (data) {
                console.log(data);
                if(data.code ==1006){
                    alert(data.message);
                }else {
                    alert("提交失败");   //要写吗
                }
            }

        })



    })

})