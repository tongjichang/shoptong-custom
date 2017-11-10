/**
 * Created by jacktong on 2017/8/29.
 */

'use strict';

app.controller('StaticsAnalysisController',function($scope,$http,$log,$timeout){
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
            url:base_url+"/statics/goodsStatics",
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
                        color: ['#3398DB'],
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
                                name:'销售数量',
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
                    $log.debug('返回数据', data.DATA);
                    var cnt = data.DATA.length;
                    if(cnt>8){
                        cnt=8
                    }
                    for (var i = 0; i < cnt; i++) {
                        $scope.names.push(data.DATA[i].GOOD_NAME);
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

app.controller('shopStaticsAnalysisController',function($scope,$http,$log,$timeout){
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
            url:base_url+"/statics/shopStatics",
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
                        color: ['#c23531'],
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
                                name:'销售数量',
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
                    $log.debug('返回数据', data.DATA);
                    var cnt = data.DATA.length;
                    if(cnt>8){
                        cnt=8
                    }
                    for (var i = 0; i < cnt; i++) {
                        $scope.names.push(data.DATA[i].GOOD_NAME);
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

app.controller('waiterStaticsAnalysisController',function($scope,$http,$log,$timeout){
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
            url:base_url+"/statics/waiterStatics",
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
                    if(cnt>8){
                        cnt=8
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

