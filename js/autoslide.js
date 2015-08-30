(function($){
	//autoSlide 始め
	function AutoSlide(parameter){
		var param = $.extend({
			target:'', //スライドするIDを設定
			course:'left',//left or right or top or bottom を設定 デフォルトはleft
			speed:10000 //1回のアニメーションにかける時間
			},parameter);
		
		if (!(this instanceof AutoSlide)){//newから生成していなければnewで生成
			return new AutoSlide(param);
		}
		
		var $target = $(param.target),//target jQuery化
			childWidth = $(param.target).children().eq(0).outerWidth(true),//子の横（アキ付）取得
			childHeight = $(param.target).children().eq(0).outerHeight(true),//子の縦（アキ付）取得
			childLength = $(param.target).children().length;//子の数取得
			
		$target.children().clone().appendTo($target);//targetの子複製
	
		var autoSlideInit = function(){//動きなど表示している本体のセット
			var courseData = function(course,type){//courseを見て【大きさ(横or縦)/位置/移動距離】の値を取得
				var size = {},
					position = {},
					direction = {};
				switch (course){
				case 'left'://左へ移動
					position = {left:0};//初期位置(0からスタート)
					size = {width:childWidth * childLength * 2};//横幅を長くする(スクロール用に複製したので幅*2)
					direction = {left:childWidth * childLength * -1};//移動位置(子の横幅*子の数*マイナス移動(left方向))
				break;
				case 'right'://右へ移動
					position = {left:childWidth * childLength * -1};//初期位置(子の横幅*子の数*マイナス)
					size = {width:childWidth * childLength * 2};//横幅を長くする(スクロール用に複製したので幅*2)
					direction = {left:0};//移動位置(0になるまで移動)
				break;
				case 'top'://上へ移動
					position = {top:0};//初期位置(0からスタート)
					size = {height:childHeight * childLength * 2};//縦幅を長くする(スクロール用に複製したので幅*2)
					direction = {top:childHeight * childLength * -1};//移動位置(子の縦幅*子の数*マイナス移動(top方向))
				break;
				case 'bottom'://下へ移動
					position = {top:childHeight * childLength * -1};//初期位置
					size = {height:childHeight * childLength * 2};//縦幅を長くする(スクロール用に複製したので幅*2)
					direction = {top:0};//移動位置(0になるまで移動)
				break;
				};
				if (type == 'size'){//typeがsizeだったらsizeを返す
					return size;
				}
				if (type == 'position'){//typeがpositionだったらpositionを返す
					return position;
				}
				if (type == 'direction'){//typeがdirectionだったらdirectionを返す
					return direction;
				}
			};
			var animeTimer = function(){//アニメーションする
				$target.animate(courseData(param.course,'direction'),param.speed,'linear',function(){
					$target.css(courseData(param.course,'position'));//初期位置に戻す
					animeTimer();//終了したらもう一度再生
				});
			};
			$target
			.css(courseData(param.course,'size'))//幅を設定する
			.css(courseData(param.course,'position'));//初期位置を設定する
			animeTimer();
		};
		autoSlideInit();
	}
	//autoSlide 終わり
	
	//autoSlide 実行
	$(document).ready(function(){
		var _autoSlide = AutoSlide({
			target:'.voice_slidein',//スライドするIDを設定
			course:'left',//left or right or top or bottom を設定 デフォルトはleft
			speed:40000//1回のアニメーションにかける時間
		});
	});
})(jQuery);
