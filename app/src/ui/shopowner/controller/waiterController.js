/**
 * Created by jacktong on 2017/8/3.
 */
'use strict';


app.controller('waiterlistController',function($scope,$http,$window){
    $scope.maxSize = 5;
    $scope.currentPage = 1;
    $scope.prePage = 10;

    /**
     * 查询一页服务员
     */
    $scope.select_waiters = function(){
        $http({
            method:"POST",
            url:base_url+"/waiter/selectWaiters",
            data:{
                shop_id:shopid,
                pageNo:$scope.currentPage

            }
        })
            .success(function (data,status) {
                if(data.CODE=='1000'){
                    $scope.waiter_list = data.DATA;
                    $scope.totalItems = data.totalnum;
                    $scope.currentPage = data.page_no;
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
    $scope.select_waiters();

    /**
     * 删除
     * @param waiter_id
     */
    $scope.delete_waiter = function(waiter_id){
        if(confirm('确定删除？')){
            $http({
                method:"POST",
                url:base_url+"/waiter/deleteWaiter",
                data:{
                    waiter_id:waiter_id

                }
            }).success(function (data,status) {
                    if(data.CODE=='1000'){
                        show_alert_box('提示','删除成功');
                        $scope.select_waiters();
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
    }
    /**
     * 删除
     * @param waiter_id
     */
    $scope.cz_waiter = function(waiter_id){
        if(confirm('确定重置？')){
            $http({
                method:"POST",
                url:base_url+"/waiter/czWaiter",
                data:{
                    waiter_id:waiter_id
                }
            }).success(function (data,status) {
                if(data.CODE=='1000'){
                    show_alert_box('提示','重置成功');
                    $scope.select_waiters();
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
    }
    /**
     * 冻结或者解冻
     * @param waiter_id
     * @param status
     */
    $scope.change_status = function(waiter_id,status){
        $http({
            method:"POST",
            url:base_url+"/waiter/changWaiterStatus",
            data:{
                waiter_id:waiter_id,
                status:status

            }
        }).success(function (data,status) {
            if(data.CODE=='1000'){
                show_alert_box('提示','成功');
                $scope.select_waiters();
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

app.controller('addWaiterController',function($scope,$http){
    $scope.type = {
        服务员 : "2",
        店长 : "4"
    };
    /**
     * 新增服务员
     */
    $scope.save_waiter = function(){
        var name = $scope.name;
        var username = $scope.username;
        var waiterid = $scope.waiterid;
        if(name==undefined||name==""){
            show_alert_box('提示','请输入员工姓名');
            return;
        }
        if(username==undefined||username==""){
            show_alert_box('提示','请输入员工登录账户名称，可用姓名拼音');
            return;
        }
        if(waiterid==undefined||waiterid==""){
            show_alert_box('提示','请输入员工登录账户类型，可用姓名');
            return;
        }
        $http({
            method:"POST",
            url:base_url+"/waiter/addWaiter",
            data:{
                shop_id:shopid,
                name:name,
                username:username,
                waiter_id:waiterid

            }
        }).success(function (data,status) {
                if(data.CODE=='1000'){
                    show_alert_box('提示','新增成功');
                    $scope.name = "";
                    $scope.username = "";
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
