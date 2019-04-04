$(function(){
    //mui 频闭掉了click事件，所以给a重新绑定事件
    mui('body').on('tap', 'a', function (e) {
        e.preventDefault()
        window.top.location.href = this.href;
    });


    const baseURL = 'http://157.122.54.189:9094/api/public/v1/'
    $.ajaxSettings.beforeSend = function(xhr,obj){
        // console.log(obj)
        // console.log(xhr)
        obj.url = baseURL + obj.url
    }
})