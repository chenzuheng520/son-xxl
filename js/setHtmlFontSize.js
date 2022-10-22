/*
 # 閹稿鍙庣€逛粙鐝В鏂剧伐鐠佹儳鐣緃tml鐎涙ぞ缍�, width=device-width initial-scale=1閻楋拷
 # @pargam win 缁愭褰泈indow鐎电钖�
 # @pargam option{
 designWidth: 鐠佹崘顓哥粙鍨啍鎼达讣绱濊箛鍛淬€�
 designHeight: 鐠佹崘顓哥粙鍧楃彯鎼达讣绱濇稉宥勭炊閻ㄥ嫯鐦介崚娆愮槷娓氬瀵滈悡褍顔旀惔锔芥降鐠侊紕鐣婚敍灞藉讲闁拷
 designFontSize: 鐠佹崘顓哥粙鍨啍妤傛ü绗呴悽銊ょ艾鐠侊紕鐣婚惃鍕摟娴ｆ挸銇囩亸蹇ョ礉姒涙ǹ顓�20閿涘苯褰查柅锟�
 callback: 鐎涙ぞ缍嬬拋锛勭暬娑斿鎮楅惃鍕礀鐠嬪啫鍤遍弫甯礉閸欘垶鈧拷
 }
 # ps:鐠囧嘲鏁栭柌蹇曨儑娑撯偓閺冨爼妫挎潻鎰攽濮濐槓s鐠侊紕鐣荤€涙ぞ缍�
 */
! function(win, option) {
    var count = 0,
        designWidth = option.designWidth,
        designHeight = option.designHeight || 0,
        designFontSize = option.designFontSize || 100,
        callback = option.callback || null,
        root = document.documentElement,
        body = document.body,
        rootWidth, newSize, t, self;
    //鏉╂柨娲杛oot閸忓啰绀岀€涙ぞ缍嬬拋锛勭暬缂佹挻鐏�
    function _getNewFontSize() {
        var iw = win.innerWidth > 750 ? 750 : win.innerWidth;
        var scale = designHeight !== 0 ? Math.min(iw / designWidth, win.innerHeight / designHeight) : iw / designWidth;
        return parseInt(scale * 10000 * designFontSize) / 10000;
    }! function() {
        rootWidth = root.getBoundingClientRect().width;
        self = self ? self : arguments.callee;
        //婵″倹鐏夊銈嗘鐏炲繐绠风€硅棄瀹虫稉宥呭櫙绾噯绱濈亸鍗炵毦鐠囨洖鍟€濞喡ゅ箯閸欐牕鍨庢潏銊у芳閿涘苯褰х亸婵婄槸20濞嗏槄绱濋崥锕€鍨担璺ㄦ暏win.innerWidth鐠侊紕鐣�
        if (rootWidth !== win.innerWidth && count < 20) {
            win.setTimeout(function() {
                count++;
                self();
            }, 0);
        } else {
            newSize = _getNewFontSize();
            //婵″倹鐏塩ss瀹歌尙绮￠崗鐓庮啇瑜版挸澧犻崚鍡氶哺閻滃洤姘ㄦ稉宥囶吀娴滐拷
            if (newSize + 'px' !== getComputedStyle(root)['font-size']) {
                root.style.fontSize = newSize + "px";
                return callback && callback(newSize);
            };
        };
    }();
    //濡亞鐝仦蹇撳瀼閹广垻娈戦弮璺衡偓娆愭暭閸欐ontSize閿涘本鐗撮幑顕€娓剁憰渚€鈧瀚ㄦ担璺ㄦ暏
    win.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function() {
        clearTimeout(t);
        t = setTimeout(function() {
            self();
        }, 200);
    }, false);
}(window, {
    designWidth: 750
});