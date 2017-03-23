/**
 * Created by Administrator on 2017/3/16.
 */
$(function () {
    var search=location.search;
    console.log(search);
    var id=/\d+/.exec(search)[0];
    id=parseInt(id);
    console.log(id);
    var category=localStorage.getItem('categoryid');

    $.ajax({
        url:'http://mmb.ittun.com/api/getproduct',
        data:{
            productid:id,
        },
        type:'get',
        dataType:'json',
        success: function (data) {
            console.log(data);
            var productName=data.result[0]['productName'].split(' ')[0];
            $('nav .f12').html(productName);
            //$('.price').html(data.result[0]['bjShop']);
            var html=template('infoTemplate',data);
            $('#content').html(html);
        }
    })


    $.ajax({
        url:'http://mmb.ittun.com/api/getcategorybyid',
        data:{
            categoryid:category,
        },
        type:'get',
        dataType:'json',
        success: function (data) {
            console.log(data);
            $('nav .nav11').html(data.result[0]['category']);
            $('nav .nav11').attr('href','prolist.html?id='+category)
        }
    })



    $.ajax({
        url:'http://mmb.ittun.com/api/getproductcom',
        data:{
            productid:id,
        },
        type:'get',
        dataType:'json',
        success: function (data) {
            //console.log(data);
            var html=template('commentTemplate',data);
            $('.commentlist').html(html);
        }
    })
})