/**
 * Created by jacktong on 2017/8/9.
 */
'use strict';


app.controller("indexController",function($scope,$http,$ocLazyLoad,$log){

    var load_file = [
        "app-template/js/common.js",
        "app-template/css/common.css",
        "app-template/css/font.css",
        "app-template/css/header.css",
        "app-template/css/footer.css",
        "app-template/css/index.css",
        "app-template/css/responsive.css"
    ];
    $scope.load = function(){
        $ocLazyLoad.load([
            {files:load_file,cache:false}]);
    }
    $scope.load();



    $scope.rysj = true;
    $scope.dqzt = 'tuijian_ctg';
    $scope.address = localStorage.getItem("address");
    $scope.user_phone = localStorage.getItem("user_phone");
    $scope.user_session = localStorage.getItem("user_phone");
    /**
     * 加载店铺、商品数据
     */
    $scope.init_shop_goods = function(){
        var cart_id = localStorage.getItem("cart_id");
        $http({
            method:"GET",
            url:base_url+"/goods/selectCtgForShopPerson/"+shop_id+"/"+cart_id,
            data:null,
            cache:false,
        }).success(function (data,status) {
                if(data.CODE=='1000'){
                    $scope.category_list = data.DATA;
                    $scope.shop = data.SHOP;
                    var myDate = new Date();
                    var begintime = $scope.shop.begin_time;
                    var endtime = $scope.shop.end_time;
                    if(begintime>myDate.getHours()|| endtime<myDate.getHours()){
                        $scope.rysj = false;
                    }
                    //console.log($scope.shop);
                }else{
                    shop_alert_box_mobile('提示',data.MESSAGE);
                }
            })
            .error(function (response,status,header) {
                shop_alert_box_mobile('提示','数据加载异常'+response);
            });


    }
    $scope.init_shop_goods();

    /**
     * 加载购物车
     */
    $scope.init_shopping_cart = function(){
        var cart_id = localStorage.getItem("cart_id");
        $http({
            method:"POST",
            url:base_url+"/cart/getCart",
            data:{
                cart_id:cart_id
            },
            cache:false,
        }).success(function (data,status) {
            if(data.CODE=='1000'){
                if(data.DATA==undefined){
                    localStorage.removeItem("cart_id");
                }
                $scope.cart = data.DATA;
                if($scope.cart==null){
                    $("#submit_cart").hide();
                    $("#submit_cart_unbind").show();
                }else{
                    $("#submit_cart").show();
                    $("#submit_cart_unbind").hide();
                }

            }else{
                shop_alert_box_mobile('提示',data.MESSAGE);
            }
        })
            .error(function (response,status,header) {
                shop_alert_box_mobile('提示','数据加载异常'+response);
            });
    }

    $scope.init_shopping_cart_html = function(){
        $scope.cart = JSON.parse(sessionStorage.getItem("shoppingcart"));
        console.log($scope.cart);
        if($scope.cart==null){
            $("#submit_cart").hide();
            $("#submit_cart_unbind").show();
        }else{
            $("#submit_cart").show();
            $("#submit_cart_unbind").hide();
        }
    }


    //setInterval(function(){
     //   $scope.init_shopping_cart();
        //$scope.init_shop_goods();
        //$scope.select_ctg($scope.dqzt);
    //},3000);

    $scope.init_shopping_cart();



    /**
     * 选择分类
     * @param category_id
     */
    $scope.select_ctg = function(category_id){
        $(".ctg_select").attr("class","ctg_select");
        $("#"+category_id).attr("class","select ctg_select");
        //if(category_id!="default_ctg"){
            //$scope.curr_ctg_id = category_id;
        //}else{
            //$scope.curr_ctg_id = "";

        //}
        $scope.dqzt =category_id;
        $("#" + category_id+"_anchor").HoverTreeScroll(50);
        //location.href="#" + category_id+"_anchor";
        $location.hash(category_id+"_anchor");
        $anchorScroll();



    }

    //滚动导航改变
    $(window).scroll(function () {
        for (var i = 0; i < $scope.category_list.length+2; i++){
            if ($(document).scrollTop() >= $(".line1").eq(i).offset().top-70) {
                $(".ctg_select").attr("class","ctg_select");
                $(".ctg_select").eq(i).attr("class", "select ctg_select");
            }
    }
    });


    /**
     * 确认订单
     */
    $scope.confirm_order = function(cart_id){
        var re = /^[1-9]+[0-9]*]*$/;
        var address = $("#address").val();
        var comments = $("#comments").val();
        var user_phone = $("#user_phone").val();
        var way = $("#way").val();
         if(address==''){
             $("#address").focus();
             alert("请输入送货地址");
             return;
         }

        if(user_phone==''){
            $("#user_phone").focus();
            alert("请输入手机号码");
            return;
        }

        if(user_phone!=''){
            if (!re.test(user_phone)||user_phone.length!=11) {
                $("#user_phone").val("");
                $("#user_phone").focus();
                alert("手机号码请输入11位数字");
                return;
            }
        }

        var user_session = localStorage.getItem("session_id");
        if(undefined==user_session||""==user_session||null==user_session){
            $("#valid_btn").show();
            //校验手机号是否注册用户
            $http({
                method:"POST",
                url:base_url+"/userservice/checkUser",
                data:{
                    username:user_phone
                }
            }).success(function (data,status) {
                if(data.CODE=='1000'){
                    if(data.DATA=="0"){//不存在用户，注册一个
                        $scope.registe_phone(user_phone);
                    }
                    localStorage.setItem("session_id",user_phone);
                    //下单
                    $http({
                        method:"POST",
                        url:base_url+"/userorder/saveOrder",
                        data:{
                            cart_id:cart_id,
                            address:address,
                            user_phone:user_phone,
                            comments:comments,
                            user_id:user_phone
                        },
                        cache:false,
                    }).success(function (data,status) {
                        if(data.CODE=='1000'){
                            $scope.init_shopping_cart();
                            $scope.init_shop_goods();
                            shop_alert_box_mobile('提示',"下单成功，超市收到订单后会进行配送");
                            $("#submit_cart").click();
                            close_background();
                            localStorage.removeItem("cart_id");
                            localStorage.setItem("address",address);
                            localStorage.setItem("user_phone",user_phone);
                        }else{
                            shop_alert_box_mobile('提示',data.MESSAGE);
                        }
                    })
                        .error(function (response,status,header) {
                            shop_alert_box_mobile('提示','数据加载异常'+response);
                        });

                }else{
                    shop_alert_box_mobile('提示',data.MESSAGE);
                }
            })
                .error(function (response,status,header) {
                    shop_alert_box_mobile('提示','数据加载异常'+response);
                });
        }else{
            $("#valid_btn").hide();
            //下单
            $http({
                method:"POST",
                url:base_url+"/userorder/saveOrder",
                data:{
                    cart_id:cart_id,
                    address:address,
                    user_phone:user_phone,
                    comments:comments,
                    user_id:user_session
                },
                cache:false,
            }).success(function (data,status) {
                if(data.CODE=='1000'){
                    $scope.init_shopping_cart();
                    $scope.init_shop_goods();
                    shop_alert_box_mobile('提示',"下单成功，超市收到订单后会进行配送");
                    $("#submit_cart").click();
                    close_background();
                    localStorage.removeItem("cart_id");
                    localStorage.setItem("address",address);
                    localStorage.setItem("user_phone",user_phone);
                }else{
                    shop_alert_box_mobile('提示',data.MESSAGE);
                }
            })
                .error(function (response,status,header) {
                    shop_alert_box_mobile('提示','数据加载异常'+response);
                });
        }
        $("#comments").val("");




    }

    $scope.registe_phone = function(phone_no){
        $http({
            method:"POST",
            url:base_url+"/userservice/registePhone",
            data:{
                phone_no:phone_no
            }
        }).success(function (data,status) {
            if(data.CODE=='1000'){
            }else{
                shop_alert_box_mobile('提示',data.MESSAGE);
            }
        })
            .error(function (response,status,header) {
                shop_alert_box_mobile('提示','数据加载异常'+response);
            });
    }

    /**
     * 添加购物车
     */
    $scope.addCart = function(good_id){
        $http({
            method:"POST",
            url:base_url+"/cart/addCart",
            data:{
                shop_id:shop_id,
                table_id:table_id,
                good_id:good_id,
                from:1 //顾客
            },
            cache:false,
        }).success(function (data,status) {
            if(data.CODE=='1000'){
                $scope.init_shopping_cart();
                $scope.init_shop_goods();
            }else if(data.CODE=='10000'){
                $scope.init_shopping_cart();
                $scope.init_shop_goods();
                shop_alert_box_mobile('提示','菜品已添加，服务员还未确认，可到订单里面查看新增菜品');
            }else{
                shop_alert_box_mobile('提示',data.MESSAGE);
            }
        })
            .error(function (response,status,header) {
                shop_alert_box_mobile('提示','数据加载异常'+response);
            });
    }

    /**
     * 添加购物车--客户端存储
     * @param good_id
     */
    $scope.addCartHtml = function(goods_id){
        var cart_id = localStorage.getItem("cart_id");
        $http({
            method:"POST",
            url:base_url+"/cart/addCart",
            data:{
                cart_id:cart_id,
                good_id:goods_id
            },
            cache:false,
        }).success(function (data,status) {
            if(data.CODE=='1000'){
                if(null==cart_id){
                    localStorage.setItem("cart_id",data.CART_ID);
                }
                $scope.init_shopping_cart();
                $scope.init_shop_goods();
            }else{
                shop_alert_box_mobile('提示',data.MESSAGE);
            }
        })
            .error(function (response,status,header) {
                shop_alert_box_mobile('提示','数据加载异常'+response);
            });
    }

    /**
     * 清空购物车
     */
    $scope.dropCart = function(cart_id){
        $http({
            method:"POST",
            url:base_url+"/cart/deleteCart",
            data:{
                cart_id:cart_id
            },
            cache:false,
        }).success(function (data,status) {
            if(data.CODE=='1000'){
                localStorage.removeItem("cart_id");
                $scope.init_shopping_cart();
                $scope.init_shop_goods();
                $("html,body").removeAttr("style");
                //$("#cartContent").hide();
                $("html,body").removeAttr("style"); //清除html,body样式
                $("#cartLayer").addClass("fadeOut"); //添加背景层样式
                $("#cartContent").addClass("fadeOutBottom100"); //添加内容样式

                setTimeout(function(){
                    $("#cartContent").hide().removeClass("fadeOutBottom100"); //关闭内容
                    $("#cartLayer").remove(); //清除背景层
                }, 800);
            }else{
                shop_alert_box_mobile('提示',data.MESSAGE);
            }
        })
            .error(function (response,status,header) {
                shop_alert_box_mobile('提示','数据加载异常'+response);
            });
    }

    /**
     * 修改购物车
     *
     */
    $scope.modifyCart = function(goods_id,cart_id){
        $http({
            method:"POST",
            url:base_url+"/cart/removeCart",
            data:{
                cart_id:cart_id,
                good_id:goods_id
            },
            cache:false,
        }).success(function (data,status) {
            if(data.CODE=='1000'){
                $scope.init_shopping_cart();
                $scope.init_shop_goods();
            }else{
                shop_alert_box_mobile('提示',data.MESSAGE);
            }
        })
            .error(function (response,status,header) {
                shop_alert_box_mobile('提示','数据加载异常'+response);
            });


    }

    /**
     * 选择堂食打包
     * @param way
     */
    $scope.change_way = function(way){
        if(way==1){
            $("#way_1").attr("class","select icon-correct");
            $("#way_2").attr("class","");
        }else{
            $("#way_1").attr("class","");
            $("#way_2").attr("class","select icon-correct");
        }
        $("#way").val(way);
    }



});

