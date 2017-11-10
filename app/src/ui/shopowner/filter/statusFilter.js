/**
 * Created by jacktong on 2017/8/4.
 */

app.filter('user_status',function(){
    return function(status){
        var status_name = "";
        if(status=="1"){
            status_name = "正常";
        }
        if(status=="2"){
            status_name = "冻结";
        }
        return status_name;
    }
});
app.filter('type_status',function(){
    return function(status){
        var status_name = "";
        if(status=="1"){
            status_name = "商铺";
        }
        if(status=="2"){
            status_name = "服务员";
        }
        if(status=="3"){
            status_name = "管理员";
        }
        return status_name;
    }
});
app.filter('waiter_status',function(){
    return function(status){
        var status_name = "";
        if(status=="2"){
            status_name = "服务员";
        }
        if(status=="4"){
            status_name = "店长";
        }
        return status_name;
    }
});
app.filter('type_print',function(){
    return function(status){
        var status_name = "";
        if(status=="1"){
            status_name = "后厨";
        }
        if(status=="2"){
            status_name = "结账";
        }
        return status_name;
    }
});
app.filter('rysj',function(){
    return function(status){
        var status_name = "";
        if(status=="4"){
            status_name = "4点";
        }
        if(status=="5"){
            status_name = "5点";
        }
        if(status=="6"){
            status_name = "6点";
        }
        if(status=="7"){
            status_name = "7点";
        }
        if(status=="8"){
            status_name = "8点";
        }
        if(status=="9"){
            status_name = "9点";
        }
        if(status=="10"){
            status_name = "10点";
        }
        if(status=="11"){
            status_name = "11点";
        }
        if(status=="12"){
            status_name = "12点";
        }
        return status_name;
    }
});
app.filter('yysj',function(){
    return function(status){
        var status_name = "";
        if(status=="10"){
            status_name = "10点";
        }
        if(status=="11"){
            status_name = "11点";
        }
        if(status=="12"){
            status_name = "12点";
        }
        if(status=="13"){
            status_name = "13点";
        }
        if(status=="14"){
            status_name = "14点";
        }
        if(status=="15"){
            status_name = "15点";
        }
        if(status=="16"){
            status_name = "16点";
        }
        if(status=="17"){
            status_name = "17点";
        }
        if(status=="18"){
            status_name = "18点";
        }
        if(status=="19"){
            status_name = "19点";
        }
        if(status=="20"){
            status_name = "20点";
        }
        if(status=="21"){
            status_name = "21点";
        }
        if(status=="22"){
            status_name = "22点";
        }
        if(status=="23"){
            status_name = "23点";
        }
        if(status=="24"){
            status_name = "24点";
        }
        return status_name;
    }
});
app.filter('bookstatuse',function(){
    return function(status){
        var status_name = "";
        if(status=="1"){
            status_name = "正常";
        }
        if(status=="2"){
            status_name = "取消";
        }
        if(status=="3"){
            status_name = "到期";
        }
        return status_name;
    }
});
app.filter('if_print',function(){
    return function(status){
        var if_print = "";
        if(status=="0"){
            if_print = "否";
        }
        if(status=="1"){
            if_print = "是";
        }
        return if_print;
    }
});
app.filter('tuijian',function(){
    return function(status){
        var tuijian = "";

        if(status=="1"){
            tuijian = "是";
        }else{
            tuijian = "否";
        }
        return tuijian;
    }
});
app.filter('table_status',function(){
    return function(status){
        var table_status = "";

        if(status==0){
            table_status = "未使用";
        }else if(status==1){
            table_status = "使用中";
        }else if(status==2){
            table_status = "预定";
        }else if(status==3){
            table_status = "服务员占用";
        }else{
            table_status = "其他";
        }
        return table_status;
    }
});


