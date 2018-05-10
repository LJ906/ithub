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
    // console.log(req.session.user);
    // 接收前端传来的提交话题数据，并存到一个对象中 
    let newTopic = {
        title: req.body.title,
        content:  marked(req.body.content),
        categoryId: req.body.categoryId,
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        userId: req.session.user.id,  //id可以从session中获取
    }
    //写sql语句添加到数据库
    connection.query('insert into topics set?', newTopic, (error, results) => {
        if (error) {
            return res.render('error.html', {
                code: error.code,
                message: error.message
            })
        }

        // console.log(results);  //返回成功添加的一个 对象results.insertId
        if (results.insertId) {  //如果insertId存在证明成功了
            res.send({
                code: 1006,
                message: '发表成功',
                insertId: results.insertId  //把insertid传给前端， 前端根据这个跳转到展示话题页面，显示新发表的话题
            })
        }
    })


}

// 展示新发表话题页面
module.exports.showTopic = (req, res) => {
    //链接数据搜索新发布的文章， 根据传过来的id get方式传参接收
    // connection.query('select * from topics where id =?', req.query.id, (error, results) => {
        connection.query('select * from topics ', (error, results) => {
        if (error) {
            return res.render('error.html', {
                code: error.code,
                message: error.message
            })
        }

        //console.log(results);   //数组

        if (!results[0].content) {
            // 如果conent不存在则 提示没有对应的文章
            return res.send('文章不存在');
        }

        //把markedown格式的文件转成html格式在放回去//此时content为html标签的格式
       // results[0].content = marked(results[0].content);

        res.render('topic/show.html', {
            user: req.session.user,
            topic: results       //html模板需要处理成识别html标签的格式
        });
    })

}

// 编辑-展示要编辑的文章
module.exports.showEdit = (req, res) => {
   
    //接收地址栏中的id
    let topicId = req.query.id;
    connection.query('select * from topics where id =?', topicId, (error, topicInfo) => {
        if (error) {
            return res.render('error.html', {
                code: error.code,
                message: error.message
            })
        }

        // 还要查询话题分类 以便修改
        connection.query('select * from topic_categories', (error, categorys) => {
            if (error) {
                return res.render('error.html', {
                    code: error.code,
                    message: error.message
                })
            }
          
            console.log(topicInfo);
            //把topic 数据和 分类数据添加到对象中 模板对象中
            res.render('topic/edit.html', {
                user: req.session.user,
                topicInfo: topicInfo[0],
                categorys: categorys
            })

        })


    })

}





//重新提交编辑的文章
module.exports.handleEdit = (req, res) => {
    // res.send('handleEdit');
    //重新提交 更新数据
    connection.query('update topics set title =?, content =?, categoryId =?, updatedAt = ? where id =? ', [
        req.body.title, req.body.content, req.body.categoryId, moment().format('YYYY-MM-DD HH:mm:ss'), req.body.topicId
    ], (error, result) => {
        if (error) {
            return res.render('error.html', {
                code: error.code,
                message: error.message
            })
        }

        if (!result.affectedRows) {
            return res.send({
                code: 10007,
                message: '更新失败'
            })
        }
        // console.log(result);
        return res.status(200).send({
            code: 10008,
            message: '更新成功'
        })
    })

}


//删除话题

module.exports.handleDelete = (req, res) => {

    //接收地址栏中的id
    let topicId = req.query.id;
    //根据sql写删除的sql语句
    connection.query('delete from topics where id = ?', topicId, (error, result) => {
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



