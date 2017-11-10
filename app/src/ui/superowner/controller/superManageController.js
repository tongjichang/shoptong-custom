/**
 * Created by jacktong on 2017/8/28.
 */

'use strict';

app.controller('superController', function ($scope, $http, $window,$log) {

    $scope.type = {
        商铺 : "1",
        服务员 : "2",
        管理员 : "3"
    };
    $scope.usertype = '3';
    $scope.doAdd = function () {
        var user_name = $scope.user_name;
        var password = $scope.password;
        var fd = new FormData();
        fd.append('user_name', user_name);
        fd.append('password', password);
        if ($scope.checkForm(fd)) {
            $http({
                method: "POST",
                url: base_url + "/super/addSuper",
                data: fd,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            })
                .success(function (data, status) {
                    console.log(angular.fromJson(data));
                    if (data.CODE == '1000') {
                        show_alert_box('提示', '添加成功');
                        $window.location.href = "#addSuperuser";
                    } else {
                        show_alert_box('提示', data.MESSAGE);
                    }

                })
                .error(function (data, status) {
                    alert(data);
                });
        }


    }

    $scope.checkForm = function (fd) {
        var isSuccess = false;
        if (fd.get('user_name') == 'undefined') {
            alert("请输入用户名");
        } else if (fd.get('password') == 'undefined') {
            alert("请输入密码");
        } else {
            isSuccess = true;
        }


        return isSuccess;
    }
    $scope.maxSize = 5;
    $scope.totalItems = 10;
    $scope.currentPage = 1;
    $scope.prePage = 10;
    $scope.user_name = "";
    /**
     * 查询菜品
     */
    $scope.select_supers = function(){
        $http({
            method:"POST",
            url:base_url+"/super/selectsuper",
            data:{
                type:$scope.usertype,
                user_name:$scope.user_name,
                pageNo:$scope.currentPage

            }
        })
            .success(function (data,status) {
                if(data.CODE=='1000'){
                    $log.debug('返回信息', data.DATA);
                    $scope.users_list = data.DATA;
                    $scope.totalItems = data.totalnum;
                    $scope.currentPage = data.page_no;
                }else{
                    show_alert_box('提示',data.MESSAGE);
                }

            })
            .error(function (data,status) {
                alert(data);
            });
    }
    $scope.select_supers();

    /**
     * 删除商品
     * @param goods_id
     */
    $scope.delete_users = function(user_id){
        if(confirm('确定删除此商品？')){
            $http({
                method:"POST",
                url:base_url+"/super/deleteUser",
                data:{
                    user_id:user_id
                }
            })
                .success(function (data,status) {
                    console.log(angular.fromJson(data));
                    if(data.CODE=='1000'){
                        show_alert_box('提示','删除成功');
                        $scope.select_supers();
                    }else{
                        show_alert_box('提示',data.MESSAGE);
                    }

                })
                .error(function (data,status) {
                    alert(data);
                });
        }

    }
    /**
     * 冻结或者解冻
     * @param waiter_id
     * @param status
     */
    $scope.change_status = function(user_id,status){
        $http({
            method:"POST",
            url:base_url+"/super/changuserStatus",
            data:{
                user_id:user_id,
                status:status

            }
        }).success(function (data,status) {
            if(data.CODE=='1000'){
                show_alert_box('提示','成功');
                $scope.select_supers();
            }else if(data.CODE=='1003'){
                show_alert_box('提示',data.MESSAGE);
                $window.location.href="/";
            }else{
                show_alert_box('提示',data.MESSAGE);
            }

        })
            .error(function (data,status) {
                alert(data);
            });

    }
});

