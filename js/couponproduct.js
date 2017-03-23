/**
 * Created by Administrator on 2017/3/19.
 */
$(function () {
    var coupon=sessionStorage.getItem('coupon');
    console.log(coupon);
    $('.head h1').html(coupon+'优惠券');
    $('nav a:eq(2)').html(coupon+'优惠券');

    var search=location.search;
    var id=/\d+/.exec(search)[0];
    console.log(id);
    $.ajax({
        url:'http://mmb.ittun.com/api/getcouponproduct',
        data:{
            couponid:id,
        },
        dataType:'json',
        type:'get',
        success: function (data) {
            console.log(data);
            var html=template('listTemplate',data);
            $('.quan-box ul').html(html);


            $('.quan-box ul li').on('click', function () {
                $('.mask').toggle();
                $('.mask .pic').html($(this).find('.pic').html());
            })

            $('.mask').on('click', function () {
                $(this).toggle();
            })


            //window.onscroll= function () {
            //    var height=document.body.scrollTop;
            //
            //    $('.mask').css('top',height);
            //}
        }
    })
})