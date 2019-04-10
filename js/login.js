$(function () {
    // mui('.mui-input-row input').input(); 

    $('#login_btn').on('tap', function () {
        var obj = {}
        obj.username = $('.username').val()
        obj.password = $('.password').val()

        // 2.进行相应的验证
        if (!/^1[3-9]\d{9}$/.test(obj.username)) {
            mui.toast('手机号码输入不正确')
            return false;
        }
        if (obj.password.length < 6) {
            mui.toast('密码长度小于6位')
            return false;
        }

        $.ajax({
            type: 'post',
            url: 'login',
            data: obj,
            dataType: 'json',
            success: function (res) {
                console.log(res)
                if (res.meta.status == 200) {
                    sessionStorage.setItem('pyg_token',res.data.token);
                    var redirectUrl = $.getParameter(location.search).redirectUrl
                    // console.log(unescape(redirectUrl))
                    if (redirectUrl) {
                        location.href = unescape(redirectUrl)
                    } else {
                        location.href = '../index.html'
                    }
                } else{
                    mui.toast(res.meta.msg)
                }
            }
        })
    })


    $('.pyg_back').on('tap',function(){
        console.log(1)
        history.go(-2)
    })
    $('.pyg_register').on('tap',function(){
        location.href = './register.html'
    })
})