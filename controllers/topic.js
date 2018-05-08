//topic板块的 路由的回调函数
const moment = require('moment');
const bodyparser = require('body-parser');
const connection = require('./db');
const marked = require('marked');
//展示话题发表页 create

// 判断下是否登录了， 就是req.session.user是否存在， 
//  存在则链接数据库渲染页面
// 不存在 ， 跳转到登录页同时把当前的额地址传过去， 登录完成后跳转回来

module.exports.showCreate = (req, res) => {
    //    res.render('topic/new.html');
    // 判断下是否登录了， 在这里？？？
    // session:
    let user = req.session.user;

   // console.log(user);
    if (!user) {
        //没有登录，则调到登录页
        console.log(user);
        //return res.redirect('/signin?returnUrl=/topic/create');
    }

    //已经登录的 ，数据库查询分类
    connection.query('select * from topic_categories', (error, categories) => {
        if (error) {
            return res.render('error.html', {
                code: error.code,
                message: error.message
            })
        }

        //console.log(categories);
        res.render('topic/new.html', {
            user: user,
            categories: categories
        });
    })


}


//处理 话题发表页
module.exports.handleCreate = (req, res) => {
    // res.send('handleCreate');
    //获取topic页面提交的新话题数据
    console.log(req.session.user);
    // 分类id要改
    let newTopic = {
        title: req.body.title,
        content: req.body.content,
        categoryId: req.body.categoryId,
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        userId: 1,
    }
    //console.log(newTopic);

    connection.query('insert into topics set?', newTopic, (error, results) => {
        if (error) {
            return res.render('error.html', {
                code: error.code,
                message: error.message
            })
        }

        console.log(results);
        if (results.insertId) { //如果insertId存在证明成功了
            res.send({
                code: 1006,
                message: '发表成功',
                //添加insertid
                insertId: results.insertId
            })
        }
    })


}

// 展示新发表话题页面
module.exports.showTopic = (req, res) => {
    //链接数据搜索新发布的文章， 根据传过来的id get方式传参接收
    connection.query('select * from topics where id =?', req.query.id, (error, results) => {
        if (error) {
            return res.render('error.html', {
                code: error.code,
                message: error.message
            })
        }

   // console.log(results); //数组

        if(!results[0].content){
            // 如果conent不存在则 提示没有对应的文章
            return res.send('文章不存在');
        }

        //把markedown格式的文件转成html格式在放回去
        results[0].content = marked(results[0].content);

        res.render('topic/show.html', {
            user: req.session.user,
            topic: results[0]
        });
    })

}

// 编辑-展示要编辑的文章
module.exports.showEdit = (req, res) => {
    // res.send('showEdit')
    res.render('topic/edit.html');
}

//重新提交编辑的文章

module.exports.handleEdit = (req, res) => {
    res.send('handleEdit')
}


//删除话题

module.exports.handleDelete = (req, res) => {
    // res.send('handleDelete');
    //接收地址栏中的id
    let topicId = req.query.id;
    //根据sql写删除的sql语句
    connection.query('delete from topics where id = ?', topicId, (error, result)=>{
        if (error) {
            return res.render('error.html', {
              code: error.code,
              message: error.message
            })
          }
    
          //删除成功跳转到首页
            res.redirect('/');
      
    })


}

