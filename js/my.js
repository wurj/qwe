$(function () {
    //判断是否要登陆
    // 1.判断是否有token，如果没有，则重定向到登陆页面
        // 约定使用sessionStorage存储
        var mytoken = sessionStorage.getItem('pyg_token')
        if (!mytoken) {
            window.location.href = './login.html?redirectUrl=' + escape(location.href)

        }
        // 2.如果有token,那么就发送请求
        else {
            $.ajax({
                type: 'get',
                url: 'my/users/userinfo',
                dataType: 'json',
                success: function (res) {
                    console.log(res)
                    // 3.接收返回结果，如果是token过期，则重新登陆--重定向到登陆页
                    if (res.meta.status == 401) {
                        // console.log(1)
                        mui.toast('登陆过期，请重新登陆')
                        window.location.href = './login.html?redirectUrl=' + escape(location.href)
                    } else if (res.meta.status == 200){
                        $('.username').text(res.data.username)
                        $('.user_email').text(res.data.user_email)
                    }
                }
            })
        }


    //推出按钮
    $('#btn_login_out').on('tap', function () {
        mui.confirm('你确定要退出吗？', '提示', ['退出', '取消'], function (e) {
            if (e.index == 0) {
                sessionStorage.removeItem('pyg_token')
                location.href = './cart.html'
            } else {}
        })
    })
})