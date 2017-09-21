var oBox = document.getElementById('box');
var oItem = document.getElementById('item');
var oContent = document.getElementById('content');
var oLeft = document.getElementById('left');
var oRight = document.getElementById('right');

var changeID;
var delID;

/*分页函数*/
/*function page(opt){
    if (!opt.id) {return false};
    var obj = document.getElementById(opt.id);
    var nowNum = opt.nowNum || 1;
    var allNum = opt.allNum || 5;
    var callback = opt.callback || function(){};
    /!*当页数23456 没有1页的时候 即中间数为>=4 总页数>=6 添加首页标签*!/
    if (nowNum>=4 && allNum>=6) {
        var oA = document.createElement('a');
        oA.href="#1";
        oA.innerHTML = '首页';
        obj.appendChild(oA);
    }
    /!*当前页数大于2 上一页标签就出现*!/
    if (nowNum>=2) {
        var oA = document.createElement('a');
        oA.href="#"+(nowNum-1);
        oA.innerHTML = '上一页';
        obj.appendChild(oA);
    }

    /!*总页数小于5或者大于5*!/
    if (allNum<=5) {
        for (var i = 1; i <=allNum; i++) {
            var oA = document.createElement('a');
            oA.href='#'+i;
            if (nowNum ==i) {
                oA.innerHTML = i;
            }else{
                oA.innerHTML = '['+i+']';
            }

            obj.appendChild(oA);
        }
    }else{/!*页数大于5页时*!/
        /!*先创建5页*!/
        for (var i = 1; i <=5; i++) {
            var oA = document.createElement('a');
            if (nowNum==1 || nowNum==2) {/!*当页数为1 2时 防止出现0 -1页*!/
                oA.href='#'+i;
                if (nowNum ==i) {
                    oA.innerHTML = i;
                }else{
                    oA.innerHTML = '['+i+']';
                }

            }else if((allNum- nowNum)==0 || (allNum- nowNum)==1){/!*当页数为9 10 时 防止出现11 12页*!/
                oA.href = '#'+(allNum-5+i);
                if ((allNum- nowNum)==0 && i==5) {
                    oA.innerHTML = (allNum-5+i);
                }else if((allNum- nowNum)==1 && i==4){
                    oA.innerHTML = (allNum-5+i);
                }else{
                    oA.innerHTML = '['+(allNum-5+i)+']';
                }
            }else{
                oA.href='#'+(nowNum - 3 + i);
                if (i==3) {
                    oA.innerHTML = nowNum - 3 + i;
                }else{
                    oA.innerHTML = '['+(nowNum - 3 + i)+']';
                }
            }

            obj.appendChild(oA);
        }
    }
    /!*当总页-当前页为>=1 即当前页不是10 的时候 出现下一页*!/
    if ((allNum- nowNum) >=1 ) {
        var oA = document.createElement('a');
        oA.href="#"+(nowNum+1);
        oA.innerHTML = '下一页';
        obj.appendChild(oA);
    }
    /!*当总页-当前页为>=3 当页数 没有10页的时候  总页数>=6 添加尾页标签*!/
    if ((allNum- nowNum) >=3 &&allNum>=6) {
        var oA = document.createElement('a');
        oA.href="#"+allNum;
        oA.innerHTML = '尾页';
        obj.appendChild(oA);
    }
    callback(nowNum,allNum);
    var aA = obj.getElementsByTagName('a');
    for (var i = 0; i < aA.length; i++) {
        aA[i].onclick = function(){/!*this.href 是绝对路径*!/
            var nowNum = parseInt(this.getAttribute('href').substring(1));
            obj.innerHTML = '';
            page({
                id:opt.id,
                nowNum:nowNum, /!*当前页数*!/
                allNum:allNum,  /!*总显示页数*!/
                callback:callback
            })
        }
    }
}*/
/*滚动条函数*/
function addEvent(obj,sEv,fn){
    if(obj.addEventListener){
        obj.addEventListener(sEv,fn,false);
    }else{
        obj.attachEvent('on'+sEv,fn);
    }
}
function addWheel(obj,fn){
    function wheel(ev){
        var oEvent = ev || event;
        var bDown;
        bDown=oEvent.wheelDelta?oEvent.wheelDelta<0:oEvent.detail>0;
        //处理事情
        fn&&fn(bDown);
        //return false 碰见绑定不好使
        oEvent.preventDefault&&oEvent.preventDefault();
        //阻止默认事件
        return false;
    }
    if(window.navigator.userAgent.toLowerCase().indexOf('firefox')!=-1){
        //alert('是火狐')
        obj.addEventListener('DOMMouseScroll',wheel,false);
    }else{
        //alert('是其他浏览器')
        //obj.onmousewheel=wheel;
        addEvent(obj,'mousewheel',wheel);
    }
}
function setTop(t){
    if(t<0){
        t=0;
    }
    if(t>oRight.offsetHeight-oItem.offsetHeight){
        t=oRight.offsetHeight-oItem.offsetHeight;
    }
    var scale = t/(oRight.offsetHeight-oItem.offsetHeight);
    oContent.style.top=-scale*(oContent.offsetHeight-oLeft.offsetHeight)+'px';
    oItem.style.top=t+'px';
}
/*补零函数 2 => 002*/
function toDou(n) {
    if(n<10){
        return '00' + n
    }else if(n>=10 && n<100){
        return '0' + n
    }else{
        return '' + n;
    }
}

