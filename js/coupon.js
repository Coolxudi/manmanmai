/**
 * Created by Administrator on 2017/3/19.
 */
$(function () {
    $.ajax({
        url:'http://mmb.ittun.com/api/getcoupon',
        dataType:'json',
        type:'get',
        success: function (data) {
            console.log(data);
            var html=template('couponTemplate',data);
            $('.quan-box .quan-model .bd ul').html(html);
            $('.quan-box .quan-model .bd ul li').on('click', function () {
                var index=$('.quan-box .quan-model .bd ul li').index($(this));
                //data.result[index]['couponTitle']
                sessionStorage.setItem('coupon',data.result[index]['couponTitle']);
            })
        }
    })
})