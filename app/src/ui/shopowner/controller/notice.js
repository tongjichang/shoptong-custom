/**
 * Created by jacktong on 2017/9/12.
 */

var es = new EventSource(base_url+'/notice/shopNotice/'+shopid);
es.addEventListener('serviceNotice', function(e) {
    console.log(e.data);
    var obj = eval('(' + e.data + ')');
    //alert(obj.service_content);
    NotificationHandler.showNotification(obj.service_content);
});

var NotificationHandler = {
    isNotificationSupported : 'Notification' in window,
    isPermissionGranted : function() {
        return Notification.permission === 'granted';
    },
    requestPermission : function() {
        //验证浏览器是否支持Notification，如果不支持打印提示信息并返回
        if (!this.isNotificationSupported) {
            console.log('当前浏览器不支持Notification API');
            return;
        }
        //该方法将会询问用户是否允许显示通知,不能由页面调用(onload)，必须由用户主动事件触发(onclick等)
        //当用户同意之后，再次调用该方法则无效，即该方法仅对Notification.Permission不为'granted'的时候起作用
        Notification.requestPermission(function(status) {
            //status是授权状态，如果用户允许显示桌面通知，则status为'granted'
            console.log('status: ' + status);
            //permission只读属性:
            //  default 用户没有接收或拒绝授权 不能显示通知
            //  granted 用户接受授权 允许显示通知
            //  denied  用户拒绝授权 不允许显示通知
            var permission = Notification.permission;
            console.log('permission: ' + permission);
        });
    },
    showNotification : function(content) {
        if (!this.isNotificationSupported) {
            console.log('当前浏览器不支持Notification API');
            return;
        }
        if (!this.isPermissionGranted()) {
            Notification.requestPermission();
            console.log('当前页面未被授权使用Notification通知');
            return;
        }

        var n = new Notification("您有一条新消息", {
            icon : 'cat.jpg',
            body : content
        });

        //onshow函数在消息框显示时会被调用
        //可以做一些数据记录及定时操作等
        n.onshow = function() {
            console.log('显示通知信息');
            //5秒后自动关闭消息框
            setTimeout(function() {
                n.close();
            }, 5000);
        };

        //消息框被点击时被调用
        //可以打开相关的视图，同时关闭该消息框等操作
        n.onclick = function() {
            alert('打开相关视图');
            //opening the view...
            n.close();
        };

        //当有错误发生时会onerror函数会被调用
        //如果没有granted授权，创建Notification对象实例时，也会执行onerror函数
        n.onerror = function() {
            console.log('产生错误');
            //do something useful
        };

        //一个消息框关闭时onclose函数会被调用
        n.onclose = function() {
            console.log('关闭通知窗口');
            //do something useful
        };
    }
};


