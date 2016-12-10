/*
 * Created by tzq 
 * 
 * loading js
 * 
 * 2016/5/15.
 * 
 */


    //获取浏览器页面可见高度和宽度
    var _PageHeight = document.documentElement.clientHeight,
        _PageWidth = document.documentElement.clientWidth;
    //在页面未加载完毕之前显示的loading Html自定义内容
    var _LoadingHtml = '<div id="loading" style="overflow: hidden;position: fixed;background: #3C4066;opacity:1;filter:alpha(opacity=80);width: '+_PageWidth+'px; height: '+_PageHeight+'px; z-index: 200000;"><div class="loader"><div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div></div></div>';
    //呈现loading效果
    document.write(_LoadingHtml);

    //监听加载状态改变
    document.onreadystatechange = completeLoading;

    //加载状态为complete时移除loading效果
    function completeLoading() {
        if (document.readyState == "complete") {
            var loadingMask = document.getElementById('loading');
            loadingMask.parentNode.removeChild(loadingMask);
        }
    }


