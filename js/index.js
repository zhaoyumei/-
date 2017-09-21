
/*banner*/
;(function(){
    var oBannerBox = document.querySelector('.bannerBox');
    var bannerList =  document.querySelector('.bannerList');
    var dotWrapper = document.querySelector('.bannerPoint');
    var dots ;
    var loop = true;
    var pageIndex_G = 0;/*哪张图*/
    var timer;/*定时器*/
    var slider;

    /*创建li*/
    function _createLi(arr) {
        var li_arr = [];
        for(var i = 0; i < arr.length; i++) {
            var item = arr[i];
            li_arr.push('<li>');
            li_arr.push('<a href="'+ item.jump_src +'">');
            li_arr.push('<img src="'+ item.img_src +'">');
            li_arr.push('</a>');
            li_arr.push('</li>');
            dotWrapper.appendChild(document.createElement('li'));
        }
        bannerList.innerHTML = li_arr.join('');
        dots = dotWrapper.querySelectorAll('li');
    }

    /*初始化BScroll*/
    function _initSlider() {

        slider = new BScroll(oBannerBox,{
            scrollX: true,
            scrollY: false,
            momentum:false,
            snap: {
                loop: true,
                speed: 400,
                threshold: 0.3
            }
        });

        slider.on('scrollEnd',function () {
            var pageIndex = slider.getCurrentPage().pageX;
            if(loop) {
                pageIndex -= 1
            }
            pageIndex_G = pageIndex;
            _initDots(pageIndex_G);
            _play(slider);
        });

        slider.on('beforeScrollStart', function () {
            clearTimeout(timer);
        });

    }

    function _setSliderWidth(isResize) {
        var sliderWidth = oBannerBox.clientWidth;
        var width = 0;
        var children =bannerList.querySelectorAll('li');

        for(var i = 0; i < children.length; i++) {
            var child = children[i];
            child.style.width = sliderWidth + 'px';
            width += sliderWidth;
        }
        if(loop && !isResize) {
            width += 2 * sliderWidth;
        }
        bannerList.style.width = width + 'px';
    }

    function _play(slider) {
        var pageIndex = pageIndex_G + 1;
        pageIndex += 1;
        timer = setTimeout(function () {
            slider.goToPage(pageIndex, 0, 400);
        },1000)
    }

    function _initDots(pageIndex) {
        for(var i = 0; i < dots.length; i++) {
            dots[i].className = '';
        }
        dots[pageIndex].className = 'on';

    }

    function _getBannerData() {
        $.ajax({
            url: 'data.json',
            success: function (res) {
                if (res.code === 0) {
                    _createLi(res.list);

                }
                _setSliderWidth();
                _initSlider();
                _play(slider);
                scroll.refresh();
            }
        })
    }

    window.addEventListener('resize',function () {
        if(!slider) return;
        _setSliderWidth(true);
        slider.refresh();
    });

    _getBannerData();
})()

;(function () {

    var scrollWrapper = document.querySelector('.mainBox');
    var scroll;

    function _initScroll() {
        scroll = new BScroll(scrollWrapper,{
            probeType: 1,
            click: true
        });
    }
    window.addEventListener('resize',function () {
        scroll.refresh();
    });

    _initScroll();
    window.scroll = scroll;
})()
/*财富分类 */
;(function(){
    var oAssort  = document.querySelector('.assort');
    var oListView =  document.querySelector('.listView');
    /*百分数*/
    function toDou2(n) {
        var n = n * 100;
        return n.toFixed(2);
    }
    function _creatListItem(){
        // 测试代码
        var data = {
            status:1,
            list:[{investName:'yuan',yearRate:0.05,cycleType:1,itemCycle:30,investId:'001'},
                {investName:'yuan',yearRate:0.033,cycleType:2,itemCycle:30,investId:'021'}]
        };
        var arr = data.list;
        var	listItem = [];
        if(data.status == 1){
            for(var i = 0; i < arr.length; i++){
                listItem.push('<li class="listItem">');
                listItem.push('<div class="name">'+arr[i].investName+'</div>');
                listItem.push('<div class="content">');
                listItem.push('<div class="rate">');
                listItem.push('<div class="num">'+toDou2(arr[i].yearRate)+'<i>%</i></div>');
                listItem.push('<div class="text">预期年利率</div>');
                listItem.push('</div>');
                listItem.push('<div>');
                listItem.push('<div class="num">'+arr[i].itemCycle+'<i class="cycleType"></i></div>');
                listItem.push('<div class="text">项目期限</div>');
                listItem.push('</div>');
                listItem.push('<div>');
                listItem.push('<div class="num">'+arr[i].startBuyLimit+'<i>份</i></div>');
                listItem.push('<div class="text">起购份额</div>');
                listItem.push('</div>');
                listItem.push('</div>');
                listItem.push('<div class="btnWrapper">');
                listItem.push('<button class="btn" data-id="'+arr[i].investId+'">马上投资</button>');
                listItem.push('</div>');
                listItem.push('</li>');
            }
            oListView.innerHTML = listItem.join('');
            /*s设置天1 年*/
            for(var i = 0; i < arr.length; i++){
                if(arr[i].cycleType==1){
                    $('.cycleType').eq(i).html('年');
                }else if (arr[i].cycleType==2){
                    $('.cycleType').eq(i).html('月');
                }else{
                    $('.cycleType').eq(i).html('天');
                }
            }
        }
        /*正文*/
        $.ajax({
            url:'http://localhost:8080/invests',
            data:{},
            type:'GET',
            success:function(json){
                var data = $.parseJSON(json);
                var arr = data.list;
                var	listItem = [];
                if(data.status == 1){
                    for(var i = 0; i < arr.length; i++){
                        listItem.push('<li class="listItem">');
                        listItem.push('<div class="name">'+arr[i].investName+'</div>');
                        listItem.push('<div class="content">');
                        listItem.push('<div class="rate">');
                        listItem.push('<div class="num">'+toDou2(arr[i].yearRate)+'<i>%</i></div>');
                        listItem.push('<div class="text">预期年利率</div>');
                        listItem.push('</div>');
                        listItem.push('<div>');
                        listItem.push('<div class="num">'+arr[i].itemCycle+'<i class="cycleType"></i></div>');
                        listItem.push('<div class="text">项目期限</div>');
                        listItem.push('</div>');
                        listItem.push('<div>');
                        listItem.push('<div class="num">'+arr[i].startBuyLimit+'<i>份</i></div>');
                        listItem.push('<div class="text">起购份额</div>');
                        listItem.push('</div>');
                        listItem.push('</div>');
                        listItem.push('<div class="btnWrapper">');
                        listItem.push('<button class="btn" data-id="'+arr[i].investId+'">马上投资</button>');
                        listItem.push('</div>');
                        listItem.push('</li>');
                    }
                    oListView.innerHTML = listItem.join('');
                    /*s设置天3 年*/
                    for(var i = 0; i < arr.length; i++){
                        if(arr[i].cycleType==1){
                            $('.cycleType').eq(i).html('年');
                        }else if (arr[i].cycleType==2){
                            $('.cycleType').eq(i).html('月');
                        }else{
                            $('.cycleType').eq(i).html('天');
                        }
                    }
                }
            }
        })
    };
    _creatListItem();
    /*点击 马上投资*/
    var aBtn = document.querySelectorAll('.btn');
    for(var i = 0; i < aBtn.length; i++){
        aBtn[i].addEventListener('touchstart',function(){
            var id = this.getAttribute('data-id');
            window.location.href = 'https://www.maxwon.cn/product/{'+id+'}';
        },false);
    }
})()
;
/*
 */
