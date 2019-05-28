var express = require('express');
var router = express.Router();

router.get('/',function(req,res){
     res.send('user');
})
router.get('/xiao',function(req,res){
    res.send('xiaoming')
})

module.exports = router;