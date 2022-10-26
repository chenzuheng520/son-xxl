////缇庡コ杩炶繛鐪�

$.fn.gameLLK = function($options) {

    var $defaults = {
        picNum: 12,
        time: 120,
		level:1,
        gameWinCbk: function gameWinCbk(t) {
        }
    }

    var $settings = $.extend($defaults, $options);

    //閰嶇疆鍙傛暟
    var starTime = $settings.time;
    var timeVal = $settings.time;
    var picNum1 = $settings.picNum;
    var picNum2 = picNum1 - 1;
	var level = $settings.level;
	//var storage = window.localStorage;
	//storage.setItem('level',3)
	//document.cookie = "level=3";

    //鍏蜂綋娓告垙娴佺▼
    gameStar();

    function gameStar() {
        $('.beauty').css('background', '#555392').addClass('beautyActive');
        $('#bgmusic').get(0).play();
        var timer = null;
        var count = 0;
        clearInterval(timer);
        //鍔犺浇闅忔満椤哄簭鍥剧墖
        picRandom();

        //璁剧疆120s鍊掕鏃�
        timer = setInterval(function() {
            --timeVal;
            $('.startime').text(timeVal + 's');
            if (timeVal == -1) {
                clearInterval(timer);
                $('.startime').text(0 + 's');
                $('#bgmusic').get(0).pause();
                $('#lose').get(0).play();
                gameWin(false);
                return false;
            } else {
                $('.beauty ul').on('click', 'li', function() {
					$('this').find('div').animate({
						opacity: 0,
					},100);
                    //涓嶉厤瀵�
                    if ($(this).attr('data-roleid') != $('.active').attr('data-roleid')) {
						$('.active').find('div').css({
							opacity: 1
						});
                        $(this).addClass('active').siblings().removeClass('active');
						
                    } else if ($(this).index() === $('.active').index()) { //鏄惁鏈韩
						$('.active').find('div').css({
							opacity: 0
						});
						return;
                    } else { //閰嶅    
						
						$(this).find('div').css({
							opacity: 0
						});
						
                        $(this).stop().animate({
                            opacity: 0,
                        }, 400, function() {
                            setTimeout(function() {
                                audioRightFun();
                            }, 1);
                        }).siblings('.active').stop().animate({
                            opacity: 0
                        }, 400, function() {
                            ++count;
                            if (count == picNum1) {
                                clearInterval(timer);
                                endTime = parseInt(starTime - timeVal);
                                gameWin(true,endTime);
                                $settings.gameWinCbk();
                                $('#bgmusic').get(0).pause();
                                $('#win').get(0).play();
                            }
                        });
                    }
                });
            }
        }, 1000)
    }

    function audioRightFun() {
        $('#right').get(0).play();
    }

    function audioWrongFun() {
        $('#wrong').get(0).play();
    }

    //鍥剧墖闅忔満

    function picRandom() {
        var randomArr1 = [];
        var randomArr2 = [];
        var randomArr3 = [];
        for (var i = 1; i <= picNum1; i++) {
            randomArr1.push(i);
            randomArr2.push(i);
            randomArr3.push(i - 1);
        }
        randomArr1.sort(function() {
            return 0.5 - Math.random();
        })
        randomArr2.sort(function() {
            return 0.5 - Math.random();
        })
        randomArr3.sort(function() {
            return 0.5 - Math.random();
        })

        var html1 = '';
        var html2 = '';
		//var lev = storage.getItem('level')
		var lv = getCookie();
	    	alert('第'+lv+'关');
		var lev = lv?lv:level;
		lev = 4;
		//level = lev
		alert('第'+lev+'关');
        for (var i = 0; i <= picNum2; i++) {
            html1 += '<li data-roleid="' + randomArr1[i] + '"><img src="images/role' + randomArr1[i] + '.jpg" alt=""><div class="z-d-l-'+lev+'"></div></li>'

        }

        $('.beauty ul').append(html1);
        for (var j = 0; j <= picNum2; j++) {
            html2 = '<li data-roleid="' + randomArr2[j] + '"><img src="images/role' + randomArr2[j] + '.jpg" alt=""><div class="z-d-r-'+lev+'"></div></li>';
            if (j % 2 == 0) {
                $('.beauty ul').children('li').eq(randomArr3[j]).before(html2);
            } else {
                $('.beauty ul').children('li').eq(randomArr3[j]).after(html2);
            }
        }

    }

    //娓告垙缁撴潫浼犲叆鏃堕棿
    function gameWin(flag,t) {
        if (flag) {
            $('.endtime').text(t);
        }else {
            $('.game-result').find('p').html('继续加油哦~');
        }
        $('.beauty').slideUp();
        $('.mask').fadeIn().find('.game-result').fadeIn();
    }

    //鍦ㄧ帺涓€娆�
    $('.play-again').on('click', function() {
		//storage.setItem('level',level++);
		var level = getCookie();
		level++;
		setCookie(level)
        location.reload();
    });
	
	$('.show-score').on('click', function() {
		let time = $('.endtime').text();
		let endTime = parseInt(time);
		if(endTime<=15){
			alert('恭喜你，得倒100分');
		}else if(endTime>15&&endTime<=20){
			alert('恭喜你，得倒98分');
		}else if(endTime>20&&endTime<=30){
			alert('恭喜你，得倒95分');
		}else if(endTime>30&&endTime<=40){
			alert('恭喜你，得倒90分');
		}else if(endTime>40&&endTime<=50){
			alert('恭喜你，得倒80分');
		}else{
			alert('恭喜你，得倒60分');
		}
	});
	
	function getCookie(){
		var strCookie = document.cookie;
		var arr = strCookie.split("=");
		var level = arr[1];
		return level;
	}
	function setCookie(level){
		document.cookie = "level="+level;
	}
}
