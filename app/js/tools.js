/**
 * 弹出提示框
 * @param title
 * @param content
 */
function show_alert_box(title,content){
    $("#alert_title").html("<h3>"+title+"</h3>");
    $("#alert_content").html("<p>"+content+"</p>");
    $('#myModal').modal('show');
}

/**
 * 弹出提示框，并回调
 * @param title
 * @param content
 * @param callback
 */
function show_alert_box_callback(title,content,callback){
    $("#alert_title").html("<h3>"+title+"</h3>");
    $("#alert_content").html("<p>"+content+"</p>");
    $('#myModal').modal('show');
    if(typeof callback == "function"){
        callback();
    }
}
/**
 * 手机端提示框--待完善
 * @param title
 * @param content
 */
function shop_alert_box_mobile(title,content){
    alert(content);
}
