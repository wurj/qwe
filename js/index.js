$(function () {
    banner()
    goodsList()
})

function banner() {
    $.ajax({
        type: 'get',
        url: 'home/swiperdata',
        dataType: 'json',
        success: function (res) {
            // console.log(res)
            if (res.meta.status == 200) {
                var html = template('bannerTemp', res)
                // console.log(html)
                $('.pyg_banner .mui-slider-group').html(html)
                //获得slider插件对象
                var gallery = mui('.mui-slider');
                gallery.slider({
                    interval: 1000 //自动轮播周期，若为0则不自动播放，默认为0；
                });
                var indiHtml = template('indicatorTemp',res)
                $('.pyg_banner .mui-slider-indicator').html(indiHtml)
            }
        }

        // ,beforeSend:function(xhr, settings){
            
        // }
    })
}
function goodsList(){
    $.ajax({
        type:'get',
        url:'home/goodslist',
        dataType:'json',
        success:function(res){
            // console.log(res)
            if (res.meta.status == 200) {
                var html = template('goodsTemp',res)
                $('.pyg_goodsList').html(html)
            }
        }
    })
}