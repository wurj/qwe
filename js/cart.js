$(function () {
    // 初始化区域滚动
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        indicators: false, //是否显示滚动条，默认为True
    });
    // 获取数据生成动态结构
    $.ajax({
        type: 'get',
        url: 'my/cart/all',
        dataType: 'json',
        success(res) {
            // console.log(res)
            // console.log(JSON.parse(res.data.cart_info))
            if (res.meta.status == 401) {
                location.href = "./login.html"
            } else {
                var html = template('orderTemp', {
                    list: JSON.parse(res.data.cart_info)
                })
                $('.order_list').html(html)
                // 重新对number-box进行初始化，否则不能使用
                mui('.goods_num').numbox()
                //计算总价
                calculatePrice()
            }
        }
    })


    // 单击编辑 
    $('.pyg-orderEdit').on('tap', function () {
        $('body').toggleClass('eleToggle')
        if ($(this).text() == '编辑') {
            // console.log(1)
            $(this).text('完成')
        } else {
            $(this).text('编辑')
            var allList = $('.order_single')
            // console.log(allList)
            syncCart(allList)

        }
    })

    //单击删除
    $('.pyg_orderDel').on('tap',function(){
        var allList = $('[type="checkbox"]:checked').parent().parent()
        // console.log(allList)
        for (var i = 0; i < allList.length; i++) {
                    $(allList[i]).remove()
                }
                calculatePrice()
    })


    // $('.pyg_orderDel').on('tap', function () {
    //     var allList = $('.order_single').not('[data-check="1"]')
    //     // console.log(allList)
    //     syncCart(allList)
    //     var allList2 = $('.order_single[data-check="1"]')
    //     for (var i = 0; i < allList2.length; i++) {
    //         $(allList2[i]).remove()
    //     }
    //     calculatePrice()
    // })

    // $('.order_list').on('tap', '.mui-checkbox', function () {
    //     // console.log($(this).parent().data('check'))
    //     if ($(this).parent().data('check') == "0") {
    //         $(this).parent().attr('data-check', 1)
    //     } else {
    //         $(this).parent().attr('data-check', 0)
    //     }

    // })




    //同步购物车
    function syncCart(allList) {
        var obj = {}
        allList.each(function (index, value) {
            // console.log($(value).data('info'))
            // console.log(value.dataset.info)
            var data = $(value).data('info')
            data.amount = $(value).find('.test').val()
            obj[data.goods_id] = data
        })
        // console.log(obj)
        // console.log(1)
        $.ajax({
            type: 'post',
            url: 'my/cart/sync',
            dataType: 'json',
            data: {
                'infos': JSON.stringify(obj)
            },
            success: function (res) {
                console.log(res)
            }
        })
    }

    //计算总价
    function calculatePrice() {
        // 获取所有商品列表
        var total = 0
        var arr = $('.order_single')
        arr.each(function (index, value) {
            var price = $(value).data('info').goods_price
            var num = $(value).find('.test').val()
            total += price * num
        })
        $('.totol_price').text(total)
    }
    // 单击修改数量重新计算价格
    $('.order_list').on('tap', '.goods_num button', function () {
        // console.log(1)
        calculatePrice()
        var allList = $('.order_single')
        // console.log(allList)
        syncCart(allList)
    })


    //三级联动
    var picker = new mui.PopPicker({
        layer: 3
    });
    picker.setData(data)
    $('.selectAddress').on('tap',function(){
        picker.show(function(items){
            console.log(items)
            $('.userAddress').text(items[0].text+"-"+items[1].text+"-"+items[2].text)
        })
    })
})