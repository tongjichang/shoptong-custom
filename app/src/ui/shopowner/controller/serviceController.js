/**
 * Created by jacktong on 2017/8/26.
 */
'use strict';

app.controller('serviceController',function($scope,$http){

    $scope.maxSize = 5;
    $scope.totalItems = 10;
    $scope.currentPage = 1;
    $scope.prePage = 10;

    /**
     * 加载服务列表
     */
    $scope.getServicelist = function(){
        $http({
            method:"POST",
            url:base_url+"/service/selectAllService",
            data:{
                shop_id:shopid,
                page_no:$scope.currentPage

            }
        })
            .success(function (data,status) {
                if(data.CODE=='1000'){
                    $scope.service_list = data.DATA;
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

    $scope.getServicelist();

});