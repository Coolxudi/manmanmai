/**
 * Created by Administrator on 2017/3/15.
 */
$(function () {
    $.ajax({
        type:'get',
        data:'',
        dataType:'json',
        url:'http://mmb.ittun.com/api/getindexmenu',
        success: function (data) {
            var html=template('navTemplate',data);
            $('nav').html(html);
            $('.one').css({
                display:'none'
            })
            $('.row .col-xs-3').eq(7).on('click', function () {
                $('nav .col-xs-3').slice(8,12).toggle();
            })
            var href=$('.row .col-xs-3').eq(8).find('a').attr('href');
            $('.row .col-xs-3').eq(8).find('a').attr('href',href+'#site=0&area=0')
        }
    })

    $.ajax({
        type:'get',
        dataType:'json',
        url:'http://mmb.ittun.com/api/getmoneyctrl',
        success: function (data) {
            console.log(data);
            //$.each(data.result,function (i, v) {
            //    v.productComCount=/\d+/.exec(v.productComCount)[0];
            //})
            var html=template('contentTemplate',data);
            $('#content').html(html);
            $('.two').css({
                display:'none'
            })
        }
    })


})