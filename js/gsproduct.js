/**
 * Created by Administrator on 2017/3/19.
 */
$(function () {
    var hash=location.hash;
    console.log(hash);
    var r=/\d+/g;
    var res,arr=[];
    while(res=r.exec(hash)){
        arr.push(+res[0]);
    }
    if(arr.length!==2){
        arr=[0,0];
    }
    console.log(arr);
    $.ajax({
        url:'http://mmb.ittun.com/api/getgsproduct',
        type:'get',
        data:{
            shopid:arr[0],
            areaid:arr[1],
        },
        dataType:'json',
        success: function (data) {
            console.log(data);
            var html=template('listTemplate',data);
            $('.bd ul').html(html);

        }
    })











    $('.filter ul li').on('click', function () {
        var that=this;
        $(this).siblings().removeClass('on');
        $(this).toggleClass('on');
        var index=$(this).index();
        if(index==0){
            $('.popsort').siblings().removeClass('on')
            $('.popsort').toggleClass('on');
            if(!$('.popsort ul').children().html()){
                $.ajax({
                    url:'http://mmb.ittun.com/api/getgsshop',
                    dataType:'json',
                    type:'get',
                    success: function (data) {
                        console.log(data);
                        var html=template('popsortTemplate',data);
                        $('.popsort ul').html(html);
                        $('.popsort ul li').eq(0).addClass('on')

                        $('.popsort ul li').on('click',function(){
                            $(this).addClass('on').siblings().removeClass('on');
                            var str=$(this).text();
                            $('.filter ul li:eq('+index+') a').find('span').text(str);
                            $('.popsort').toggleClass('on');
                            $(that).toggleClass('on');

                            //var url=location.href;
                            //console.log(url);
                            window.addEventListener('hashchange', function () {
                                var hash=location.hash;
                                console.log(hash);
                                var r=/\d+/g;
                                var res,arr=[];
                                while(res=r.exec(hash)){
                                    arr.push(+res[0]);
                                }
                                $.ajax({
                                    url:'http://mmb.ittun.com/api/getgsproduct',
                                    type:'get',
                                    data:{
                                        shopid:arr[0],
                                        areaid:arr[1],
                                    },
                                    dataType:'json',
                                    success: function (data) {
                                        console.log(data);
                                        var html=template('listTemplate',data);
                                        $('.bd ul').html(html);
                                    }
                                })
                            })

                        })
                    }
                })
            }


        }else if(index==1){
            $('.popprice').siblings().removeClass('on')
            $('.popprice').toggleClass('on');

            if(!$('.popprice ul').children().html()){
                $.ajax({
                    url:'http://mmb.ittun.com/api/getgsshoparea',
                    dataType:'json',
                    type:'get',
                    success: function (data) {
                        console.log(data);
                        var html=template('poppriceTemplate',data);
                        $('.popprice ul').html(html);
                        $('.popprice ul li').eq(0).addClass('on')

                        $('.popprice ul li').on('click',function(){
                            $(this).addClass('on').siblings().removeClass('on');
                            var str=$(this).text().slice(0,2);
                            $('.filter ul li:eq('+index+') a').find('span').text(str);
                            $('.popprice').toggleClass('on');
                            $(that).toggleClass('on');


                            window.addEventListener('hashchange', function () {
                                var hash=location.hash;
                                console.log(hash);
                                var r=/\d+/g;
                                var res,arr=[];
                                while(res=r.exec(hash)){
                                    arr.push(+res[0]);
                                }
                                $.ajax({
                                    url:'http://mmb.ittun.com/api/getgsproduct',
                                    type:'get',
                                    data:{
                                        shopid:arr[0],
                                        areaid:arr[1],
                                    },
                                    dataType:'json',
                                    success: function (data) {
                                        console.log(data);
                                        var html=template('listTemplate',data);
                                        $('.bd ul').html(html);
                                    }
                                })
                            })

                        })
                    }
                })
            }

        }else if(index==2){
            $('.popcat').siblings().removeClass('on')
            $('.popcat').toggleClass('on');

            $('.popcat ul li').on('click',function(){
                $(this).addClass('on').siblings().removeClass('on');
                var str=$(this).text();
                $('.filter ul li:eq('+index+') a').find('span').text(str);

                $('.popcat').toggleClass('on');
                $(that).toggleClass('on');
            })
        }
    })




})




function changeUrl(arg,arg_val){
    var url=location.href;
    console.log(url);
    var newurl=change(url,arg,arg_val);
    console.log(newurl);
    location.href=newurl;
}


    function change(url,arg,arg_val){
        var pattern=arg+'=([^&]*)';
        var replaceText=arg+'='+arg_val;
        if(url.match(pattern)){
            var tmp='/('+ arg+'=)([^&]*)/gi';
            tmp=url.replace(eval(tmp),replaceText);
            return tmp;
        }else{
            if(url.match('[\#]')){
                return url+'&'+replaceText;
            }else{
                return url+'#'+replaceText;
            }
        }
        return url+'\n'+arg+'\n'+arg_val;
    }





