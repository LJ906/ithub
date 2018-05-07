//topic板块的 路由的回调函数
const moment = require('moment');
const bodyparser = require('body-parser');
const connection = require('./db');


module.exports.showCreate = (req, res) => {
    res.render('topic/new.html');
}

module.exports.handleCreate = (req, res) => {
   // res.send('handleCreate');
    //获取topic页面提交的新话题数据

    // console.log(req.body);   //{ title: 'asdfa', content: 'asdfa', categoryId: '1' }
    // console.log(req.body.title);

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
              message: '提交成功'
            })
          }
    })


}

// 展示评论
module.exports.showTopic = (req, res) => {
    //链接数据搜索所有的品论
    connection.query("select * from topics" , (error, results)=>{
        if (error) {
            return res.send({
                code: error.code,
                message: error.message
            })
        }

        console.log(results); //数组
         res.render('topic/show.html' , {results:results});
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

