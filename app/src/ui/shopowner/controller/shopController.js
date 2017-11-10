'use strict';

var app = angular.module('shopApp',['ngRoute','oc.lazyLoad','ui.bootstrap']);


var key = localStorage.key_value;
var shopid = localStorage.shopid;
var roleid = localStorage.roleid;


app.factory('ResponseInterceptor', ['$q','$window', ResponseInterceptor]);

function ResponseInterceptor($q,$window) {
    return {
        request: function(config){
            return config;
        },
        requestError: function(err){
            return $q.reject(err);
        },
        response: function(response){
            console.log(response);
            if(response.data.CODE=='1003'){
                shop_alert_box_mobile('提示','请登录');
                $window.location.href="/";
            }else{
                return response;
            }
        },
        responseError: function(err){
            if(-1 === err.status) {
                // 远程服务器无响应
            } else if(500 === err.status) {
                // 处理各类自定义错误
            } else if(501 === err.status) {
                // ...
            }
            return $q.reject(err);
        }
    };
}

app.config(['$routeProvider','$httpProvider','$locationProvider', function($routeProvider,$httpProvider,$locationProvider){
    $httpProvider.defaults.headers.common = { 'key':key,'id':shopid};
    $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    $httpProvider.interceptors.push('ResponseInterceptor');


    // Override $http service's default transformRequest
    $httpProvider.defaults.transformRequest = [function (data) {

        var param = function (obj) {
            var query = '';
            var name, value, fullSubName, subName, subValue, innerObj, i;
            for (name in obj) {
                value = obj[name];
                if (value instanceof Array) {
                    for (i = 0; i < value.length; ++i) {
                        subValue = value[i];
                        fullSubName = name + '[]';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                } else if (value instanceof Object) {
                    for (subName in value) {
                        subValue = value[subName];
                        fullSubName = subName;
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                } else if (value !== undefined && value !== null) {
                    query += encodeURIComponent(name) + '='
                        + encodeURIComponent(value) + '&';
                }
            }
            return query.length ? query.substr(0, query.length - 1) : query;
        };
        return angular.isObject(data) && String(data) !== '[object File]'
            ? param(data)
            : data;
    }];

    //$locationProvider.html5Mode(true);

    $routeProvider
        .when('/tableManager',{
            controller: 'tableController' ,
            templateUrl: 'src/ui/shopowner/view/home.html'
        }).when('/addArea',{
            controller: 'addAreaController' ,
            templateUrl: 'src/ui/shopowner/view/add_area_2.html'
        }).when('/addTable',{
            controller: 'addTableController' ,
            templateUrl: 'src/ui/shopowner/view/add_table.html'
        }).when('/category',{
            controller: 'categoryController' ,
            templateUrl: 'src/ui/shopowner/view/category.html'
        }).when('/menu',{
            controller: 'selectMenuController' ,
            templateUrl: 'src/ui/shopowner/view/menu.html'
        }).when('/addmenu',{
            controller: 'menuController' ,
            templateUrl: 'src/ui/shopowner/view/add_menu.html'
        }).when('/updatemenu/:goods_id',{
            controller: 'updateMenuController',
            templateUrl: 'src/ui/shopowner/view/update_menu.html'
        }).when('/orderlist',{
            controller: 'orderlistController',
            templateUrl: 'src/ui/shopowner/view/order_list.html'
        }).when('/waiterlist',{
            controller: 'waiterlistController',
            templateUrl: 'src/ui/shopowner/view/waiter_list.html'
        }).when('/addwaiter',{
            controller: 'addWaiterController',
            templateUrl: 'src/ui/shopowner/view/add_waiter.html'
        }).when('/qrCode',{
            controller: 'qrCodeController',
            templateUrl: 'src/ui/shopowner/view/qr_code.html'
        }).when('/servicelist',{
            controller:'serviceController',
            templateUrl:'src/ui/shopowner/view/servicelist.html'
        }).when('/shopprinter',{
            controller: 'shopPrinterController',
            templateUrl: 'src/ui/shopowner/view/printerlist.html'
        }).when('/goodsprinter',{
            controller: 'goodsPrinterController',
            templateUrl: 'src/ui/shopowner/view/goodsPrinterlist.html'
        }).when('/addSuperuser',{
            controller: 'superController',
            templateUrl: 'src/ui/superowner/view/addSuper.html'
        }).when('/selectSuperuser',{
            controller: 'superController',
            templateUrl: 'src/ui/superowner/view/user_list.html'
        }).when('/shoplist', {
            controller: 'shoplistController',
            templateUrl: 'src/ui/superowner/view/shop_list.html'
        }).when('/addShop',{
            controller: 'shopmanageController',
            templateUrl: 'src/ui/superowner/view/addShop.html'
        }).when('/updateshop/:shop_id', {
            controller: 'updateshopController',
            templateUrl: 'src/ui/superowner/view/updateshop.html'
        }).when('/userpassword', {
            controller: 'updatepasswordController',
            templateUrl: 'src/ui/superowner/view/updatepassword.html'
        }).when('/addBook', {
            controller: 'addBookController',
            templateUrl: 'src/ui/shopowner/view/add_book.html?t=' + Math.floor(Date.now() / 1000)
        }).when('/updateBook/:book_id', {
            controller: 'updateBookController',
            templateUrl: 'src/ui/shopowner/view/update_book.html?t=' + Math.floor(Date.now() / 1000)
        }).when('/booklist', {
            controller: 'addBookController',
            templateUrl: 'src/ui/shopowner/view/book_list.html'
        }).when('/updateshop2', {
            controller: 'updateshoppController',
            templateUrl: 'src/ui/shopowner/view/updateshop.html'
        }).when('/StaticsAnalysis', {
            controller: 'StaticsAnalysisController',
            templateUrl: 'src/ui/shopowner/view/StaticsAnalysis.html'
        }).when('/shopStaticsAnalysis', {
            controller: 'shopStaticsAnalysisController',
            templateUrl: 'src/ui/shopowner/view/shopStaticsAnalysis.html'
        }).when('/waiterStaticsAnalysis', {
            controller: 'waiterStaticsAnalysisController',
            templateUrl: 'src/ui/shopowner/view/waiterStaticsAnalysis.html'
        }).when('/userStaticsAnalysis', {
            controller: 'userStaticsAnalysisController',
            templateUrl: 'src/ui/superowner/view/userStaticsAnalysis.html'
        }).when('/userStatics', {
            controller: 'userStaticsController',
            templateUrl: 'src/ui/superowner/view/userStatics.html'
         }).when('/selectSuggest',{
            controller: 'suggestController',
            templateUrl: 'src/ui/superowner/view/suggestlist.html'
        }).when('/superhome',{
            controler: 'superhomeController',
            templateUrl:'src/ui/superowner/view/home.html'
    });
    //如果是超级用户直接暂时商户查询
    if(roleid==='3'){
        $routeProvider.otherwise({
            redirectTo:'/superhome'
        });
    }else{
        $routeProvider.otherwise({
            redirectTo:'/tableManager'
        });
    }

}]);

app.directive('timeDirective', ['$ocLazyLoad',function($ocLazyLoad) {
    return {
        link: function (scope, element) {
            $ocLazyLoad.load([
                '/admin-template/js/bootstrap-timepicker/css/timepicker.css',
                '/admin-template/js/bootstrap-datetimepicker/css/datetimepicker-custom.css',
                '/admin-template/js/bootstrap-datetimepicker/js/bootstrap-datetimepicker.js',
                '/admin-template/js/bootstrap-timepicker/js/bootstrap-timepicker.js',
                '/admin-template/js/bootstrap-colorpicker/js/bootstrap-colorpicker.js',
                '/admin-template/js/pickers-init.js'
            ]);
        }
    };
}]);

app.directive('diHref', ['$location', '$route','$window',
    function($location, $route,$window) {
        return function(scope, element, attrs) {
            scope.$watch('diHref', function() {
                //if(attrs.diHref) {
                    element.attr('href', attrs.diHref);
                    element.bind('click', function(event) {
                        scope.$apply(function(){
                            //if($location.path() == attrs.diHref){
                            //    $route.reload();
                            //}
                            $window.location.reload();
                            //$route.reload();
                        });
                    });
                //}
            });
        }
    }]);