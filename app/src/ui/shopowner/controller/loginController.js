'use strict';

var app = angular.module('loginApp',[]);

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

    $locationProvider.html5Mode(true);


}]);

app.controller('loginController',['$scope','$http','$location','$window',function ($scope,$http,$location,$window) {
    $scope.enterEvent = function(e) {
        var keycode = window.event?e.keyCode:e.which;alert(keycode);
        if(keycode==13){
            $scope.login_btn_click();
        }
    }

    $scope.login_btn_click = function(){
       //登陆返回信息
        // 赋值常量
        //页面直接引用

        var username = $scope.username;
        var password = $scope.password;
        if(username==undefined||username==""){
            alert('请输入用户名');
            return;
        }
        if(password==undefined||password==""){
            alert('请输入密码');
            return;
        }

        $http({
            method:"POST",
            url:base_url+"/userservice/login",
            data:{
                user_name:$scope.username,
                password:$scope.password,
                type:1
            }
        })
            .success(function (data,status) {
                console.log(angular.fromJson(data));
                if(data.CODE=="1000"){
                    localStorage.shopid = data.DATA.business_id;
                    localStorage.username = data.DATA.user_name;
                    localStorage.key_value = data.KEY;
                    localStorage.roleid = data.DATA.role_id;
                    $window.location.href="/app";
                }else{
                    alert(data.MESSAGE);
                }


            })
            .error(function (data,status) {
                alert(status);
            });





    }
}]);


