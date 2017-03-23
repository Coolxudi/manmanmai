/**
 * Created by Administrator on 2017/3/21.
 */
$(function () {
    $.ajax({
        type:'get',
        dataType:'json',
        url:'http://mmb.ittun.com/api/getbrandtitle',
        success: function (data) {
            console.log(data);
            var html=template('titleTemplate',data);
            $('.panel-group').html(html);

            $('.panel-group').children().on('click', function () {
                var index=$(this).index();
                var brandName=data.result[index]['brandTitle'];
                brandName=brandName.slice(0,brandName.length-4);
                sessionStorage.setItem('brandName',brandName);
            })
        }
    })


})