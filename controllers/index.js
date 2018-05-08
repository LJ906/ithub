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

        // console.log(results); //数组
        res.render('index.html', {
            user: user,
            categories: results    //渲染首页分类板块
        })
    })


}