app.controller('userStaticsAnalysisController',function($scope,$http,$log,$timeout){
    $scope.type = {
        当天 : "1",
        近一周 : "2",
        近一月 : "3"
    };
    $scope.time_flag = '3';
    //http://www.cnblogs.com/echo2016/p/5416572.html
    $scope.dateOptions = {
        formatYear: 'yy',
        maxDate: new Date(),
        startingDay: 1
    };
    $scope.startOpen = function() {
        $timeout(function() {
            $scope.startPopupOpened = true;
        });
    };
    $scope.endOpen = function() {
        $timeout(function() {
            $scope.endPopupOpened = true;
        });
    };
    $scope.startPopupOpened = false;
    $scope.endPopupOpened = false;
    $scope.names=[];
    $scope.values=[];
    $scope.values2=[];
    var myChart = echarts.init(document.getElementById('main'));
    /**
     * 打印机列表
     */
    $scope.printerlist = function(){
        var time_flag = $scope.time_flag;
        var start_time = $scope.start_time;
        var end_time = $scope.end_time;
        $http({
            method:"POST",
            url:base_url+"/statics/userStatics",
            data:{
                shop_id:shopid,
                time_flag:time_flag,
                start_time:start_time,
                end_time:end_time
            }
        })
            .success(function (data,status) {
                if(data.CODE=='1000'){
                    $scope.names=[];
                    $scope.values=[];
                    $scope.values2=[];
                    var  option1 = {
                        color: ['#2c343c'],
                        tooltip : {
                            trigger: 'axis',
                            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis : [
                            {
                                type : 'category',
                                data : $scope.names,
                                axisTick: {
                                    alignWithLabel: true
                                }
                            }
                        ],
                        yAxis : [
                            {
                                type : 'value'
                            }
                        ],
                        series : [
                            {
                                name:'接单数量',
                                type:'bar',
                                barWidth: '30%',
                                data:$scope.values
                            },
                            {
                                name:'销售额',
                                type:'bar',
                                barWidth: '0%',
                                data:$scope.values2
                            }
                        ]
                    };
                    $log.debug('返回数据1122212123123', data.DATA);
                    var cnt = data.DATA.length;
                    if(cnt>15){
                        cnt=15
                    }
                    for (var i = 0; i < cnt; i++) {
                        $scope.names.push(data.DATA[i].name);
                        $scope.values.push(data.DATA[i].zs);
                        $scope.values2.push(data.DATA[i].ze);
                    }
                    myChart.setOption(option1);
                    $log.debug('返回数据names', $scope.names);
                    $log.debug('返回数据values',  $scope.values);

                }else{
                    show_alert_box('提示',data.MESSAGE);
                }

            })
            .error(function (data,status) {
                alert(data);
            });
    }



});

app.controller('userStaticsController',function($scope,$http,$log,$timeout){
    $scope.type = {
        当天 : "1",
        近一周 : "2",
        近一月 : "3"
    };
    $scope.time_flag = '3';
    //http://www.cnblogs.com/echo2016/p/5416572.html
    $scope.dateOptions = {
        formatYear: 'yy',
        maxDate: new Date(),
        startingDay: 1
    };
    $scope.startOpen = function() {
        $timeout(function() {
            $scope.startPopupOpened = true;
        });
    };
    $scope.endOpen = function() {
        $timeout(function() {
            $scope.endPopupOpened = true;
        });
    };
    $scope.startPopupOpened = false;
    $scope.endPopupOpened = false;
    $scope.names=[];
    $scope.values=[];
    $scope.values2=[];
    var myChart = echarts.init(document.getElementById('main'));
    /**
     * 打印机列表
     */
    $scope.printerlist = function(){
        var time_flag = $scope.time_flag;
        var start_time = $scope.start_time;
        var end_time = $scope.end_time;
        $http({
            method:"POST",
            url:base_url+"/statics/userStatics2",
            data:{
                shop_id:shopid,
                time_flag:time_flag,
                start_time:start_time,
                end_time:end_time
            }
        })
            .success(function (data,status) {
                if(data.CODE=='1000'){
                    $scope.names=[];
                    $scope.values=[];
                    $scope.values2=[];
                    var  option1 = {
                        color: ['#2c343c'],
                        tooltip : {
                            trigger: 'axis',
                            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis : [
                            {
                                type : 'category',
                                data : $scope.names,
                                axisTick: {
                                    alignWithLabel: true
                                }
                            }
                        ],
                        yAxis : [
                            {
                                type : 'value'
                            }
                        ],
                        series : [
                            {
                                name:'店铺个数',
                                type:'bar',
                                barWidth: '30%',
                                data:$scope.values
                            },
                            {
                                name:'总接单数',
                                type:'bar',
                                barWidth: '0%',
                                data:$scope.values2
                            }
                        ]
                    };
                    $log.debug('返回数据1122212123123', data.DATA);
                    var cnt = data.DATA.length;
                    if(cnt>15){
                        cnt=15
                    }
                    for (var i = 0; i < cnt; i++) {
                        $scope.names.push(data.DATA[i].name);
                        $scope.values.push(data.DATA[i].zs);
                        $scope.values2.push(data.DATA[i].ze);
                    }
                    myChart.setOption(option1);
                    $log.debug('返回数据names', $scope.names);
                    $log.debug('返回数据values',  $scope.values);

                }else{
                    show_alert_box('提示',data.MESSAGE);
                }

            })
            .error(function (data,status) {
                alert(data);
            });
    }



});

