/**
 * Created by jacktong on 2017/8/28.
 */

'use strict';

app.controller('shopmanageController',function($scope,$http,$window,$log,$ocLazyLoad){
    $ocLazyLoad.load([

        '/admin-template/js/bootstrap-timepicker/css/timepicker.css',
        '/admin-template/js/bootstrap-datetimepicker/css/datetimepicker-custom.css',
        '/admin-template/js/bootstrap-datetimepicker/js/bootstrap-datetimepicker.js',
        '/admin-template/js/bootstrap-timepicker/js/bootstrap-timepicker.js',
        '/admin-template/js/bootstrap-colorpicker/js/bootstrap-colorpicker.js',
        '/admin-template/js/pickers-init.js'

    ]);
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
    $scope.doAdd = function(){
        var shop_name = $scope.shop_name;
        var username = $scope.username;
        var shop_owner_name = $scope.shop_owner_name;
        var shop_owner_phone = $scope.shop_owner_phone;
        var begintime = $("#begintime").val();//$scope.begintime;
        var endtime = $("#endtime").val();//$scope.endtime;
        var address = $scope.address;
        var introduction = $scope.introduction;
        var fd = new FormData();
        fd.append('shop_name',shop_name);
        fd.append('user_name',username);
        fd.append('shop_owner_name',shop_owner_name);
        fd.append('shop_owner_phone',shop_owner_phone);
        fd.append('begin_time',begintime);
        fd.append('end_time',endtime);
        fd.append('address',address);
        fd.append('introduction',introduction);
        if($scope.checkForm(fd)){
            var file = document.querySelector('input[type=file]').files[0];
            var wechat_img = document.querySelector('input[id=wechat_img]').files[0];
            var alipay_img = document.querySelector('input[id=alipay_img]').files[0];
            console.log('返回数据1122212123123', document.querySelector('input[id=wechat_img]').files[0]);
            if(file==undefined){
                show_alert_box('提示','请上传店铺logo');
                return;
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

            $http({
                method:"POST",
                url:base_url+"/shop/addShop",
                data:fd,
                headers: {'Content-Type':undefined},
                transformRequest: angular.identity
            })
                .success(function (data,status) {
                    console.log(angular.fromJson(data));
                    if(data.CODE=='1000'){
                        show_alert_box('提示','添加成功');
                        $window.location.href = "#addShop";
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
        }else if(fd.get('user_name')=='undefined'){
            alert("请输入用户名");
        }else if(fd.get('shop_owner_name')=='undefined'){
            alert("请输入负责人姓名");
        }else if(fd.get('shop_owner_phone')=='undefined'){
            alert("请输入负责人电话");
        }else if(fd.get('begin_time')=='undefined'){
            alert("请输入开始时间点");
        }else if(fd.get('end_time')=='undefined') {
            alert("请输入结束时间点");
        }else if(fd.get('address')=='undefined'){
            alert("请输入店铺地址");
        }else{
            isSuccess = true;
        }


        return isSuccess;
    }
});