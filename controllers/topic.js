//topic板块的 路由的回调函数
const moment = require('moment');
const bodyparser = require('body-parser');
const connection = require('./db');

//展示话题发表页 create

// 判断下是否登录了， 就是req.session.user是否存在， 
//  存在则链接数据库渲染页面
// 不存在 ， 跳转到登录页同时把当前的额地址传过去， 登录完成后跳转回来

module.exports.showCreate = (req, res) => {
   // res.render('topic/new.html');
    //判断下是否登录了， 在这里？？？
    //session:
    // let user = req.session.user;
    // if (!user) {
    //     //没有登录，则调到登录页
    //     return res.direct('/signin?returnUrl=/topic/create');
    // }

    //已经登录的 ，数据库查询分类
    connection.query('select * from topic_categories', (error , categories)=>{
        if (error) {
            return res.send({
                code: error.code,
                message: error.message
            })
        }

        console.log(categories);
        res.render('topic/new.html', {
            // user: req.session.user,
            categories:categories
        });
    })


}


//处理 话题发表页
module.exports.handleCreate = (req, res) => {
    // res.send('handleCreate');
    //获取topic页面提交的新话题数据
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
            return res.send({
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

// 展示评论
module.exports.showTopic = (req, res) => {
    //链接数据搜索所有的品论
    connection.query("select * from topics", (error, results) => {
        if (error) {
            return res.send({
                code: error.code,
                message: error.message
            })
        }

        console.log(results); //数组
        res.render('topic/show.html', { results: results });
    })

}

// 编辑
module.exports.showEdit = (req, res) => {
    // res.send('showEdit')
    res.render('topic/edit.html');
}
module.exports.handleEdit = (req, res) => {
    res.send('handleEdit')
}

module.exports.handleDelete = (req, res) => {
    res.send('handleDelete')
}

