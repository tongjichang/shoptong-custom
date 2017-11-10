/**
 * Created by jacktong on 2017/8/29.
 */

'use strict';

app.controller('shopPrinterController',function($scope,$http){
    $scope.type = {
        后厨 : "1",
        结账 : "2"
    };
    $scope.type_print = '2';
    $scope.button = '新增';
    /**
     * 打印机列表
     */
    $scope.printerlist = function(){
        $http({
            method:"POST",
            url:base_url+"/printer/printerlist",
            data:{
                shop_id:shopid
            }
        })
            .success(function (data,status) {
                if(data.CODE=='1000'){
                    $scope.printer_list = data.DATA;
                }else{
                    show_alert_box('提示',data.MESSAGE);
                }

            })
            .error(function (data,status) {
                alert(data);
            });
    }
    $scope.printerlist();
    /**
     * 修改打印机
     */
    $scope.update_printer = function(id,printer_name,printer_no,type_print){
        $scope.id = id;
        $scope.printer_name = printer_name;
        $scope.printer_no = printer_no;
        $scope.type_print = type_print;
        $scope.button = '修改';
    }

    /**
     * 添加打印机
     */
    $scope.add_printer = function(){
        var id = $scope.id;
        var printer_name = $scope.printer_name;
        var printer_no = $scope.printer_no;
        var type_print = $scope.type_print;
        if(printer_name==undefined){
            alert("请输入打印机名称");
            return;
        }
        if(printer_no==undefined){
            alert("请输入打印机编号");
            return;
        }
        $http({
            method:"POST",
            url:base_url+"/printer/addprinter",
            data:{
                id:id,
                shop_id:shopid,
                printer_name:printer_name,
                type_print:type_print,
                printer_no:printer_no
            }
        })
            .success(function (data,status) {
                if(data.CODE=='1000'){
                    show_alert_box('提示','添加成功');
                    $scope.printerlist();
                }else{
                    show_alert_box('提示',data.MESSAGE);
                }

            })
            .error(function (data,status) {
                alert(data);
            });
        $scope.button = '新增';
        $scope.id = '0';
    }

    /**
     * 删除打印机
     * @param id
     */
    $scope.delete_printer = function(id){
        if(confirm('确认删除？')){
            $http({
                method:"POST",
                url:base_url+"/printer/deletePrinter",
                data:{
                    printer_id:id,
                    shop_id:shopid
                }
            })
                .success(function (data,status) {
                    if(data.CODE=='1000'){
                        $scope.printerlist();
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

/**
app.controller('goodsPrinterController',function($scope,$http,$ocLazyLoad){
    var load_file = [
        "/admin-template/js/jquery-multi-select/js/jquery.multi-select.js",
        "/admin-template/js/multi-select-init.js",
        "/admin-template/js/jquery-multi-select/js/jquery.quicksearch.js"
    ];
    $scope.load = function(){
        $ocLazyLoad.load(["/admin-template/js/jquery-multi-select/css/multi-select.css",{files:load_file,cache:false}]);
    }
    $scope.load();

});
 **/