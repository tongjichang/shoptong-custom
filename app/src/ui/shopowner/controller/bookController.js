'use strict';


/**
 * 新增桌台
 */


app.controller('addBookController', function ($scope, $http,$window,$log,$ocLazyLoad,$location) {
/*
    $ocLazyLoad.load([

        '/admin-template/js/bootstrap-timepicker/css/timepicker.css',
        '/admin-template/js/bootstrap-datetimepicker/css/datetimepicker-custom.css',
        '/admin-template/js/bootstrap-datetimepicker/js/bootstrap-datetimepicker.js',
        '/admin-template/js/bootstrap-timepicker/js/bootstrap-timepicker.js',
        '/admin-template/js/bootstrap-colorpicker/js/bootstrap-colorpicker.js',
        '/admin-template/js/pickers-init.js'

    ]);
*/
    //$tempalteCache.removeAll();


    $scope.type = {
        '10点' : "10",
        '11点' : "11",
        '12点' : "12",
        '13点' : "13",
        '14点' : "14",
        '15点' : "15",
        '16点' : "16",
        '17点' : "17",
        '19点' : "19",
        '20点' : "20",
        '21点' : "21",
        '22点' : "22",
        '23点' : "23",
        '24点' : "24"
    };
    $scope.save_btn_click = function () {
        var area_id = $scope.area_id;
        var table_id = $scope.table_id;
        var name = $scope.name;
        var phone = $scope.phone;
        var people_num = $scope.people_num;
        var use_time = $("#use_time").val();//$scope.use_time;
        var pre_fee = $scope.pre_fee;
        var remark = $scope.remark;
        if(area_id==undefined||area_id==""){
            show_alert_box('提示','请选择分区名称');
            return;
        }
        if(table_id==undefined||table_id==""){
            show_alert_box('提示','请选择桌台名称');
            return;
        }
        if(name==undefined||name==""){
            show_alert_box('提示','请输入姓名');
            return;
        }
        if(phone==undefined||phone==""){
            show_alert_box('提示','请输入手机号');
            return;
        }
        if(people_num==undefined||people_num==""){
            show_alert_box('提示','请输入就餐人数');
            return;
        }
        if(use_time==undefined||use_time==""||use_time==null){
            show_alert_box('提示','请选择就餐时间点');
            return;
        }
        $http({
            method: "POST",
            url: base_url + "/book/addBook",
            data: {
                shop_id: shopid,
                area_id: area_id,
                table_id: table_id,
                name: name,
                phone: phone,
                people_num: people_num,
                use_time: use_time,
                pre_fee: pre_fee,
                remark:remark
            }

            }).success(function (data, status) {
                console.log(angular.fromJson(data));
                if (data.CODE == '1000') {
                    show_alert_box('提示', '保存成功');
                    $window.location.href = "#addBook";
                    $scope.table_name = "";
                    $scope.people_count = "";
                } else {
                    show_alert_box('提示', data.MESSAGE);
                }

            }).error(function (data, status) {
                alert(data);
            });
    }
    //加载分区
    $scope.init_area = function () {
        $http({
            method: "POST",
            url: base_url + "/book/getArea",
            data: {
                shop_id: shopid
            }
        })
            .success(function (data, status) {
                console.log(angular.fromJson(data));
                if (data.CODE == '1000') {
                    $scope.area_list = data.DATA;
                    $scope.table_list = [];
                } else if(data.CODE=='1001'){

                } else {
                    show_alert_box('提示', data.MESSAGE);
                }

            })
            .error(function (data, status) {
                //alert("1");
            });
    }
    //加载分区
    $scope.getTable = function () {
        var area_id = $scope.area_id;
        $http({
            method: "POST",
            url: base_url + "/book/getTable",
            data: {
                shop_id: shopid,
                area_id:area_id
            }
        })
            .success(function (data, status) {
                console.log(angular.fromJson(data));
                if (data.CODE == '1000') {
                    $scope.table_list = data.DATA;
                } else {
                    show_alert_box('提示', data.MESSAGE);
                }

            })
            .error(function (data, status) {
                alert("2");
            });
    }

    $scope.init_area();
    $scope.maxSize = 5;
    $scope.totalItems = 10;
    $scope.currentPage = 1;
    $scope.prePage = 10;
    $scope.name = "";
    /**
     * 查询
     */
    $scope.select_books = function(){
        $http({
            method:"POST",
            url:base_url+"/book/selectbooks",
            data:{
                shop_id:shopid,
                name:$scope.name,
                page_no:$scope.currentPage
            }
        })
            .success(function (data,status) {
                if(data.CODE=='1000'){
                    $log.debug('返回信息', data.DATA);
                    $scope.books_list = data.DATA;
                    $scope.totalItems = data.totalnum;
                    $scope.currentPage = data.page_no;
                }else{
                    show_alert_box('提示',data.MESSAGE);
                }

            })
            .error(function (data,status) {
                //alert("3");
            });
    }
    $scope.select_books();
    /**
     * 删除商品
     * @param goods_id
     */
    $scope.delete_book = function(book_id){
        if(confirm('确定删除此商品？')){
            $http({
                method:"POST",
                url:base_url+"/book/deleteBook",
                data:{
                    book_id:book_id
                }
            })
                .success(function (data,status) {
                    console.log(angular.fromJson(data));
                    if(data.CODE=='1000'){
                        show_alert_box('提示','删除成功');
                        $scope.select_books();
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
    $scope.change_status = function(book_id,status){
        $http({
            method:"POST",
            url:base_url+"/book/changuserStatus",
            data:{
                book_id:book_id,
                status:status

            }
        }).success(function (data,status) {
            if(data.CODE=='1000'){
                show_alert_box('提示','成功');
                $scope.select_books();
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

    $scope.modify_book = function(book_id){
        $window.location.href = "#updateBook/"+book_id;
    }



});

app.controller('updateBookController', function ($scope, $http,$window,$log,$ocLazyLoad,$location,$routeParams) {
/**
    $ocLazyLoad.load([

        '/admin-template/js/bootstrap-timepicker/css/timepicker.css',
        '/admin-template/js/bootstrap-datetimepicker/css/datetimepicker-custom.css',
        '/admin-template/js/bootstrap-datetimepicker/js/bootstrap-datetimepicker.js',
        '/admin-template/js/bootstrap-timepicker/js/bootstrap-timepicker.js',
        '/admin-template/js/bootstrap-colorpicker/js/bootstrap-colorpicker.js',
        '/admin-template/js/pickers-init.js'

    ]);
**/
    var book_id = $routeParams.book_id;
    $scope.selectOneBookInfo = function(){
        $http({
            method:"POST",
            url:base_url+"/book/getOneBookInfo",
            data:{
                book_id:book_id
            }
        })
            .success(function (data,status) {
                if(data.CODE=='1000'){
                    $scope.book_id = data.DATA.book_id;
                    $scope.name = data.DATA.name;
                    $scope.phone = data.DATA.phone;
                    $scope.people_num = data.DATA.people_num;
                    $scope.use_time = data.DATA.use_time;
                    $scope.pre_fee = data.DATA.pre_fee;
                    $scope.remark = data.DATA.remark;
                    $scope.table_id = data.DATA.table_id;
                    $scope.area_id = data.AREA_ID;
                    $scope.getTable();
                }else{
                    show_alert_box('提示',data.MESSAGE);
                }

            })
            .error(function (data,status) {
                alert(data);
            });
    }
    $scope.selectOneBookInfo();

    //加载分区
    $scope.init_area = function () {
        $http({
            method: "POST",
            url: base_url + "/book/getArea",
            data: {
                shop_id: shopid
            }
        })
            .success(function (data, status) {
                console.log(angular.fromJson(data));
                if (data.CODE == '1000') {
                    $scope.area_list = data.DATA;
                    $scope.table_list = [];
                } else {
                    show_alert_box('提示', data.MESSAGE);
                }

            })
            .error(function (data, status) {
                alert(data);
            });
    }
    //加载分区
    $scope.getTable = function () {
        var area_id = $scope.area_id;
        if(area_id==""){
            return;
        }
        $http({
            method: "POST",
            url: base_url + "/book/getTable",
            data: {
                shop_id: shopid,
                area_id:area_id
            }
        })
            .success(function (data, status) {
                console.log(angular.fromJson(data));
                if (data.CODE == '1000') {
                    $scope.table_list = data.DATA;
                } else {
                    show_alert_box('提示', data.MESSAGE);
                }

            })
            .error(function (data, status) {
                alert(data);
            });
    }
    $scope.init_area();


    $scope.update_btn_click = function () {
        var area_id = $scope.area_id;
        var table_id = $scope.table_id;
        var name = $scope.name;
        var phone = $scope.phone;
        var people_num = $scope.people_num;
        var use_time = $("#use_time").val();//$scope.use_time;
        var pre_fee = $scope.pre_fee;
        var remark = $scope.remark;
        if(area_id==undefined||area_id==""){
            show_alert_box('提示','请选择分区名称');
            return;
        }
        if(table_id==undefined||table_id==""){
            show_alert_box('提示','请选择桌台名称');
            return;
        }
        if(name==undefined||name==""){
            show_alert_box('提示','请输入姓名');
            return;
        }
        if(phone==undefined||phone==""){
            show_alert_box('提示','请输入手机号');
            return;
        }
        if(people_num==undefined||people_num==""){
            show_alert_box('提示','请输入就餐人数');
            return;
        }
        if(use_time==undefined||use_time==""||use_time==null){
            show_alert_box('提示','请选择就餐时间点');
            return;
        }
        $http({
            method: "POST",
            url: base_url + "/book/updateBookInfo",
            data: {
                book_id:$scope.book_id,
                shop_id: shopid,
                area_id: area_id,
                table_id: table_id,
                name: name,
                phone: phone,
                people_num: people_num,
                use_time: use_time,
                pre_fee: pre_fee,
                remark:remark
            }

        }).success(function (data, status) {
            console.log(angular.fromJson(data));
            if (data.CODE == '1000') {
                show_alert_box('提示', '保存成功');
                $window.location.href = "#booklist";
            } else {
                show_alert_box('提示', data.MESSAGE);
            }

        }).error(function (data, status) {
            alert(data);
        });
    }
});
