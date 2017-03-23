/**
 * Created by Administrator on 2017/3/21.
 */
$(function () {
    $.ajax({
        url:'http://mmb.ittun.com/api/getsitenav',
        dataType:'json',
        type:'get',
        success: function (data) {
            console.log(data);
            var html=template('listTemplate',data);
            $('.linkList ul').html(html);
        }
    })
})