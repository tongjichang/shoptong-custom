'use strict';


app.controller('tableController', ['$scope', '$http', '$location', '$window', '$route', '$filter', function ($scope, $http, $location, $window, $route, $filter) {
    //权限菜单管理
    $scope.roleid = roleid;
    //加载数据
    $scope.list_table = function () {
        $http({
            method: "POST",
            url: base_url + "/tableservice/getTableInfo",
            data: {
                shopid: shopid
            }

        })
            .success(function (data, status) {
                console.log(angular.fromJson(data));
                $scope.areas = data.DATA;

            })
            .error(function (data, status) {
                show_alert_box('提示', '数据加载异常' + data);
            });
    }

    /**
     * 查询店铺信息
     */
    $scope.get_shop = function () {
        $http({
            method: "GET",
            url: base_url + "/shop/getShopInfo/" + shopid,
            data: {}

        })
            .success(function (data, status) {
                $scope.shop = data.DATA;
                $scope.shop_img_url = img_url+data.DATA.icon;
                $scope.shop_wechat_img_url = img_url+data.DATA.wechat_img;
                $scope.shop_alipay_img_url = img_url+data.DATA.alipay_img;
            })
            .error(function (data, status) {
                show_alert_box('提示', '数据加载异常' + data);
            });
    }

    $scope.list_table();
    $scope.get_shop();
    $scope.home_right = "src/ui/shopowner/view/shop_profile.html";

    $scope.addArea = function () {
        $("#area_form").attr("action", "#/addArea");
        $("#area_form").submit();
    }

    $scope.deleteArea = function (area_id) {
        if (confirm('确定要删除吗？')) {
            $http({
                method: "POST",
                url: base_url + "/tableservice/deleteArea",
                data: {
                    area_id: area_id
                }
            }).success(function (data, status) {
                if (data.CODE == '1000') {
                    $route.reload();
                    //show_alert_box_callback('提示','删除成功',function(){
                    //$route.reload();
                    //window.location.reload();
                    // });
                } else {
                    show_alert_box('提示', data.MESSAGE);
                }


            }).error(function (data, status) {
                show_alert_box('提示', '数据加载异常');
            });


        }
    }

    /**
     * 弹出结账框
     * @param table_id
     */
    $scope.show_check = function (table_id, table_status) {
        //加载数据
        if (table_status == 1) {
            $scope.select_order(table_id);
        } else if (table_status == 2) {
            show_alert_box('提示', '此桌有人预定');
        } else if (table_status == 3) {
            show_alert_box('提示', '服务员占用');
        } else if (table_status == 4) {
            show_alert_box('提示', '该桌占不可用');
        }
    }

    /**
     * 查询订单
     * @param table_id
     */
    $scope.select_order = function (table_id) {
        $http({
            method: "POST",
            url: base_url + "/order/getOrderForAdmin",
            data: {
                table_id: table_id
            }
        })
            .success(function (data, status) {
                if (data.CODE == '1000') {
                    $scope.$parent.order = data.DATA;
                    $scope.$parent.home_right = "src/ui/shopowner/view/check_bill.html";
                } else {
                    show_alert_box('提示', data.MESSAGE);
                }

            })
            .error(function (data, status) {
                alert(data);
            });

    }

    /**
     * 结账
     * @param order_id
     */
    $scope.check_bill = function (order_id) {
        if (confirm('确认结账？')) {
            $http({
                method: "POST",
                url: base_url + "/order/check",
                data: {
                    order_id: order_id

                }
            })
                .success(function (data, status) {
                    if (data.CODE == '1000') {
                        show_alert_box('提示', "成功");
                        //$scope.list_table();
                        //$location.path("/tableManager");
                        $route.reload();
                    } else if (data.CODE == '1003') {
                        show_alert_box('提示', data.MESSAGE);
                        $window.location.href = "/";
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
     * 过滤器
     * @param status
     */
    $scope.table_filter = function (status) {
        $scope.status_filter = status;
    }

    /**
     * 修改订单--管理员
     */
    $scope.modifyOrder = function (flag) {
        if (flag == 1) {
            $(".before_modify").hide();
            $(".modifying").show();
            $("#discount").val($scope.order.discount);
            $("#minus").val($scope.order.minus_money);
        } else if (flag == 2) {
            $(".before_modify").show();
            $(".modifying").hide();
        }
    }
    /**
     * 结账
     * @param order_id
     */
    $scope.print = function (order_id,shop_id) {
        if (true) {
            $http({
                method: "POST",
                url: base_url + "/order/print",
                data: {
                    order_id: order_id,
                    shop_id: shop_id

                }
            })
                .success(function (data, status) {
                    if (data.CODE == '1000') {
                        show_alert_box('提示', "成功");
                        $scope.list_table();
                    } else if (data.CODE == '1003') {
                        show_alert_box('提示', data.MESSAGE);
                        $window.location.href = "/";
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
     * 折扣修改--重新计算价格
     */
    $scope.discount_change = function () {
        var discount = $("#discount").val();
        var minus = $("#minus").val();
        var payment = $scope.order.payment;
        var real_payment = $scope.order.real_payment;
        $scope.order.discount_payment = payment * discount;
        $scope.order.real_payment = payment * discount - minus;

    }

    /**
     * 抹零--重新计算
     */
    $scope.minus_change = function () {
        var payment = $scope.order.payment;
        var discount = $("#discount").val();
        var minus = $("#minus").val();
        var real_payment = $scope.order.real_payment;
        $scope.order.real_payment = payment * discount - minus;
    }

    /**
     * 保存订单修改
     */
    $scope.doSave = function () {
        var discount = $("#discount").val();
        var minus = $("#minus").val();
        $scope.order.discount = discount;
        $scope.order.minus_money = minus;
        $http({
            method: "POST",
            url: base_url + "/order/updateOrder",
            data: {
                order_id: $scope.order.order_id,
                discount: $scope.order.discount,
                minus_money: $scope.order.minus_money,
                real_payment: $scope.order.real_payment,
                discount_payment: $scope.order.discount_payment


            }
        })
            .success(function (data, status) {
                if (data.CODE == '1000') {
                    $scope.modifyOrder(2);
                    show_alert_box('提示', "成功");
                } else if (data.CODE == '1003') {
                    show_alert_box('提示', data.MESSAGE);
                    $window.location.href = "/";
                } else {
                    show_alert_box('提示', data.MESSAGE);
                }
            })
            .error(function (data, status) {
                alert(data);
            });
    }

    /**
     * 取消订单
     */
    $scope.doCancel = function () {
        if (confirm('确定取消订单？')) {
            $http({
                method: "POST",
                url: base_url + "/order/cancleOrder",
                data: {
                    order_id: $scope.order.order_id
                }
            })
                .success(function (data, status) {
                    if (data.CODE == '1000') {
                        show_alert_box('提示', "成功");
                        $route.reload();
                    } else if (data.CODE == '1003') {
                        show_alert_box('提示', data.MESSAGE);
                        $window.location.href = "/";
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
     * 注销
     */
    $scope.logout = function () {
        if (confirm('确定注销？')) {
            $http({
                method: "POST",
                url: base_url + "/userservice/logout",
                data: {
                    business_id: shopid
                }
            })
                .success(function (data, status) {
                    if (data.CODE == '1000') {
                        $window.location.href = "/";

                    } else if (data.CODE == '1003') {
                        show_alert_box('提示', data.MESSAGE);
                        $window.location.href = "/";
                    } else {
                        show_alert_box('提示', data.MESSAGE);
                    }
                })
                .error(function (data, status) {
                    alert(data);
                });
        }
    }


}]);

app.controller('addAreaController', ['$scope', '$http', function ($scope, $http) {

    $scope.add_area_back = function () {
        $("#add_area_form").attr("action", "#/tableManager");
        $("#add_area_form").submit();
    }

    $scope.save_btn_click = function () {
        var area_name = $scope.area_name;
        if (area_name == undefined || area_name == "") {
            show_alert_box('提示', '请输入分区名称');
            return;
        }
        if (area_name.length > 25) {
            show_alert_box('提示', '名称不能超过25个字');
            return;
        }
        $http({
            method: "POST",
            url: base_url + "/tableservice/addArea",
            data: {
                shop_id: shopid,
                area_name: area_name
            }
        })
            .success(function (data, status) {
                console.log(angular.fromJson(data));
                if (data.CODE == '1000') {
                    show_alert_box('提示', '保存成功');
                    $scope.area_name = '';
                } else {
                    show_alert_box('提示', data.MESSAGE);
                }

            })
            .error(function (data, status) {
                alert(data);
            });
    }


}]);

/**
 * 新增桌台
 */
app.controller('addTableController', function ($scope, $http) {

    $scope.maxSize = 5;
    $scope.totalItems = 10;
    $scope.currentPage = 1;
    $scope.prePage = 10;

    $scope.save_btn_click = function () {
        var table_name = $scope.table_name;
        var people_count = $scope.people_count;
        $http({
            method: "POST",
            url: base_url + "/tableservice/addTable",
            data: {
                shop_id: shopid,
                area_id: $scope.area_id,
                people_count: people_count,
                table_name: table_name

            }
        })
            .success(function (data, status) {
                if (data.CODE == '1000') {
                    show_alert_box('提示', '保存成功');
                    $scope.table_name = "";
                    $scope.people_count = "";
                    $scope.selectOnePageTable();
                } else {
                    show_alert_box('提示', data.MESSAGE);
                }

            })
            .error(function (data, status) {
                alert(data);
            });
    }
    //加载分区
    $scope.init_area = function () {
        $http({
            method: "POST",
            url: base_url + "/tableservice/getArea",
            data: {
                shop_id: shopid
            }
        })
            .success(function (data, status) {
                console.log(angular.fromJson(data));
                if (data.CODE == '1000') {
                    $scope.area_list = data.DATA;
                }else if(data.CODE=='1001'){

                }else {
                    show_alert_box('提示', data.MESSAGE);
                }

            })
            .error(function (data, status) {
                alert(data);
            });
    }

    $scope.init_area();


    //查询一页桌台列表
    $scope.selectOnePageTable = function(){
        $http({
            method: "POST",
            url: base_url + "/tableservice/selectTableByPage",
            data: {
                shop_id: shopid,
                page_no:$scope.currentPage
            }
        })
            .success(function (data, status) {
                if (data.CODE == '1000') {
                    console.log(data.DATA);
                    $scope.table_list = data.DATA;
                    $scope.totalItems = data.totalnum;
                    $scope.currentPage = data.page_no;
                }else if(data.CODE=='1001'){

                }else {
                    show_alert_box('提示', data.MESSAGE);
                }

            })
            .error(function (data, status) {
                alert(data);
            });
    }
    $scope.selectOnePageTable();

    /**
     * 删除桌台
     * @param table_id
     */
    $scope.deleteTable = function(table_id){
        if(confirm("确定删除桌台，将此桌台订单一并删除，是否确定？")){
            $http({
                method: "POST",
                url: base_url + "/tableservice/deleteTable",
                data: {
                    table_id: table_id
                }
            })
                .success(function (data, status) {
                    if (data.CODE == '1000') {
                        $scope.selectOnePageTable();
                    }else if(data.CODE=='1001'){

                    }else {
                        show_alert_box('提示', data.MESSAGE);
                    }

                })
                .error(function (data, status) {
                    alert(data);
                });
        }

    }

});


app.controller("qrCodeController", function ($scope, $http) {
    /**
     * 查询桌台信息
     */
    $scope.list_table = function () {
        $http({
            method: "GET",
            url: base_url + "/shop/getShopInfo/"+shopid,
            data: null

        })
            .success(function (data, status) {
                if (data.CODE == '1000') {
                    $scope.shop = data.DATA;
                }else if (data.CODE == '1003') {
                    show_alert_box('提示', data.MESSAGE);
                    $window.location.href = "/";
                } else {
                    show_alert_box('提示', data.MESSAGE);
                }

            })
            .error(function (data, status) {
                show_alert_box('提示', '数据加载异常' + data);
            });
    }
    $scope.list_table();


});