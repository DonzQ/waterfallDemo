/*
 * create by tzq
 * 
 * 瀑布流布局js
 * 
 * 2016/5/15
 */

window.onload = function(){
	waterfall('waterfall','box');
	
	// 滚动事件
	window.onscroll = function(){
		if(checkScrollSlide()){
			// 将当前数据块渲染到页面尾部
			loadData();
		}
	}
	
	// 当窗口改变大小的时候重新刷新页面，进行布局
	window.onresize = function(){
		window.location.reload();
	}
}

function waterfall(parent,box){
	//将waterfall下的所有class为box的元素取出
	var wParent = document.getElementById(parent);
	var wBoxs = getByClass(wParent,box);

	//计算整个页面显示的列数（页面的宽度/box的宽度）
	var wBoxWidth = wBoxs[0].offsetWidth;
	var cols = Math.floor(document.documentElement.clientWidth/wBoxWidth);

	//设置waterfall的宽度
	wParent.style.cssText='width:'+wBoxWidth*cols+'px;margin:0 auto;'
	
	var arrayHeight = []; //存放每一列高度的数组
	for(var i=0; i<wBoxs.length; i++){
		if(i<cols){
			arrayHeight.push(wBoxs[i].offsetHeight);
		} else {
			var minHeight = Math.min.apply(null,arrayHeight); //取得最小高度
			var index = getMinHeightIndex(arrayHeight,minHeight); //取得最小高度的索引
			//设置位置
			wBoxs[i].style.position = "absolute";
			wBoxs[i].style.top = minHeight+"px";
			wBoxs[i].style.left = wBoxWidth*index+"px";
			arrayHeight[index] += wBoxs[i].offsetHeight;
		}
	}
}

//根据class获取元素
function getByClass(parent,clsName){
	var boxArr = new Array(),   //用来存储所有获取到的class为box的元素
		AllElements = parent.getElementsByTagName('*');
		
	for(var i=0 ; i<AllElements.length ; i++){
		if(AllElements[i].className==clsName){
			boxArr.push(AllElements[i]);
		}
	}
	return boxArr;
}

//获取一行中最小高度索引
function getMinHeightIndex(arr,value){
	for(var i in arr){
		if(arr[i]==value){
			return i;
		}
	}
}

// 检查是否具备了滚动加载数据的条件
function checkScrollSlide(){
	var wParent = document.getElementById('waterfall');
	var wBoxs = getByClass(wParent,'box');
	var lastBoxHeight = wBoxs[wBoxs.length-1].offsetTop+Math.floor(wBoxs[wBoxs.length-1].offsetHeight/2);
	//混杂模式与标准模式下获取滚动距离
	var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
	//获取页面的高度
	var windowHeight = document.body.clientHeight || document.documentElement.clientHeight;
	console.log(123);
	return (lastBoxHeight<(scrollTop+windowHeight)) ? true : false ;
}


// ajax请求数据加载
function loadData(){
	//创建XMLHTTPRequest对象
	var xmlhttp;
	if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
	  	xmlhttp=new XMLHttpRequest();
	} else {// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	xmlhttp.onreadystatechange=function() {
		if (xmlhttp.readyState==4 && xmlhttp.status==200) {
	    	
	    	//保存获取到的数据
	    	var data_img = eval(xmlhttp.responseText);
	    	
	    	var wParent = document.getElementById('waterfall');
	    	console.log(data_img);
	    	for(var i=0; i<data_img.length; i++){
	    		var wBox = document.createElement("div");
	    		wBox.className = "box";
	    		wParent.appendChild(wBox);
	    		
	    		var wContent = document.createElement("div");
	    		wContent.className = "content";
	    		wBox.appendChild(wContent);
	    		
	    		var wImg = document.createElement("img");
	    		wImg.src = data_img[i].src;
	    		wContent.appendChild(wImg);
	    	}
	    	
	    	waterfall('waterfall','box');
	    }
	}
	
	var url="img_data.json";
	xmlhttp.open("GET",url,true);
	xmlhttp.send();
}
