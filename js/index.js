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
            li_arr.push('< a href="'+ item.jump_src +'">');
            li_arr.push('< img src="'+ item.img_src +'">');
            li_arr.push('</ a>');
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
    var aListView;
    var arr = [
        {name:'热门分来',list:[{typename:'111'}]},
        {name:'haha分类',list:[{typename:'222'},{typename:'333'}]}
    ];
    function _creatType(arr){
        var title_arr = [];
        for(var i = 0; i < arr.length; i++) {
            title_arr.push('<div class="productType">');
            title_arr.push('<div class="title">');
            title_arr.push('<div class="text">'+arr[i].name+'</div>');
            title_arr.push('<div class="more">');
            title_arr.push('< a href="">更多&nbsp;&gt;</ a>');
            title_arr.push('</div>');
            title_arr.push('</div>');
            title_arr.push('<ul class="listView"></ul>');
            title_arr.push('</div>');

        }
        oAssort.innerHTML = title_arr.join('');
        aListView = document.querySelectorAll('.listView');
    }
    function _creatListItem(arr){
        var	listItem = [];
        for(var i = 0; i < arr.length; i++){
            var listLength = (arr[i].list.length);
            for(var j = 0; j < listLength; j++) {
                listItem.push('<li class="listItem">');
                listItem.push('<div class="name">'+arr[i].list[j].typename+'</div>');
                listItem.push('<div class="content">');
                listItem.push('<div class="rate">');
                listItem.push('<div class="num">9.00%</div>');
                listItem.push('<div class="text">预期年利率</div>');
                listItem.push('</div>');
                listItem.push('<div>');
                listItem.push('<div class="num">75天</div>');
                listItem.push('<div class="text">项目期限</div>');
                listItem.push('</div>');
                listItem.push('<div>');
                listItem.push('<div class="num">10000份</div>');
                listItem.push('<div class="text">起购份额</div>');
                listItem.push('</div>');
                listItem.push('</div>');
                listItem.push('<div class="btnWrapper">');
                listItem.push('<button class="btn">马上投资</button>');
                listItem.push('</div>');
                listItem.push('</li>');

                aListView[listLength-1].innerHTML = listItem.join('');

            }
        }


    }

    function _getList() {
        $.ajax({
            url: 'data.json',
            success: function (res) {
                if (res.code === 0) {
                    _createLi(res.list);

                }
            }
        })
    }

    _creatType(arr);
    _creatListItem(arr)
})()
;