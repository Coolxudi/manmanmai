/**
 * Created by Administrator on 2017/3/16.
 */
$(function () {

    sessionStorage.clear();
    var search=location.search;
    console.log(search);
    var id=/\d+/.exec(search)[0];
    id=parseInt(id);
    localStorage.setItem('categoryid',id);
    var pageid=1;
    var data1;
    var pagesize;
    $.ajax({
        url:'http://mmb.ittun.com/api/getproductlist',
        data:{
            categoryid:id,
            pageid:pageid
        },
        type:'get',
        dataType:'json',
        success: function (data) {
            data1=data;
            console.log(data);
            var html=template('contentTemplate',data);
            $('#content').html(html);

            sessionStorage.setItem(pageid+'',JSON.stringify(data));

            //翻页
            pagesize=Math.ceil(data['totalCount']/data['pagesize']);
            $('.pageset').html('1-'+pagesize);
            var str='';
            for(var i=0;i<pagesize;i++){
                str+='<li>'+(i+1)+'-'+pagesize+'</li>';
            }
            $('#pagelist').html(str);

            //点击隐藏显示ul
            $('.pageset').on('click', function () {
                $('#pagelist').toggle();
            })

            $('#pagelist li').on('click', function () {
                var html=$(this).html();
                $('#pagelist').hide();
                $('.pageset').html(html);

                pageid=html.split('-')[0].trim();
                if(!sessionStorage.getItem(pageid+'')){
                    $.ajax({
                        url:'http://mmb.ittun.com/api/getproductlist',
                        data:{
                            categoryid:id,
                            pageid:pageid
                        },
                        type:'get',
                        dataType:'json',
                        success: function (data) {
                            var html=template('contentTemplate',data);
                            $('#content').html(html);
                            sessionStorage.setItem(pageid+'',JSON.stringify(data));
                        }
                    })
                }else{
                    var data=sessionStorage.getItem(pageid+'')
                    data=JSON.parse(data);
                    var html=template('contentTemplate',data);
                    $('#content').html(html);
                }

            })
        }
    })


    //获取nav里的数据显示在页面
    $.ajax({
        url:'http://192.168.15.164:3000/api/getcategorybyid',
        data:{
            categoryid:id,
        },
        type:'get',
        dataType:'json',
        success: function (data) {
            console.log(data);

            $('nav .nav').html(data.result[0]['category']);


        }
    })


    $('.page .btn1').on('click', function () {
        if(pageid<=1){
            alert('已经是第一页了')
            return;
        }
        pageid--;

        $('.pageset').html(pageid+'-'+pagesize);

        if(!sessionStorage.getItem(pageid+'')){
            $.ajax({
                url:'http://192.168.15.164:3000/api/getproductlist',
                data:{
                    categoryid:id,
                    pageid:pageid
                },
                type:'get',
                dataType:'json',
                success: function (data) {
                    var html=template('contentTemplate',data);
                    $('#content').html(html);
                    sessionStorage.setItem(pageid+'',JSON.stringify(data));
                }
            })
        }else{
            var data=sessionStorage.getItem(pageid+'')
            data=JSON.parse(data);
            var html=template('contentTemplate',data);
            $('#content').html(html);
        }

    })

    $('.page .btn2').on('click', function () {
        if(pageid>=Math.ceil(data1.totalCount/data1.pagesize)){
            alert('已经是最后一页了')
            return;
        }
        pageid++;
        $('.pageset').html(pageid+'-'+pagesize);

        if(!sessionStorage.getItem(pageid+'')){
            $.ajax({
                url:'http://192.168.15.164:3000/api/getproductlist',
                data:{
                    categoryid:id,
                    pageid:pageid
                },
                type:'get',
                dataType:'json',
                success: function (data) {
                    console.log(data);
                    var html=template('contentTemplate',data);
                    $('#content').html(html);
                    sessionStorage.setItem(pageid+'',JSON.stringify(data));
                }
            })
        }else{
            var data=sessionStorage.getItem(pageid+'')
            data=JSON.parse(data);
            var html=template('contentTemplate',data);
            $('#content').html(html);
        }

    })



})