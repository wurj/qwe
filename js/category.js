$(function () {
    

    var dataList
    render()


    function render() {
        dataList = JSON.parse(sessionStorage.getItem('dataList'))
        if (dataList && Date.now() - dataList.time < 24 * 60 * 60 * 1000) {
            getCate1()
            getCate2(0)
        } else {
            getCateList()
        }
    }

    function getCateList() {
        $.get('categories', function (res) {
            console.log(res)
            if (res.meta.status == 200) {
                dataList = {
                    data: res.data,
                    time: Date.now()
                }
                sessionStorage.setItem('dataList', JSON.stringify(dataList))
                // getCate1()
                render()
            }
        }, 'json')
    }

    function getCate1() {
        var html = template('cate1Temp',dataList)
        $('.cate1').html(html)
        var myScroll = new IScroll('.left');
        $('.left').on('tap', 'li', function () {
            $(this).addClass('active').siblings().removeClass('active')
            myScroll.scrollToElement(this)
            var index = $(this).index()
            getCate2(index)
        })
    }
    function getCate2 (index){
        // console.log(dataList.data[0])
        var html = template('cate2Temp',dataList.data[index])
        // console.log(html)
        $('.right_list').html(html)
        var imgCount = $('.right img').size()
        // console.log(imgCount)
        $('.right img').on('load',function(){
            imgCount--
            if (imgCount == 0){
            var myScroll = new IScroll('.right');
            }
        })
    }
})