/**
 * Created by jacktong on 2017/7/24.
 */
'use strict';

//var app = angular.module('shopApp',['ui.bootstrap']);

app.controller('selectMenuController',function($scope,$http,$window){

    $scope.maxSize = 5;
    $scope.totalItems = 10;
    $scope.currentPage = 1;
    $scope.prePage = 10;

    /**
     * 查询菜品
     */
    $scope.select_goods = function(){
        $http({
            method:"POST",
            url:base_url+"/goods/selectOnepageGoods",
            data:{
                shop_id:shopid,
                page_no:$scope.currentPage

            }
        })
            .success(function (data,status) {
                if(data.CODE=='1000'){
                    $scope.goods_list = data.DATA;
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
    $scope.select_goods();

    /**
     * 上架、下架
     * @param status
     */
    $scope.change_status = function(goods_id,status){
        $http({
            method:"POST",
            url:base_url+"/goods/updateGoods",
            data:{
                good_id:goods_id,
                status:status
            }
        })
            .success(function (data,status) {
                console.log(angular.fromJson(data));
                if(data.CODE=='1000'){
                    show_alert_box('提示','修改成功');
                    $scope.select_goods();
                }else{
                    show_alert_box('提示',data.MESSAGE);
                }

            })
            .error(function (data,status) {
                alert(data);
            });
    }

    /**
     * 删除商品
     * @param goods_id
     */
    $scope.delete_goods = function(goods_id){
        if(confirm('确定删除此商品？')){
            $http({
                method:"POST",
                url:base_url+"/goods/deleteGoods",
                data:{
                    good_id:goods_id
                }
            })
                .success(function (data,status) {
                    console.log(angular.fromJson(data));
                    if(data.CODE=='1000'){
                        show_alert_box('提示','删除成功');
                        $scope.select_goods();
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
     * 跳转修改页面
     * @param goods_id
     */
    $scope.modify_click = function(goods_id){
        $window.location.href = "#updatemenu/"+goods_id;
    }

    /**
     * 展示图片
     * @param url
     */
    $scope.showImg = function(url,name){
        $scope.img_name = name;
        var imgUrl = "http://47.92.66.33:8080"+url;
        $("#goods_img").attr("src",imgUrl);
        $("#imgDiv").modal('show');
    }

    /**
     * 双击是否打印
     * @param if_print
     */
    $scope.changeIfPrinter = function(goods_id,if_print){
        $("#if_print_"+goods_id).hide();
        if(if_print==0){
            $("#if_print_modify_"+goods_id+"_0").show();
            $("#if_print_modify_"+goods_id+"_1").hide();
        }else{
            $("#if_print_modify_"+goods_id+"_0").hide();
            $("#if_print_modify_"+goods_id+"_1").show();
        }

    }

    /**
     * 取消
     * @param goods_id
     * @param if_print
     */
    $scope.cancle_if_print = function(goods_id,if_print){
        $("#if_print_"+goods_id).show();
        $("#if_print_modify_"+goods_id+"_0").hide();
        $("#if_print_modify_"+goods_id+"_1").hide();
    }

    /**
     * 保存
     * @param goods_id
     * @param if_print
     */
    $scope.save_if_print = function(goods_id,if_print){
        $("#if_print_"+goods_id).show();
        $("#if_print_modify_"+goods_id+"_0").hide();
        $("#if_print_modify_"+goods_id+"_1").hide();
        var if_print_select;
        if(if_print==0){
            if_print_select = $("#if_print_"+goods_id+"_0").val();
        }else{
            if_print_select = $("#if_print_"+goods_id+"_1").val();
        }
        $http({
            method:"POST",
            url:base_url+"/goods/ifPrintChange",
            data:{
                goods_id:goods_id,
                if_print:if_print_select

            }
        })
            .success(function (data,status) {
                if(data.CODE=='1000'){
                    $scope.select_goods();
                }else{
                    show_alert_box('提示',data.MESSAGE);
                }

            })
            .error(function (data,status) {
                alert(data);
            });
    }

    /**
     * 修改打印机
     */
    $scope.changePrinter = function(goods_id,printer_str){
        $("#printer_"+goods_id).hide();
        var check_name = "printer_check_"+goods_id;
        $("[name='"+check_name+"']").each(function(){
            var v = $(this).val();
            if(printer_str.indexOf(v) != -1){
                $(this).attr("checked",'true');
            }
        });
        $("#printer_modify_"+goods_id).show();
    }

    /**
     * 取消修改
     * @param goods_id
     */
    $scope.cancle_modify_printer = function(goods_id){
        $("#printer_modify_"+goods_id).hide();
        $("#printer_"+goods_id).show();
    }

    /**
     * 保存修改
     * @param goods_id
     */
    $scope.save_modify_printer = function(goods_id){
        var str = "";
        var check_name = "printer_check_"+goods_id;
        var print_list = $("[name='"+check_name+"']:checked").val();
        $("[name='"+check_name+"']:checked").each(function(){
            str += $(this).val()+",";
        });
        $http({
            method:"POST",
            url:base_url+"/goods/printChange",
            data:{
                goods_id:goods_id,
                printer_str:str.substr(0,str.length-1)
            }
        })
            .success(function (data,status) {
                if(data.CODE=='1000'){
                    $scope.select_goods();
                }else{
                    show_alert_box('提示',data.MESSAGE);
                }

            })
            .error(function (data,status) {
                alert(data);
            });


    }


    /**
     * 双击推荐
     * @param good_id
     * @param tuijian
     */
    $scope.changeTuijian = function(good_id,tuijian){
        if(tuijian=="1"){
            $("#tuijian_"+good_id+"_0").hide();
            $("#tuijian_"+good_id+"_1").show();
            $("#tuijian_"+good_id).hide();
        }else{
            $("#tuijian_"+good_id+"_0").show();
            $("#tuijian_"+good_id+"_1").hide();
            $("#tuijian_"+good_id).hide();
        }
    }

    /**
     * 取消
     * @param good_id
     * @param tuijian
     */
    $scope.cancle_if_tuijian = function(good_id,tuijian){
        $("#tuijian_"+good_id+"_0").hide();
        $("#tuijian_"+good_id+"_1").hide();
        $("#tuijian_"+good_id).show();
    }

    /**
     * 保存推荐
     * @param good_id
     * @param tuijian
     */
    $scope.save_if_tuijian = function(good_id,tuijian){
        var tuijian_val = "";
        if(tuijian==0){
            tuijian_val = $("#tuijian_"+good_id+"_select_0").val();
        }
        if(tuijian==1){
            tuijian_val = $("#tuijian_"+good_id+"_select_1").val();
        }
        $http({
            method:"POST",
            url:base_url+"/goods/tuijianChange",
            data:{goods_id:good_id,tuijian:tuijian_val}
        })
            .success(function (data,status) {
                if(data.CODE=='1000'){
                    $scope.select_goods();
                }else{
                    show_alert_box('提示',data.MESSAGE);
                }

            });
    }



})

app.controller('updateMenuController',function($scope,$http,$routeParams,$window){

    //加载分类
    $scope.init_ctg = function(){
        $http({
            method:"GET",
            url:base_url+"/goods/selectCtgForShop/"+shopid,
            data:{}
        })
            .success(function (data,status) {
                if(data.CODE=='1000'){
                    $scope.ctg_list = data.DATA;
                    //$scope.ctg_id = ctg_id;
                }else{
                    show_alert_box('提示',data.MESSAGE);
                }

            });
    }



    var goods_id = $routeParams.goods_id;
    $scope.select_goods = function(){
        $http({
            method:"POST",
            url:base_url+"/goods/selectGoods",
            data:{goods_id:goods_id}
        })
            .success(function (data,status) {
                if(data.CODE=='1000'){
                    $scope.init_ctg();
                    $scope.goods_name = data.DATA.goods_name;
                    $scope.ctg_id = data.DATA.category_id;
                    $scope.pre_price = data.DATA.pre_price;
                    $scope.discount = data.DATA.discount;
                    $scope.introduction = data.DATA.introduction;
                    $scope.good_id = data.DATA.good_id;
                    $scope.sales_count = data.DATA.sales_count;

                }else{
                    show_alert_box('提示',data.MESSAGE);
                }

            });
    }
    $scope.select_goods();

    /**
     * 保存修改
     * @param $scope
     * @param $http
     */
    $scope.save_update = function(){
        //校验，待完成
        var category_id = $scope.ctg_id;
        var goods_name = $scope.goods_name;
        var pre_price = $scope.pre_price;
        var discount = $scope.discount;

        if(goods_name==undefined){
            show_alert_box('提示','请填写菜品名称');
            return;
        }
        if(category_id==undefined){
            show_alert_box('提示','请选择菜品分类');
            return;
        }

        if(pre_price==undefined){
            show_alert_box('提示','请填写菜品单价');
            return;
        }
        if(discount==undefined){
            show_alert_box('提示','请填写折扣，1代表没有折扣，0.8代表8折');
            return;
        }


        var fd = new FormData();
        var file = document.querySelector('input[type=file]').files[0];
        if(file==undefined){
            //show_alert_box('提示','请上传jpeg或者png格式图片');
            //return;
            //fd.append('file', null);
        }else{
            if(file.type!="image/jpeg"&&file.type!="image/png"){
                show_alert_box('提示','上传图片格式只能为jpeg和png');
                return;
            }
            fd.append('file', file);
        }

        fd.append('shop_id',shopid);
        fd.append('category_id',category_id);
        fd.append('goods_name',goods_name);
        fd.append('pre_price',pre_price);
        fd.append('discount',discount);
        fd.append('good_id',$scope.good_id);
        fd.append('introduction',$scope.introduction);

        $http({
            method:"POST",
            url:base_url+"/goods/updateGoods",
            data:fd,
            headers: {'Content-Type':undefined},
            transformRequest: angular.identity
        })
            .success(function (data,status) {
                console.log(angular.fromJson(data));
                if(data.CODE=='1000'){
                    show_alert_box('提示','修改成功');
                    //跳转查询
                    $window.location.href = "#menu";
                }else{
                    show_alert_box('提示',data.MESSAGE);
                }

            })
            .error(function (data,status) {
                alert(data);
            });

    }

    $scope.go_back = function(){
        $window.location.href = "#menu";
    }



})

app.controller('menuController',function($scope,$http){
    $scope.discount = 1;

    //加载分类
    $scope.init_ctg = function(){
        $http({
            method:"GET",
            url:base_url+"/goods/selectCtgForShop/"+shopid,
            data:{}
        })
            .success(function (data,status) {
                if(data.CODE=='1000'){
                    $scope.ctg_list = data.DATA;
                }else if(data.CODE=='1001'){

                } else{
                    show_alert_box('提示',data.MESSAGE);
                }

            });
    }
    $scope.init_ctg();

    /**
     * 添加菜单
     */
    $scope.save_goods = function(){

        var category_id = $scope.ctg_id;
        var goods_name = $scope.ctg_name;
        var pre_price = $scope.pre_price;
        var discount = $scope.discount;

        if(goods_name==undefined){
            show_alert_box('提示','请填写菜品名称');
           return;
        }

        if(category_id==undefined){
            show_alert_box('提示','请选择菜品分类');
            return;
        }

        if(pre_price==undefined){
            show_alert_box('提示','请填写菜品单价');
            return;
        }
        if(discount==undefined){
            show_alert_box('提示','请填写折扣，1代表没有折扣，0.8代表8折');
            return;
        }


        var fd = new FormData();
        var file = document.querySelector('input[type=file]').files[0];
        if(file==undefined){
            //show_alert_box('提示','请上传jpeg或者png格式图片');
            //return;
        }else{
            if(file.type!="image/jpeg"&&file.type!="image/png"){
                show_alert_box('提示','上传图片格式只能为jpeg和png');
                return;
            }
            fd.append('file', file);
        }

        fd.append('shop_id',shopid);
        fd.append('category_id',category_id);
        fd.append('goods_name',goods_name);
        fd.append('pre_price',pre_price);
        fd.append('discount',discount);
        if($scope.introduction!=undefined){
            fd.append('introduction',$scope.introduction);
        }

        $http({
            method:"POST",
            url:base_url+"/goods/addGoods",
            data:fd,
            headers: {'Content-Type':undefined},
            transformRequest: angular.identity
        })
            .success(function (data,status) {
                //console.log(angular.fromJson(data));
                if(data.CODE=='1000'){
                    show_alert_box('提示','添加成功');
                    $("#add_form")[0].reset();
                    $scope.introduction = "";
                }else{
                    show_alert_box('提示',data.MESSAGE);
                }

            })
            .error(function (data,status) {
                alert(data);
            });
    }

})