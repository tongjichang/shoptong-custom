/**
 * Created by jacktong on 2017/7/24.
 */
'use strict';

//var app = angular.module('shopApp');

/**
 * 新增菜品分类 add by jacktong
 */
app.controller('categoryController',function($scope,$http){

    $scope.add_category_click = function(){
        var category_name = $scope.category_name;
        if(category_name==undefined||category_name==""){
            show_alert_box('提示','请输入分类名称');
            return;
        }
        if(category_name.length>25){
            show_alert_box('提示','名称不能超过25个字');
            return;
        }
        $http({
            method:"POST",
            url:base_url+"/goods/addCategory",
            data:{
                shop_id:shopid,
                category_name:category_name
            }
        })
            .success(function (data,status) {
                console.log(angular.fromJson(data));
                if(data.CODE=='1000'){
                    show_alert_box('提示','添加成功');
                    $scope.category_name = "";
                    //$scope.ctg_list = data.DATA;
                    $scope.get_category();
                }else{
                    show_alert_box('提示',data.MESSAGE);
                }

            })
            .error(function (data,status) {
                alert(data);
            });
    }

    /**
     * 加载菜品分类
     */
    $scope.get_category = function(){
        $http({
            method:"GET",
            url:base_url+"/goods/selectCtgForShop/"+shopid,
            data:{
            }
        })
            .success(function (data,status) {
                console.log(angular.fromJson(data));
                if(data.CODE=='1000'){
                    //show_alert_box('提示','添加成功');
                    //$scope.category_name = "";
                    $scope.ctg_list = data.DATA;
                }else if(data.CODE=='1001'){

                } else{
                    show_alert_box('提示',data.MESSAGE);
                }

            })
            .error(function (data,status) {
                alert(data);
            });
    }

    $scope.get_category();

    /**
     * 更新分类、名称、状态
     * @param ctg
     */
    $scope.update_category = function(ctg_name,status,id){
        $http({
            method:"POST",
            url:base_url+"/goods/updateCategory",
            data:{
                category_name:ctg_name,
                category_id:id,
                category_status:status
            }
        })
            .success(function (data,status) {
                //console.log(angular.fromJson(data));
                if(data.CODE=='1000'){
                    show_alert_box('提示','修改成功');
                    $scope.get_category();
                }else{
                    show_alert_box('提示',data.MESSAGE);
                }

            })
            .error(function (data,status) {
                alert(data);
            });
    }

    /**
     * 删除分类
     * @param ctg_id
     */
    $scope.delete_category = function(ctg_id){
        if(confirm("确定删除？")){
            $http({
                method:"POST",
                url:base_url+"/goods/deleteCategory",
                data:{
                    category_id:ctg_id
                }
            })
                .success(function (data,status) {
                    //console.log(angular.fromJson(data));
                    if(data.CODE=='1000'){
                        show_alert_box('提示','删除成功');
                        $scope.get_category();
                    }else{
                        show_alert_box('提示',data.MESSAGE);
                    }

                })
                .error(function (data,status) {
                    alert(data);
                });
        };

    }



    /**
     * 修改前
     * @param ctg_id
     */
    $scope.pre_modify_ctg = function(ctg_id,ctg_name){
        //var html = "<input type='text' value='"+ctg_name+"' ng-model='ctg_name"+ctg_id+"'>&nbsp;&nbsp;";
        //html += "<button class=\"btn btn-info btn-xs\" type=\"button\" onclick=\"cancle_ctg("+ctg_id+",'"+ctg_name+"')\">取消</button>&nbsp;&nbsp;";
        //html += "<button class=\"btn btn-success btn-xs\" type=\"button\" onclick=\"save_ctg("+ctg_id+",'"+ctg_name+"')\">保存</button>";
        $("#"+ctg_id+"_td").hide();
        $("#"+ctg_id+"_hide").show();

    }

    /**
     * 取消
     * @param ctg_id
     * @param ctg_name
     */
    $scope.cancle_ctg = function(ctg_id,ctg_name){
        $("#"+ctg_id+"_td").show();
        $("#"+ctg_id+"_hide").hide();
    }

    /**
     * 修改名称
     * @param ctg_id
     */
    $scope.save_ctg = function(ctg_id){
        var ctg_name = $("#"+ctg_id+"_name").val();
        if(ctg_name==undefined||ctg_name==""){
            show_alert_box('提示','请输入分类名称');
            return;
        }
        if(ctg_name.length>25){
            show_alert_box('提示','名称不能超过25个字');
            return;
        }
        $http({
            method:"POST",
            url:base_url+"/goods/updateCategory",
            data:{
                category_id:ctg_id,
                category_name:ctg_name
            }
        })
            .success(function (data,status) {
                //console.log(angular.fromJson(data));
                if(data.CODE=='1000'){
                    show_alert_box('提示','修改成功');
                    $scope.get_category();
                }else{
                    show_alert_box('提示',data.MESSAGE);
                }
            })
            .error(function (data,status) {
                alert(data);
            });
    }

});


