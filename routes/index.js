var express = require('express');
var router = express.Router();
var app  =  express();

//var bodyParser = require('body-parser')
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('app/src/ui/shopowner/view/login', { title: 'abc' });
});

router.get('/app', function(req, res, next) {
    res.render('app/src/ui/shopowner/view/app', {title:''});
});

//router.post('/app',function(req,res){
//    res.render('app/src/ui/shopowner/view/app', {key:req.body.key,id:req.body.shopid,username:req.body.shop_user_name,roleid:req.body.roleid});
//});

router.get('/users', function(req, res, next) {
    res.render('app/src/ui/person/view/index', { table_id: req.query.table_id,shop_id:req.query.shop_id });
});

router.get('*', function(req, res, next) {
    res.render('app/404', {title:''});
});


module.exports = router;