/*页面上来获取数据  所有项目*/
function addData(){
    $('.addDate').html('');
    /*正文*/
    $.ajax({
        url:'http://localhost:8080/invests',
        data:{},
        type:'GET',
        success:function(json){
            var data = $.parseJSON(json);
            var arr = data.list;
            var dataList = [];
            if(data.status == 1){
                for(var i = 0;i<arr.length;i++){
                    dataList.push('<tr>');
                    dataList.push('<td class="itemId">'+arr[i].itemId+'</td>');
                    dataList.push('<td>'+arr[i].invesName+'</td>');
                    dataList.push('<td>');
                    dataList.push('<span>'+(parseInt(arr[i].yearRate) * 100)+'</span><i>%</i>');
                    dataList.push('</td>');
                    dataList.push('<td>');
                    dataList.push('<span>'+arr[i].itemCycle+'</span>');
                    dataList.push('<select name="" >');
                    dataList.push('<option value="'+arr[i].cycleType+'">天</option>');
                    dataList.push('<option value="'+arr[i].cycleType+'">月</option>');
                    dataList.push('<option value="'+arr[i].cycleType+'">年</option>');
                    dataList.push('</select>');
                    dataList.push('</td>');
                    dataList.push('<td>');
                    dataList.push('<span>'+arr[i].startBuyLimit+'</span><i>份</i>');
                    dataList.push('</td>');
                    dataList.push('<td class="control">');
                    dataList.push('<span class="change">修改</span>');
                    dataList.push('<span class="delete">删除</span>');
                    dataList.push('</td>');
                    dataList.push('</tr>');
                }
                $('.addDate').html(dataList.join(''));
                /*设置显示 年0 天1 */
                for(var i = 0;i<arr.length;i++){
                    $('.sel').eq(i).attr('data-state',arr[i].cycleType).val(arr[i].cycleType);
                }
            }
        }
    })
}
/*点击添加 后 点击保存 上传并刷新*/
function addClick(){
    $.ajax({
        url:'http://localhost:8080/add',
        data:{
            itemId:$('#productID').val(),
            investName:$('#productName').val(),
            yearRate:$('#rateYear').val(),
            itemCycle:$('#productDate').val(),
            cycleType:$('#sele').val(),
            startBuyLimit:$('#shopNum').val()
        },
        type:'POST',
        success:function(json){
            var add_data = $.parseJSON(json);
            if(add_data.status==1){
                alert('新增成功');
                addData();/*重新获取一次数据*/
            }
        }
    })
}
/*点击修改 获取单条数据*/
function changeClick(changeID){
    $.ajax({
        url:'http://localhost:8080/invest/{'+changeID.html()+'}',
        data:{},
        type:'GET',
        success:function(json){
            var change_data = $.parseJSON(json);
            if(change_data.status==1){
                $('.tanKuangB').show();
                $('#productID').val(change_data.entity.itemId);
                $('#productName').val(change_data.entity.investName);
                $('#rateYear').val(change_data.entity.yearRate);
                $('#productDate').val(change_data.entity.itemCycle);
                $('#sele').val(change_data.entity.cycleType);
                $('#shopNum').val(change_data.entity.startBuyLimit);
            }
        }
    })
}
/*修改后 点击保存 更新 */
function changeUp(){
    $.ajax({
        url:'http://localhost:8080/upinvest',
        data:{
            itemId:$('#productID').val(),
            investName:$('#productName').val(),
            yearRate:$('#rateYear').val(),
            itemCycle:$('#productDate').val(),
            cycleType:$('#sele').val(),
            startBuyLimit:$('#shopNum').val()
        },
        type:'POST',
        success:function(json){
            var change_data = $.parseJSON(json);
            if(change_data.status==1){
                /*更新成功后加载数据*/
                addData();
            }
        }
    })
}
/*点击删除 删除商品id*/
function deleteId(delID){
    $.ajax({
        url:'http://localhost:8080/del/{'+delID+'}',
        data:{},
        type:'POST',
        success:function(json){
            var delId = $.parseJSON(json);
            if(delId.status==1){
                /*删除成功后 重新加载数据*/
                addData();
            }
        }
    })
}
/*执行函数 获取数据*/
addData();
/*调用滚动条*/
oItem.onmousedown=function(ev){
    var oEvent = ev || event;
    var disY = oEvent.clientY-oItem.offsetTop;
    document.onmousemove=function(ev) {
        var oEvent = ev || event;
        var t = oEvent.clientY - disY;
        setTop(t);
    };
    document.onmouseup=function(){
        document.onmousemove=null;
        document.onmouseup=null;
    };
    return false;
};
addWheel(oBox,function(bDown){
    var t = oItem.offsetTop;
    if(bDown){
        //往下
        t+=10;
    }else{
        t-=10;
    }
    setTop(t);
});

var add = false;
var change = false;
/*js*/
/*点击添加按钮*/
$('.add_btn').on('click',function(){
    $('.tanKuangB').show();
    add = true;
    change = false;
});
/*点击修改按钮*/
$('.change').on('click',function(){
    changeID = $(this).parents('tr').find('.itemId');
    changeClick(changeID);
    change = true;
    add = false;
});
/*点击删除按钮*/
$('.delete').on('click',function(){
    delID = $(this).parents('tr').find('.itemId').html();
    deleteId(delID)
});
/*点击关闭按钮*/
$('.closeK').on('click',function(){
    $('.tanKuangB').hide();
});
/*点击保存*/
$('.baoCun').on('click',function(){
    if(add){
        /*点击添加 执行添加函数*/
        addClick();
    }else if(change){
        /*点击修改 执行更新函数*/
        changeUp();
    }
    $('.tanKuangB').hide();
});

