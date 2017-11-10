/**
 * Created by jacktong on 2017/9/6.
 */
'use strict';

app.controller("serviceController",function($scope,$http,$location){

    /**
     * 提交服务
     */
    $scope.submit_service =  function(){
        var content = $("#service_content").val();
        if(content==null||content==''){
            alert("请输入服务内容");
            return;
        }
        $http({
            method:"POST",
            url:base_url+"/userservice/addservice",
            data:{
                shop_id:shop_id,
                table_id:table_id,
                service_content:content
            },
            cache:false,
        }).success(function (data,status) {
            if(data.CODE=='1000'){
                shop_alert_box_mobile('提示','服务已提交，请稍后...');
                $location.path("/index");
            }else{
                shop_alert_box_mobile('提示',data.MESSAGE);
            }
        })
            .error(function (response,status,header) {
                shop_alert_box_mobile('提示','数据加载异常'+response);
            });



    }

    $scope.tips =  function(parame){
        if($scope.shop_owner_phone==undefined){
            $scope.shop_owner_phone=parame;
        }else{
            $scope.shop_owner_phone = $scope.shop_owner_phone +',   '+parame;
        }
    }

    close_background();

});