app.controller("orderController",function($scope,$http){
    var session_id = localStorage.getItem("session_id");

    close_background();
    /**
     * 查询桌台订单
     */
    $scope.getOrder = function(){
        $http({
            method:"POST",
            url:base_url+"/userorder/getOrder",
            data:{
                phone:session_id
            },
            cache:false,
        }).success(function (data,status) {
            if(data.CODE=='1000'){
                $scope.order_list = data.DATA;
            }else{
                shop_alert_box_mobile('提示',data.MESSAGE);
            }
        })
            .error(function (response,status,header) {
                shop_alert_box_mobile('提示','数据加载异常'+response);
            });

    }
    $scope.getOrder();

});

app.controller("shopinfoController",function($scope,$http,$ocLazyLoad){
    var cart_id = localStorage.getItem("cart_id");

    /**
     * 加载店铺、商品数据
     */
    $scope.init_shop_goods = function(){
        $http({
            method:"GET",
            url:base_url+"/goods/selectCtgForShopPerson/"+shop_id+"/"+cart_id,
            data:null,
            cache:false,
        }).success(function (data,status) {
            if(data.CODE=='1000'){
                $scope.category_list = data.DATA;
                //console.log($scope.cateogry_list);
                $scope.shop = data.SHOP;
                var myDate = new Date();
                var begintime = $scope.shop.begin_time;
                var endtime = $scope.shop.end_time;
                if(begintime>myDate.getHours()|| endtime<myDate.getHours()){
                    $scope.rysj = false;
                }
                //console.log($scope.shop);
            }else{
                shop_alert_box_mobile('提示',data.MESSAGE);
            }
        })
            .error(function (response,status,header) {
                shop_alert_box_mobile('提示','数据加载异常'+response);
            });


    }
    $scope.init_shop_goods();


});

var close_background = function(){
    $("#cartContent").hide().removeClass("fadeOutBottom100").removeClass("fadeOutBottom20");
    $("#cartLayer").remove();
}