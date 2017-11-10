var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('app/src/ui/person/view/index', { table_id: req.query.table_id,shop_id:req.query.shop_id });
});

module.exports = router;
