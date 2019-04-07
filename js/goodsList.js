$(function () {

    $('#header .mui-icon-search').on('tap', function () {
        mui('.mui-off-canvas-wrap').offCanvas('show');
    })
    var data = {
        cid: getParameter(location.search).cid,
        pagenum: 1,
        pagesize: 10
    }
    mui.init({
        pullRefresh: {
            container: "#refreshContainer", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down: {
                height: 50, //可选,默认50.触发下拉刷新拖动距离,
                auto: true, //可选,默认false.首次加载自动下拉刷新一次
                contentdown: "下拉可以刷新", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                contentover: "释放立即刷新", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                contentrefresh: "正在刷新...", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                callback: function () {
                    data.pagenum =1;
                    renderMainData(function (res) {
                        var html = template('goodsListTemp', res.data)
                        $('.leftList').html(html)
                        mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
                        mui('#refreshContainer').pullRefresh().refresh(true)
                    })
                    // this.endPulldownToRefresh();
                } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            },
            up: {
                height: 50, //可选.默认50.触发上拉加载拖动距离
                auto: false, //可选,默认false.自动上拉加载一次
                contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
                contentnomore: '没有更多数据了', //可选，请求完毕若没有更多数据时显示的提醒内容；
                callback: function () {
                    data.pagenum ++;
                    renderMainData(function (res) {
                        if (res.data.goods.length > 0) {
                            var html = template('goodsListTemp', res.data)
                            $('.leftList').append(html)
                            mui('#refreshContainer').pullRefresh().endPullupToRefresh();
                        } else {
                            mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
                        }
                    })
                } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        }
    });





    function renderMainData(callback,obj) {
        $.ajax({
            type: 'get',
            url: 'goods/search',
            dataType: 'json',
            data: $.extend(data,obj),
            success: function (res) {
                // console.log(res)
                if (res.meta.status == 200) {
                    // var html = template('goodsListTemp',res.data)
                    // $('.leftList').html(html)
                    // // console.log(html)
                    callback(res)
                }
            }

        })
    }
    // console.log(getParameter(location.search).cid)
    // console.log(location.search)

    // ?cid=5&name=jack
    function getParameter(url) {
        var obj = {}
        url = url.slice(1)
        var arr = url.split('&')
        for (var i = 0; i < arr.length; i++) {
            var temp = arr[i].split('=')
            obj[temp[0]] = temp[1]
        }
        return obj
    }

    $('.query_btn').on('tap',function(){
        var obj = {}
        obj.query = $('.query_txt').val()
        renderMainData(function(res){
            console.log(res)
            var html = template('searchListTemp',res.data)
            $('.searchList').html(html)
        },obj)
        
    })
})
