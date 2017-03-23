$(function () {
    $.ajax({
        type:'get',
        dataType:'json',
        url:'http://mmb.ittun.com/api/getcategorytitle',
        success: function (data) {
            console.log(data);
            var html=template('titleTemplate',data);
            $('.panel-group').html(html);

            $('.panel-title a').on('click', function () {
                var index=$('.panel-title a').index(this);
                var str1=$('.panel-body').eq(index).children().html();
                if(str1){
                    return;
                }


                //var that=this;
                //$.each($('.panel-collapse'), function (i,v) {
                //
                //    var attr=v.getAttribute('ariaExpanded');
                //    //console.log($(v));
                //    //console.log(attr);
                //    if(attr==='true'){
                //        $(that).addClass('change');
                //    }
                //})

                var titleid=$(this).attr('titleid');
                console.log(titleid);


                $.ajax({
                    type:'get',
                    dataType:'json',
                    url:'http://mmb.ittun.com/api/getcategory',
                    data:{
                        titleid:titleid,
                    },
                    success: function (data1) {
                        //data1.result
                        console.log(data1);

                        var str='<table><tbody><tr>';
                        for(var i=0;i<data1.result.length;i++){
                            str+='<td><a href="prolist.html?id='+data1.result[i]['categoryId']+'">'+data1.result[i]['category']+'</a></td>';
                        }
                        str+='</tr></tbody></table>';
                        //console.log(str);
                        $('.panel-body').eq(index).html(str);
                    }
                })
            })
        }
    })


})