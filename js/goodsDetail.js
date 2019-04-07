$(function () {
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        indicators: false
    });
    var goodsInfo = {

    }

    $.ajax({
        type: 'get',
        url: 'goods/detail',
        data: $.getParameter(location.search),
        dataType: 'json',
        success: function (res) {
            // console.log(res)
            if (res.meta.status == 200) {
                var {cat_id,goods_id,goods_name,goods_number,goods_price,goods_small_logo,goods_weight} = res.data
                goodsInfo = {cat_id,goods_id,goods_name,goods_number,goods_price,goods_small_logo,goods_weight}
                // console.log(goodsInfo)

                var html = template('gdTemp', res.data)
                // console.log(html)
                $('.pyg_goodsDetailMain .mui-scroll').html(html)
                var gallery = mui('.mui-slider');
                gallery.slider({
                    interval: 5000 //自动轮播周期，若为0则不自动播放，默认为0；
                });
            }
        }
    })
    $('.btn-addCart').on('tap',function(){
        // console.log(location.href)
        // console.log(1)
        // window.location.href = './login.html'


        // 1.判断是否有token，如果没有，则重定向到登陆页面
        // 约定使用sessionStorage存储
        var mytoken = sessionStorage.getItem('pyg_token')
        if (!mytoken) {
            window.location.href = './login.html?redirectUrl=' + escape(location.href)

        } 
        // 2.如果有token,那么就发送请求
        else {
            $.ajax({
                type:'post',
                url:'my/cart/add',
                data : goodsInfo,
                dataType:'json',
                success:function(res) {
                    console.log(res)
                    // 3.接收返回结果，如果是token过期，则重新登陆--重定向到登陆页
                    if (res.meta.status == 401) {
                        // console.log(1)
                        window.location.href = './login.html?redirectUrl=' + escape(location.href)
                    } else {
                        console.log('ok')
                    }
                }
            })
        }

    })

})