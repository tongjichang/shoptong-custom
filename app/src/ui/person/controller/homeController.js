'use strict';
var app = angular.module('indexApp',['ngRoute','oc.lazyLoad']);

//var base_url = "http://192.168.1.103:8080/heygay";//localhost 手机浏览器访问不了
var shop_id = $("#shop_id").val();
var table_id = $("#table_id").val();

app.config(['$httpProvider','$locationProvider','$routeProvider',function ($httpProvider,$locationProvider,$routeProvider) {
    $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    // Override $http service's default transformRequest
    $httpProvider.defaults.transformRequest = [function (data) {
        /**
         * The workhorse; converts an object to x-www-form-urlencoded serialization.
         * @param {Object} obj
         * @return {String}
         */
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
        .when('/index',{
            controller: 'indexController' ,
            templateUrl: 'src/ui/person/view/home.html'
        }).when('/orderlist',{
            controller: 'orderController' ,
            templateUrl: 'src/ui/person/view/orderlist.html'
        }).when('/servicelist',{
        controller: 'serviceController' ,
        templateUrl: 'src/ui/person/view/servicelist.html'
    }).when('/shopinfo',{
        controller: 'shopinfoController' ,
        templateUrl: 'src/ui/person/view/shopinfo.html'
    });
    $routeProvider.otherwise({
        redirectTo:'/index'
    });

}]);