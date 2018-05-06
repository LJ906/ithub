//引入mysql模块
const mysql = require('mysql');
//引入数据库登录信息模块
let config = require('../config');


//选择要链接的数据库 创建一个链接
const connection = mysql.createConnection(config.db)

// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });

// connection.end();


module.exports = connection
