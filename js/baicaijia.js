/**
 * Created by Administrator on 2017/3/18.
 */

$(function () {
    $.ajax({
        url:'http://mmb.ittun.com/api/getbaicaijiatitle',
        dataType:'json',
        type:'get',
        success: function (data) {
            console.log(data);
            var html=template('navTemplate',data);
            $('nav ul').html(html);
            $('nav ul').children('li').eq(0).addClass('active')

            leftSwipe();
            var startX=0;
            var moveX=0;
            var distanceX=0;
            var endX=0;
            $('nav ul').on('touchstart',function(e){
                console.log(e);
                startX = e.touches[0].clientX;
            })
            $('nav ul').on('touchmove',function(e){
                if(endX<=50&&endX>=window.screen.availWidth-757-50){
                    moveX = e.touches[0].clientX;
                    distanceX=moveX-startX;
                    $('nav ul').css('transform',"translateX("+(distanceX+endX)+"px)");
                }

            })
            $('nav ul').on('touchend',function(){
                endX=distanceX+endX;
                if(endX>=50){
                    $('nav ul').css('transform',"translateX("+0+"px)");
                    endX=0;
                }else if(endX<=window.screen.availWidth-757-50){
                    $('nav ul').css('transform',"translateX("+(window.screen.availWidth-757)+"px)");
                    endX=window.screen.availWidth-757;
                }
                startX = 0;
                moveX = 0;
                distanceX = 0;
            })



            $('nav ul li').on('click', function () {
                $(this).addClass('active').siblings().removeClass('active');
                var index=$('nav ul li').index($(this));
                var titleid=data.result[index]['titleId'];
                $.ajax({
                    url:'http://mmb.ittun.com/api/getbaicaijiaproduct',
                    dataType:'json',
                    type:'get',
                    data:{
                        titleid:titleid
                    },
                    success: function (data) {
                        console.log(data);
                        var html=template('listTemplate',data);
                        $('#container .list ul').html(html);
                    }
                })
            })
        }
    })


    $.ajax({
        url:'http://mmb.ittun.com/api/getbaicaijiaproduct',
        dataType:'json',
        type:'get',
        data:{
            titleid:0,
        },
        success: function (data) {
            console.log(data);
            var newdata={};
            newdata.result=[];
            for(var j=0;j<8;j++){
                newdata.result.push(data['result'][j]);
            }
            console.log(newdata);
            var html=template('listTemplate',newdata);
            $('#container .list ul').html(html);

            var pageHeight=window.screen.availHeight;//屏幕可视区域的高度
            var bodyHeight=document.body.scrollHeight;//全文高度

            //var lastpic=$('#container .list ul li').last().get(0);
            var lastpicHeight=$('#container .list ul li').last().get(0).offsetTop;
            console.log(pageHeight);
            console.log(lastpicHeight);


            window.onscroll= function (e) {
                var scrollHeight=document.body.scrollTop;//卷曲高度
                if(lastpicHeight<=scrollHeight+pageHeight){
                    //setTimeout(function () {
                        for(var j=0;j<4;j++){
                            if(newdata.result.length>data.result.length-1) break;
                            newdata.result.push(data.result[newdata.result.length]);
                        }

                        var html=template('listTemplate',newdata);
                        $('#container .list ul').html(html);

                    console.log(lastpicHeight);
                        bodyHeight=document.body.scrollHeight;
                        lastpicHeight=$('#container .list ul li').last().get(0).offsetTop;

                    //},2000)


                }


            }
        }
    })


})


function leftSwipe(){
    var parentBox=document.getElementsByTagName('nav')[0];
    var parentWidth=parentBox.offsetWidth;
    var childBox=document.getElementsByTagName('ul')[0];
    var lis=childBox.children;
    var childWidth=0;
    for(var i=0; i<lis.length;i++){
        childWidth+=lis[i].offsetWidth;
    }
    childBox.style.width=childWidth+'px';


}