// 设置日间模式还是夜间模式
if (document.cookie.indexOf("day_mode") != -1) {
    if (document.cookie.match(new RegExp("(^| )" + 'day_mode' + "=([^;]*)(;|$)"))[2] == 'moon') {
        document.getElementById("blogTitle_switch_input").checked = true;
        change_day_mode('moon');
    }
}
function change_day_mode(value) {
    // 先加上cookies
    let exp = new Date();
    exp.setTime(new Date().getTime() + 24 * 60 * 60 * 1000);
    document.cookie = "day_mode=" + encodeURI(value) + ";expires=" + exp.toUTCString();
    if (value == 'moon') {
        // 再加上夜间模式滤镜样式
        let style = document.createElement("style");
        style.id = "dark-mode-style";
        style.textContent = "@media screen {html {text-shadow: 0 0 0 !important;filter: url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\"><filter id=\"dark-mode-filter\" color-interpolation-filters=\"sRGB\"><feColorMatrix type=\"matrix\" values=\"0.283 -0.567 -0.567 0 0.925 -0.567 0.283 -0.567 0 0.925 -0.567 -0.567 0.283 0 0.925 0 0 0 1 0\"/></filter></svg>#dark-mode-filter') !important;scrollbar-color: #454a4d #202324;}}@media print {.no-print {display: none !important;}}";
        document.getElementsByTagName("head").item(0).appendChild(style);
    }
    else {
        // 再去除夜间模式滤镜样式
        if (document.getElementById('dark-mode-style')) {
            document.getElementById('dark-mode-style').remove();
        }
    }
}

$('#dark-mode-change').click(function (e) {
    if (!document.getElementById("blogTitle_switch_input").checked) {
        change_day_mode('moon');
    }
    else {
        change_day_mode('sun');
    }
});

// 下面开始设置DPlayer
const dp = new DPlayer({
    container: document.getElementById('dplayer'),
    autoplay: true,                                                   // 可选，自动播放视频，不支持移动浏览器
    theme: '#FADFA3',                                                  // 可选，主题颜色，默认: #b7daff
    loop: false,                                                        // 可选，循环播放音乐，默认：true
    // lang: 'en',                                                        // 可选，语言，`zh'用于中文，`en'用于英语，默认：Navigatorlanguage
    // screenshot: true,                                                  // 可选，启用截图功能，默认值：false，注意：如果设置为true，视频和视频截图必须启用跨域
    logo: './img/gxg.jpg',
    hotkey: true,                                                      // 可选，绑定热键，包括左右键和空格，默认值：true
    preload: 'auto',
    video: {
        // url: 'https://blz-videos.nosdn.127.net/1/OverWatch/AnimatedShots/Overwatch_AnimatedShot_Bastion_TheLastBastion.mp4',
        url:'https://gitlab.com/GXG12345/show/-/raw/main/show.mp4',
        // url:'/static/shijian/3/index.m3u8',
    },
    // danmaku: {                                                         // 可选，显示弹幕，忽略此选项以隐藏弹幕
    //     id: '',                                        // 必需，弹幕 id，注意：它必须是唯一的，不能在你的新播放器中使用这些： `https://api.prprpr.me/dplayer/list`
    //     api: '',                             // 必需，弹幕 api
    //     token: '',                                            // 可选，api 的弹幕令牌
    //     maximum: 1000,                                                 // 可选，最大数量的弹幕
    //     addition: [''],   // 可选的，额外的弹幕，参见：`Bilibili弹幕支持`
    //     unlimited:true
    //      },
    
    // contextmenu: [
    //     {
    //         text: '戈小戈个人博客',
    //         link: 'https://www.cnblogs.com/wsgxg',
    //     },
    //     {
    //         text: 'custom2',
    //         click: (player) => {
    //             console.log(player);
    //         },
    //     },
    // ],
    
});
function sw() {
    dp.switchVideo({
    url: './media/show.mp4',
			})

}
dp.on('ended', function () {
    console.log('player ended');
    sw();
    
});