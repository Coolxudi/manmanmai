/**
 * Created by Administrator on 2017/3/18.
 */
$(function () {
    var pageid=1;
    var pagesize;
    $.ajax({
        url:'http://mmb.ittun.com/api/getmoneyctrl',
        data:{
            pageid:pageid,
        },
        dataType:'json',
        type:'get',
        success: function (data) {
            console.log(data);
            pagesize=Math.ceil(data.totalCount/data.pagesize)
            var html=template('listTemplate',data)
            $('.container ul').html(html);
        }
    })

    $('.page .btn1').on('click', function () {
        if(pageid<=1){
            alert('已经是第一页了')
            return;
        }
        pageid--;
        $.ajax({
            url:'http://mmb.ittun.com/api/getmoneyctrl',
            data:{
                pageid:pageid,
            },
            dataType:'json',
            type:'get',
            success: function (data) {
                console.log(data);
                var html=template('listTemplate',data)
                $('.container ul').html(html);
            }
        })
    })

    $('.page .btn2').on('click', function () {
        if(pageid>=pagesize){
            alert('已经是最后一页了')
            return;
        }
        pageid++;
        $.ajax({
            url:'http://mmb.ittun.com/api/getmoneyctrl',
            data:{
                pageid:pageid,
            },
            dataType:'json',
            type:'get',
            success: function (data) {
                console.log(data);
                var html=template('listTemplate',data)
                $('.container ul').html(html);
            }
        })
    })
})