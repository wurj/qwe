$(function(){
    //mui 频闭掉了click事件，所以给a重新绑定事件
    mui('body').on('tap', 'a', function (e) {
        e.preventDefault()
        window.top.location.href = this.href;
    });


    // const baseURL = 'http://157.122.54.189:9094/api/public/v1/'
    const baseURL = 'http://140.143.222.79:8899/api/public/v1/'
    $.ajaxSettings.beforeSend = function(xhr,obj){
        $('body').addClass('loadding')
        // console.log(xhr)
        obj.url = baseURL + obj.url
        if (obj.url.indexOf('/my/') != -1) {
            xhr.setRequestHeader('Authorization',sessionStorage.getItem('pyg_token'))
        }
    }
    $.ajaxSettings.complete = function(){
        $('body').removeClass('loadding')
    }


    $.extend($,{getParameter:function (url) {
        var obj = {}
        url = url.slice(1)
        var arr = url.split('&')
        for (var i = 0; i < arr.length; i++) {
            var temp = arr[i].split('=')
            obj[temp[0]] = temp[1]
        }
        return obj
    }})

    // $('.toCart').on('tap',function(){
    //     console.log(1)
    //     // $.targets.action = false
    // })
    // console.log(1)
})