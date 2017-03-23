/**
 * Created by Administrator on 2017/3/18.
 */

$(function () {
    var search=location.search;
    console.log(search);
    var id=/\d+/.exec(search)[0];
    id=parseInt(id);
    $.ajax({
        url:'http://mmb.ittun.com/api/getdiscountproduct',
        type:'get',
        dataType:'json',
        data:{
            productid:id
        },
        success: function (data) {
            console.log(data);
            console.log(data.result[0]['productComment']);
            $('#comm').html(data.result[0]['productComment'])
            var html=template('conTemplate',data);
            $('#con').html(html);
        }
    })
})