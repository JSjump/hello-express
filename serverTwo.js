var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();

app.set('view engine','ejs');// 设置模板引擎 为ejs

var multer = require('multer');
// create application/json parser
// application/json post请求常用数据格式
var jsonParser = bodyParser.json();
//                     // dest 目的地 对应上传的文件需要存储的位置      
// var upload = multer({ dest: 'uploads/' })

var createFolder = function(folder) {
    try {
        fs.accessSync(folder);
    } catch (e) {
        fs.mkdirSync(folder);
    }
};

var uploadFolder = './upload/';
createFolder(uploadFolder);  //检查是否有该目录，没有就创建
                
// multer上传文件。磁盘存储设置
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadFolder)
    },
    filename: function (req, file, cb) { // 定义上传文件文件名
      cb(null, file.originalname + '-' + Date.now())
    }
  });
   
var upload = multer({ storage: storage })

// create application/x-www-form-urlencoded parser
// application/x-www-form-urlencoded 指报文头content-type的值。指定表单数据提交时编码格式。此格式为表单提交默认格式
var urlencodedParser = bodyParser.urlencoded({ extended: false })


app.get('/',function(req,res){
    res.send('this.is home query:'+req.query.home)
});
app.post('/',urlencodedParser ,function(req,res){
    console.dir(req.body);
    res.send(req.body.name);
})

app.get('/form/:name/:age',function(req,res){ // 使用模板引擎返回动态页面
    var data = {name:req.params.name,age:req.params.age,hobbie:['eating','read','music']};
    res.render('form',{data:data})  // res.render()
})

app.get('/about',function(req,res){
    res.render('about')
})
                   // single()中的实参对应前台表单中对应的name    
app.post('/upload',upload.single('test'),function(req,res){
    console.dir(req.file);
    res.send({'ret_code':0})   //res.sendfile();可直接返回固定文件
})
app.get('/profile/:id/:name',function(req,res){
    // var reponseProject = {name:'xiaomin',age:20};
    res.send('this is text'+req.params.id+req.params.name);
});
app.get('/as?a',function(req,res){
    res.send('this id  reg text')
})
 
app.listen(3000);
console.log('listening to port 3000')