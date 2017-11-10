/**
 * Created by jacktong on 2017/10/19.
 */
'use strict';

app.controller('superhomeController',function($scope, $http ,$ocLazyLoad) {



    //$ocLazyLoad.load([
    //    "admin-template/css/clndr.css",
    //    "admin-template/css/style.css",
     //   "admin-template/js/jquery-1.10.2.min.js",
        //"admin-template/js/jquery-ui-1.9.2.custom.min.js",
        //"admin-template/js/jquery-migrate-1.2.1.min.js",
        //"admin-template/js/bootstrap.min.js",
        //"admin-template/js/modernizr.min.js",
     //   "admin-template/js/jquery.nicescroll.js",
        //"admin-template/js/easypiechart/jquery.easypiechart.js",
        //"admin-template/js/easypiechart/easypiechart-init.js",
        //"admin-template/js/sparkline/jquery.sparkline.js",
        //"admin-template/js/sparkline/sparkline-init.js",
        //"admin-template/js/iCheck/jquery.icheck.js",
        //"admin-template/js/icheck-init.js",
        //"admin-template/js/flot-chart/jquery.flot.js",
        //"admin-template/js/flot-chart/jquery.flot.tooltip.js",
        //"admin-template/js/flot-chart/jquery.flot.resize.js",
        //"admin-template/js/morris-chart/morris.js",
        //"admin-template/js/morris-chart/raphael-min.js",

      //  'admin-template/js/calendar/clndr.js',
      //  'admin-template/js/calendar/evnt.calendar.init.js',
      //  'admin-template/js/calendar/moment-2.2.1.js',
      //  'http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.2/underscore-min.js'
        //'admin-template/js/scripts.js'
        //'admin-template/js/dashboard-chart-init.js'
    //);

    $scope.init = function(){
        $http({
            method: "GET",
            url: base_url + "/statics/homeStatics",
            data: null
        }).success(function (data, status) {
            $scope.shop_count = data.SHOP_COUNT[0].SHOP_COUNT;
            $scope.table_count = data.TABLE_COUNT[0].TABLE_COUNT;
            $scope.order_count = data.ORDER_COUNT[0].ORDER_COUNT;
            $scope.order_count_today = data.ORDER_COUNT_TODAY[0].ORDER_COUNT_TODAY;

        })
            .error(function (data, status) {
                //alert(data);
            });
    }
    $scope.init();
    setInterval(function(){
        $scope.init();
    },5000);

});