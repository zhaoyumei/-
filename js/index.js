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
})();