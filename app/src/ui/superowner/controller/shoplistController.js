/**
 * Created  on 2017/9/5.
 */
'use strict';


app.controller('shoplistController', function ($scope, $http, $window,$log) {
   

    $scope.maxSize = 5;
    $scope.totalItems = 10;
    $scope.currentPage = 1;
    $scope.prePage = 10;
	$scope.shop_name = "";
   
    /**
    * 查询店铺
    */
    $scope.select_shops = function () {
        $http({
            method: "POST",
            url: base_url + "/shop/getShopInfoall",
            data: {
                shop_name: $scope.shop_name,
                page_no: $scope.currentPage

            }
        }).success(function (data, status) {
                if (data.CODE == '1000') {
                    $log.debug('返回信息', data);
                    $scope.select_shop = data.DATA;
                    $scope.totalItems = data.totalnum;
                    $scope.currentPage = data.page_no;
                } else {
                    show_alert_box('提示', data.MESSAGE);
                }

            })
            .error(function (data, status) {
                alert(data);
            });
    }
    $scope.select_shops();

    /**
    * 删除商品
    * @param shop_id
    */
    $scope.delete_shop = function (shop_id) {
        if (confirm('确定删除此商品？')) {
            $http({
                method: "POST",
                url: base_url + "/shops/deleteShops",
                data: {
                    shop_id: shop_id
                }
            })
                .success(function (data, status) {
                    console.log(angular.fromJson(data));
                    if (data.CODE == '1000') {
                        show_alert_box('提示', '删除成功');
                        $scope.select_shops();
                    } else {
                        show_alert_box('提示', data.MESSAGE);
                    }

                })
                .error(function (data, status) {
                    alert(data);
                });
        }

    }
	/**
     * 跳转修改页面
     * @param goods_id
     */
    $scope.modify_click = function(shop_id){
        $window.location.href = "#updateshop/"+shop_id;
    }
/**
     * 展示图片
     * @param url
     */
    $scope.showImg = function(url,name){
        $scope.img_name = name;
        var imgUrl = img_url+url;
        $("#shop_img").attr("src",imgUrl);
        $("#imgDiv").modal('show');
    }

})
app.controller('updateshopController',function($scope,$http,$window,$routeParams,$log){
    $scope.type = {
        '4点' : "4",
        '5点' : "5",
        '6点' : "6",
        '7点' : "7",
        '8点' : "8",
        '9点' : "9",
        '10点' : "10",
        '11点' : "11",
        '12点' : "12"
    };
    $scope.type1 = {
        '13点' : "13",
        '14点' : "14",
        '15点' : "15",
        '16点' : "16",
        '17点' : "17",
        '18点' : "18",
        '19点' : "19",
        '20点' : "20",
        '21点' : "21",
        '22点' : "22",
        '23点' : "23",
        '24点' : "24"
    };
var shop_id = $routeParams.shop_id;
    $scope.select_shops = function(){
        $http({
            method:"GET",
            url:base_url+"/shop/getShopInfo/"+shop_id,
            data:{}
        })
            .success(function (data,status) {
                if(data.CODE=='1000'){
                    $scope.shop_name = data.DATA.shop_name;
                    $scope.shop_owner_name = data.DATA.shop_owner_name;
                    $scope.shop_owner_phone = data.DATA.shop_owner_phone;
                    $scope.address = data.DATA.address;
                    $scope.introduction = data.DATA.introduction;
                    $scope.endtime = data.DATA.end_time;
                    $scope.begintime = data.DATA.begin_time;
                    $scope.shop_id = data.DATA.shop_id;
                }else{
                    show_alert_box('提示',data.MESSAGE);
                }

            });
    }
    $scope.select_shops();

    //返回列表页
    $scope.go_back = function () {
        $window.location.href = "#shoplist";
    }


    $scope.doUpdate = function () {
        var shop_name = $scope.shop_name;
        var shop_owner_name = $scope.shop_owner_name;
        var shop_owner_phone = $scope.shop_owner_phone;
        var begintime = $scope.begintime;
        var endtime = $scope.endtime;
        var address = $scope.address;
        var introduction = $scope.introduction;
        var fd = new FormData();
        fd.append('shop_id', shop_id);
        fd.append('shop_name',shop_name);
        fd.append('shop_owner_name',shop_owner_name);
        fd.append('begin_time',begintime);
        fd.append('end_time',endtime);
        fd.append('shop_owner_phone',shop_owner_phone);
        fd.append('address',address);
        fd.append('introduction',introduction);
        if($scope.checkForm(fd)){
           var file = document.querySelector('input[type=file]').files[0];
            var wechat_img = document.querySelector('input[id=wechat_img]').files[0];
            var alipay_img = document.querySelector('input[id=alipay_img]').files[0];
            if(file==undefined){
               // show_alert_box('提示','请上传店铺logo');
                //return;
            }else{
                if(file.type!="image/jpeg"&&file.type!="image/png"){
                    show_alert_box('提示','上传图片格式只能为jpeg和png');
                    return;
                }
                fd.append('file', file);
            }
            if(wechat_img==undefined){
            }else{
                if(wechat_img.type!="image/jpeg"&&wechat_img.type!="image/png"){
                    show_alert_box('提示','微信支付码上传图片格式只能为jpeg和png');
                    return;
                }
                fd.append('wechat_img_file', wechat_img);
            }

            if(alipay_img==undefined){
            }else{
                if(alipay_img.type!="image/jpeg"&&alipay_img.type!="image/png"){
                    show_alert_box('提示','支付宝上传图片格式只能为jpeg和png');
                    return;
                }
                fd.append('alipay_img_file', alipay_img);
            }
            //fd.append('file', file);
            $http({
                method:"POST",
                url:base_url+"/shop/updateShop",
                data:fd,
                headers: {'Content-Type':undefined},
                transformRequest: angular.identity
            })
                .success(function (data,status) {
                    console.log(angular.fromJson(data));
                    if(data.CODE=='1000'){
                        show_alert_box('提示','修改成功');
                        $window.location.href = "#shoplist";
                    }else{
                        show_alert_box('提示',data.MESSAGE);
                    }

                })
                .error(function (data,status) {
                    alert(data);
                });
        }


    }

    $scope.checkForm = function(fd){
        var isSuccess = false;
        if(fd.get('shop_name')=='undefined'){
            alert("请输入店铺名称");
        }else if(fd.get('shop_owner_name')=='undefined'){
            alert("请输入负责人姓名");
        }else if(fd.get('shop_owner_phone')=='undefined'){
            alert("请输入负责人电话");
        }else if(fd.get('begin_time')=='undefined'){
            alert("请输入开始时间点");
        }else if(fd.get('end_time')=='undefined'){
            alert("请输入结束时间点");
        }else if(fd.get('address')=='undefined'){
            alert("请输入店铺地址");
        }else{
            isSuccess = true;
        }


        return isSuccess;
    }
})
app.controller('updatepasswordController',function($scope,$http,$window,$routeParams){

    $scope.doUpdate = function(){
        if($scope.checkForm()) {
            $http({
                method: "POST",
                url: base_url + "/shop/updatePassword",
                data: {
                    shop_id: shopid,
                    oldpassword: $scope.oldpassword,
                    password: $scope.password,
                    passwordnew: $scope.passwordnew

                }
            })
                .success(function (data, status) {
                    console.log(angular.fromJson(data));
                    if (data.CODE == '1000') {
                        show_alert_box('提示', '修改成功');
                    } else {
                        show_alert_box('提示', data.MESSAGE);
                    }

                }).error(function (data, status) {
                    alert(data);
                });
        }
    }

    $scope.checkForm = function(){
        var isSuccess = false;
        if($scope.oldpassword==undefined||$scope.oldpassword==""){
            show_alert_box("请输入原密码");
        }else if($scope.password==undefined||$scope.password==""){
            show_alert_box("请输入新密码");
        }else if($scope.passwordnew==undefined||$scope.passwordnew=="") {
            show_alert_box("请输入确认新密码");
        }else{
            isSuccess = true;
        }
        return isSuccess;
    }
});




  