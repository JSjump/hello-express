var express = require('express');
var index = require('./routes/index');
var user = require('./routes/user');

var app = express();

// 中间件 分 
//    app级 如。app.use(),app.Method()
//    路由级. 如 express.Router()
//    内置。  如 express.static();
//    第三方
//    error   错误处理中间件
app.use('/',index)
app.use('/user',user);



   // app.use('/')  app.use('/home') 用app.use路由非精确匹配。 app.Method路由精确匹配
// app.get('/',function(req,res){
//     console.log(111);
//     res.send('111');     // 输出顺序 111 ，333，444，222 对应洋葱模型，联想到dom模型

//     console.log(222)
// })
// app.get('/user',function(req,res){
//     console.log(333);
//       res.send('222');
//     console.log(444);
// })


app.listen(3000)