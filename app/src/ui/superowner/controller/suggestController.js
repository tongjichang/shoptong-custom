'use strict';

app.controller('suggestController', function ($scope, $http,$window,$log) {

    $scope.maxSize = 5;
    $scope.totalItems = 10;
    $scope.currentPage = 1;
    $scope.prePage = 10;

    $scope.select_suggest = function(){
        $http({
            method: "POST",
            url: base_url + "/super/selectSuggest",
            data: {
                page_no: $scope.currentPage

            }
        }).success(function (data, status) {
            if (data.CODE == '1000') {
                $log.debug('返回信息', data);
                $scope.suggets_list = data.DATA;
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

    $scope.select_suggest();


});