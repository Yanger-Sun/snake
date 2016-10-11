/**
 * Created by 小样儿 on 2016/9/14.
 */
$(function () {

    var t=0;
    function jiemian(){
        var sence=$(".sence")
        for(var i=0;i<20;i++){
            for (var j=0;j<20;j++){
                $("<div>").attr("id",i+"_"+j).addClass("sdiv").appendTo(sence)
            }
        }
    }

    jiemian()
    var sta=$(".sta")
    var zan=$(".zan")
    var cj=$(".cj")

    sta.on("click",function(){

        if($(this).html()=="开始") {
            t=0;
            $(".sence").html("")
            jiemian()
            tanchishe()
            setTimeout(function(){
                sta.html("结束")
            },200)

        }else if($(this).html()=="jiesu"){
            var endan=confirm("确定要结束吗？")
            if(endan){
                alert("你当前的成绩为："+count+"分")
                setTimeout(function(){
                    sta.html("开始")
                },200)
                $(".sence").html("")
                jiemian()
            }else{
                alert("加油!")
                t=setInterval(move,200)
            }
        }
    })

function tanchishe(){

    var shelu={}
    var jianbiao={zuo:37,shang:38,you:39,xia:40}
    var sjkuai={}
    var der="you"
    var count=0;
    var she=[{x:0,y:0},{x:0,y:1},{x:0,y:2}]

    function findshe(obj){
        return $("#"+obj.x+"_"+obj.y)
    }

    $.each(she,function(i,v){
         findshe(v).addClass("sheshen")
        if(!shelu[v.x+"_"+v.y]){
            shelu[v.x+"_"+v.y]=true
        }
    })

    function sjk(){
        do{
            var sx=Math.floor(Math.random()*20)
            var sy=Math.floor(Math.random()*20)
        }while(shelu[sx+"_"+sy])
        sjkuai.x=sx
        sjkuai.y=sy
        findshe({x:sx,y:sy}).css({"background":"rgba(255,255,0,0.8)",borderRadius:"50%"})
    }
    sjk()
    function move(){
        $(window).on("keyup",function(e){
            if(Math.abs(jianbiao[der]-e.keyCode)==2){
                return;
            }else if(e.keyCode==37){
                der="zuo"
            }else if(e.keyCode==38){
                der="shang"
            }else if(e.keyCode==39){
                der="you"
            }else if(e.keyCode==40){
                der="xia"
            }
        })

        if(der=="zuo"){
            var newx=she[she.length-1].x
            var newy=she[she.length-1].y-1
            var newtou={x:newx,y:newy}
        }else if(der=="shang"){
            var newx=she[she.length-1].x-1
            var newy=she[she.length-1].y
            var newtou={x:newx,y:newy}
        }else if(der=="xia"){
            var newx=she[she.length-1].x+1
            var newy=she[she.length-1].y
            var newtou={x:newx,y:newy}
        }else if(der=="you"){
            var newx=she[she.length-1].x
            var newy=she[she.length-1].y+1
            var newtou={x:newx,y:newy}
        }

        if(shelu[newtou.x+"_"+newtou.y]){
            clearInterval(t)
            alert("撞死自己啦!\n你的成绩是:"+count+"分")
            var zzjan=confirm("是否重新开始游戏")
            if(zzjan){
                $(".sence").html("")
                jiemian()
                setTimeout(function(){
                    sta.html("结束")
                    tanchishe()
                },200)
            }else{
                setTimeout(function(){
                   sta.html("开始")
                 },200)
            }
        }

        if(newtou.y>19 || newtou.y<0 || newtou.x<0 || newtou.x>19){
            clearInterval(t)
            alert("撞死了\n你的成绩是:"+count+"分")
            var zsan=confirm("是否重新开始游戏")
            if(zsan){
                $(".sence").html("")
                jiemian()
                setTimeout(function(){
                    sta.html("结束")
                    tanchishe()
                },500)
            }else{
                setTimeout(function(){
                    sta.html("开始")
                },500)
            }
        }

        if(newtou.x==sjkuai.x && newtou.y==sjkuai.y){
            she.push(newtou)
            $("#"+sjkuai.x+"_"+sjkuai.y).css({"background":"",borderRadius:""})
            count++;
            if(count<10){
                cj.html("0"+count)
            }else{
                cj.html(count)
            }
            sjk()
        }else{
            she.push(newtou)
            she.shift()
        }
        shelu={}
        $.each(she,function(i,v){
            shelu[v.x+"_"+v.y]=true
        })
        $(".sdiv").removeClass("sheshen")
        $.each(she,function(i,v){
            findshe(v).addClass("sheshen")
        })
    }

    if($("input[name='nanyi']:checked").val()=="easy"){
       time=500
    }else if($("input[name='nanyi']:checked").val()=="diff"){
        time=100
    }else if($("input[name='nanyi']:checked").val()=="zhong"){
        time=200
    }else{
        time=200
    }

   t=setInterval(move,time)


    zan.on("click",function(){
        if($(this).text()=="暂停"){
            clearInterval(t)
            setTimeout(function(){
                zan.text("继续");
            },200)
        }else if($(this).text()=="继续"){
            t=setInterval(move,200)
            setTimeout(function(){
                zan.text("暂停");
            },200)
        }
    })

    sta.on("click",function(){
        if($(this).text()=="开始") {
            clearInterval(t)
            setTimeout(function(){
                $(".sence").html("")
                jiemian()
                tanchishe();
                $(this).text("结束")
                zan.text("暂停");
            },200)
        }else if($(this).text()=="结束"){
            clearInterval(t)
            var endan=confirm("确定要结束吗？")
            if(endan){
                alert("你当前的成绩为："+count+"分")
                setTimeout(function(){
                    $(".sta").text("开始");
                    $(".sence").html("");
                    jiemian();
                },200)

            }else{
                alert("加油!")
                t=setInterval(move,time)
            }
        }
    })

}











})