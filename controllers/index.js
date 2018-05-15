
//这里面装的是 路由监听各个标识符的回调函数
const connection = require('./db');

//首页的
module.exports.showIndex = (req, res) => {
    //检测session 并根据session渲染首页
    let user = req.session.user;
    //链接数据库渲染分类板块
    connection.query('select * from topic_categories', (error, results) => {
        if (error) {
            return res.render('error.html', {
                code: error.code,
                message: error.message
            })
        }

        //查询话题表 展示所有的话题数据
        connection.query('select * from topics', (err, topics) => {
            if (err) {
                return res.render('error.html', {
                    code: err.code,
                    message: err.message
                })
            }
            console.log(topics); //查询输出的是数组

            if (topics.length == 0) {
                return res.send('没有查询到话题')
            }

            // console.log(results); //数组
            res.render('index.html', {
                user: user,
                categories: results,    //渲染首页分类板块
                topics: topics     //展示所有话题  数组
            })


        })
    })



}



