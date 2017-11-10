'use strict';

/**
 * 订单列表
 */
    app.controller("orderlistController",function($scope,$http){

        $scope.maxSize = 5;
        $scope.totalItems = 10;
        $scope.currentPage = 1;
        $scope.prePage = 10;

        /**
         * 查询一页订单
         */
        $scope.select_order = function(){
            $http({
                method:"POST",
                url:base_url+"/order/selectOrders",
                data:{
                    shop_id:shopid,
                    page_no:$scope.currentPage

                }
            })
                .success(function (data,status) {
                    if(data.CODE=='1000'){
                        $scope.order_list = data.DATA;
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
        $scope.select_order();

        /**
         * 结账
         * @param order_id
         */
        $scope.check_order = function(order_id){
            if(confirm('确定结账？')){
                $http({
                    method:"POST",
                    url:base_url+"/order/check",
                    data:{
                        order_id:order_id

                    }
                })
                    .success(function (data,status) {
                        if(data.CODE=='1000'){
                            show_alert_box('提示','成功');
                            $scope.select_order();
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
         * 取消订单
         * @param order_id
         */
        $scope.cancle_order = function(order_id){
            if(confirm('确定取消？')){
                $http({
                    method:"POST",
                    url:base_url+"/order/cancleOrder",
                    data:{
                        order_id:order_id

                    }
                })
                    .success(function (data,status) {
                        if(data.CODE=='1000'){
                            show_alert_box('提示','成功');
                            $scope.select_order();
                        }else{
                            show_alert_box('提示',data.MESSAGE);
                        }

                    })
                    .error(function (data,status) {
                        alert(data);
                    });
            }
        }
    });