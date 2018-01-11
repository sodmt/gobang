$(function(){
    let qipan =$('.qipan'),
        flag = true,
        hei = {},
        bai = {},
        blank = {},
        ai = true;
    for(let i = 0;i < 15;i++){
        $('<i>').appendTo(qipan);
        $('<b>').appendTo(qipan);
        for(let j = 0;j < 15;j++){
            blank[i + "_" + j] = true;
            $('<span>')
                .appendTo(qipan)
                .addClass('qizi')
                .attr('id',i + "_" + j)
                .data('pos',{x:i,y:j});
        }
    }

    qipan.on('click','.qizi',function () {
        if($(this).hasClass('hei') || $(this).is('bai')){
            return;
        }
        let data = $(this).data('pos');
        if(flag){
            $(this).addClass('hei');
            hei[data.x +"_"+ data.y] = true;
            delete blank[data.x +"_"+ data.y];
            if(isSuccess(data,hei) >= 5){
                qipan.off();
                console.log('小黑胜利');
                return;
            }
            if(ai){
                let pos = position();
                $('#' + pos.x + "_" + pos.y).addClass('bai');
                bai[pos.x +"_"+ pos.y] = true;
                delete blank[pos.x +"_"+ pos.y];
                if(isSuccess(pos,bai) >= 5){
                    qipan.off();
                    console.log('小白胜利');
                }
                return;
            }
        }else{
            $(this).addClass('bai');
            bai[data.x+"_"+data.y] = true;
            if(isSuccess(data,bai) >= 5){
                qipan.off();
                console.log('小白胜利');
            }
        }
        flag=!flag;
    });

    function position(){
        let score1 = 0,score2 = 0,pos1 = null,pos2 = null;
        for(let i in blank){
            let obj = {x:i.split('_')[0],y:i.split('_')[1]};
            if (isSuccess(obj, hei) > score1) {
                score1 = isSuccess(obj, hei);
                pos1 = obj;
            }
            if(isSuccess(obj,bai) > score2) {
                score2 = isSuccess(obj,bai);
                pos2 = obj;
            }
        }
        return score1 > score2 ? pos1 : pos2;
    };


    function isSuccess(data,obj){
        let heng = 1,shu = 1,zx = 1,yx = 1;
        let x = data.x,y = data.y;

        while (obj[x+'_'+(++y)]){
            heng++;
        }
        x = data.x,y = data.y;
        while (obj[x+'_'+(--y)]){
            heng++;
        }
        x = data.x,y = data.y;
        while (obj[(++x)+'_'+y]){
            shu++;
        }
        x = data.x,y = data.y;
        while (obj[(--x)+'_'+y]){
            shu++;
        }
        x = data.x,y = data.y;
        while (obj[(++x)+'_'+(++y)]){
            yx++;
        }
        x = data.x,y = data.y;
        while (obj[(--x)+'_'+(--y)]){
            zx++;
        }
        x = data.x,y = data.y;
        while (obj[(++x)+'_'+(--y)]){
            yx++;
        }
        x = data.x,y = data.y;
        while (obj[(--x)+'_'+(++y)]){
            zx++;
        }
        // console.log(heng,shu,zx,yx);
        return Math.max(heng,shu,zx,yx);
    }
});