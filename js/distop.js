/**
 * Created by Administrator on 2017/3/21.
 */
$(function () {
    var search=location.search;
    var id=/\d+/.exec(search)[0];
    $.ajax({
        url:'http://mmb.ittun.com/api/getbrand',
        data:{
            brandtitleid:id,
        },
        dataType:'json',
        type:'get',
        success: function (data) {
            console.log(data);
            var html=template('titTemplate',data);
            $('.model .sortlist ul').html(html);
            var brandName=sessionStorage.getItem('brandName');
            $('nav span').html(brandName);
            $('.model .title span').html(brandName);
        }
    })



    $.ajax({
        url:'http://mmb.ittun.com/api/getbrandproductlist',
        data:{
            brandtitleid:id,
            pagesize:4
        },
        dataType:'json',
        type:'get',
        success: function (data) {
            console.log(data);
            var html=template('saleTemplate',data);
            $('.model .salelist ul').html(html);
            var productid=data.result[0]['productId'];
            $('.protit .pic').html(data.result[0]['productImg']);

            $.ajax({
                url:'http://mmb.ittun.com/api/getproductcom',
                data:{
                    productid:productid,
                },
                dataType:'json',
                type:'get',
                success: function (data) {
                    console.log(data);
                    var html=template('commentTemplate',data);
                    $('.model .commentlist ul').html(html);
                }
            })
        }
    })



})