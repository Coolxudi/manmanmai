/**
 * Created by Administrator on 2017/3/18.
 */
$(function () {
    $.ajax({
        url:'http://mmb.ittun.com/api/getinlanddiscount',
        dataType:'json',
        type:'get',
        success: function (data) {
            console.log(data);
            var html=template('listTemplate',data);
            $('.list ul').html(html);
        }
    })
})