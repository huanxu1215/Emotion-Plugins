/*
*微信可识别的表情文本封装
*author: xuhuan 2016-3-22 17:03:43
*/
(function( factory ) {
    if ( typeof define === "function" && define.amd ) {

        // AMD. Register as an anonymous module.
        define([
            "jquery"
        ], factory );
    } else {
        // Browser globals
        factory( jQuery );
    }
}(function($){

	var options,$assign,path,wxEmotion={};

	//自己维护表情与解析文本间的对应关系
	var emotions=[{"icon":"0.gif","phrase":"[微笑]"},{"icon":"1.gif","phrase":"[撇嘴]"},{"icon":"2.gif","phrase":"[色]"},{"icon":"3.gif","phrase":"[发呆]"},{"icon":"4.gif","phrase":"[得意]"},{"icon":"5.gif","phrase":"[流泪]"},{"icon":"6.gif","phrase":"[害羞]"},{"icon":"7.gif","phrase":"[闭嘴]"},{"icon":"8.gif","phrase":"[睡]"},{"icon":"9.gif","phrase":"[大哭]"},{"icon":"10.gif","phrase":"[尴尬]"},{"icon":"11.gif","phrase":"[发怒]"},{"icon":"12.gif","phrase":"[调皮]"},{"icon":"13.gif","phrase":"[呲牙]"},{"icon":"14.gif","phrase":"[惊讶]"},{"icon":"15.gif","phrase":"[难过]"},{"icon":"16.gif","phrase":"[酷]"},{"icon":"17.gif","phrase":"[冷汗]"},{"icon":"18.gif","phrase":"[抓狂]"},{"icon":"19.gif","phrase":"[吐]"},{"icon":"20.gif","phrase":"[偷笑]"},{"icon":"21.gif","phrase":"[愉快]"},{"icon":"22.gif","phrase":"[白眼]"},{"icon":"23.gif","phrase":"[傲慢]"},{"icon":"24.gif","phrase":"[饥饿]"},{"icon":"25.gif","phrase":"[困]"},{"icon":"26.gif","phrase":"[惊恐]"},{"icon":"27.gif","phrase":"[流汗]"},{"icon":"28.gif","phrase":"[憨笑]"},{"icon":"29.gif","phrase":"[悠闲]"},{"icon":"30.gif","phrase":"[奋斗]"},{"icon":"31.gif","phrase":"[咒骂]"},{"icon":"32.gif","phrase":"[疑问]"},{"icon":"33.gif","phrase":"[嘘]"},{"icon":"34.gif","phrase":"[晕]"},{"icon":"35.gif","phrase":"[疯了]"},{"icon":"36.gif","phrase":"[衰]"},{"icon":"37.gif","phrase":"[骷髅]"},{"icon":"38.gif","phrase":"[敲打]"},{"icon":"39.gif","phrase":"[再见]"},{"icon":"40.gif","phrase":"[擦汗]"},{"icon":"41.gif","phrase":"[抠鼻]"},{"icon":"42.gif","phrase":"[鼓掌]"},{"icon":"43.gif","phrase":"[糗大了]"},{"icon":"44.gif","phrase":"[坏笑]"},{"icon":"45.gif","phrase":"[左哼哼]"},{"icon":"46.gif","phrase":"[右哼哼]"},{"icon":"47.gif","phrase":"[哈欠]"},{"icon":"48.gif","phrase":"[鄙视]"},{"icon":"49.gif","phrase":"[委屈]"},{"icon":"50.gif","phrase":"[快哭了]"},{"icon":"51.gif","phrase":"[阴险]"},{"icon":"52.gif","phrase":"[亲亲]"},{"icon":"53.gif","phrase":"[吓]"},{"icon":"54.gif","phrase":"[可怜]"},{"icon":"55.gif","phrase":"[菜刀]"},{"icon":"56.gif","phrase":"[西瓜]"},{"icon":"57.gif","phrase":"[啤酒]"},{"icon":"58.gif","phrase":"[篮球]"},{"icon":"59.gif","phrase":"[乒乓]"},{"icon":"60.gif","phrase":"[咖啡]"},{"icon":"61.gif","phrase":"[饭]"},{"icon":"62.gif","phrase":"[猪头]"},{"icon":"63.gif","phrase":"[玫瑰]"},{"icon":"64.gif","phrase":"[凋谢]"},{"icon":"65.gif","phrase":"[示爱]"},{"icon":"66.gif","phrase":"[爱心]"},{"icon":"67.gif","phrase":"[心碎]"},{"icon":"68.gif","phrase":"[蛋糕]"},{"icon":"69.gif","phrase":"[闪电]"},{"icon":"70.gif","phrase":"[炸弹]"},{"icon":"71.gif","phrase":"[刀]"},{"icon":"72.gif","phrase":"[足球]"},{"icon":"73.gif","phrase":"[瓢虫]"},{"icon":"74.gif","phrase":"[便便]"},{"icon":"75.gif","phrase":"[月亮]"},{"icon":"76.gif","phrase":"[太阳]"},{"icon":"77.gif","phrase":"[礼物]"},{"icon":"78.gif","phrase":"[拥抱]"},{"icon":"79.gif","phrase":"[强]"},{"icon":"80.gif","phrase":"[弱]"},{"icon":"81.gif","phrase":"[握手]"},{"icon":"82.gif","phrase":"[胜利]"},{"icon":"83.gif","phrase":"[抱拳]"},{"icon":"84.gif","phrase":"[勾引]"},{"icon":"85.gif","phrase":"[拳头]"},{"icon":"86.gif","phrase":"[差劲]"},{"icon":"87.gif","phrase":"[爱你]"},{"icon":"88.gif","phrase":"[NO]"},{"icon":"89.gif","phrase":"[OK]"},{"icon":"90.gif","phrase":"[爱情]"},{"icon":"91.gif","phrase":"[飞吻]"},{"icon":"92.gif","phrase":"[跳跳]"},{"icon":"93.gif","phrase":"[发抖]"},{"icon":"94.gif","phrase":"[怄火]"},{"icon":"95.gif","phrase":"[转圈]"},{"icon":"96.gif","phrase":"[磕头]"},{"icon":"97.gif","phrase":"[回头]"},{"icon":"98.gif","phrase":"[跳绳]"},{"icon":"99.gif","phrase":"[挥手]"},{"icon":"100.gif","phrase":"[激动]"},{"icon":"101.gif","phrase":"[街舞]"},{"icon":"102.gif","phrase":"[献吻]"},{"icon":"103.gif","phrase":"[左太极]"},{"icon":"104.gif","phrase":"[右太极]"}];
	//微信默认的105个表情符号代码
	var emojiCode={"/::)":"0.gif","/::~":"1.gif","/::B":"2.gif","/::|":"3.gif","/:8-)":"4.gif","/::<":"5.gif","/::$":"6.gif","/::X":"7.gif","/::Z":"8.gif","/::'(":"9.gif","/::-|":"10.gif","/::@":"11.gif","/::P":"12.gif","/::D":"13.gif","/::O":"14.gif","/::(":"15.gif","/::+":"16.gif","/:--b":"17.gif","/::Q":"18.gif","/::T":"19.gif","/:,@P":"20.gif","/:,@-D":"21.gif","/::d":"22.gif","/:,@o":"23.gif","/::g":"24.gif","/:|-)":"25.gif","/::!":"26.gif","/::L":"27.gif","/::>":"28.gif","/::,@":"29.gif","/:,@f":"30.gif","/::-S":"31.gif","/:?":"32.gif","/:,@x":"33.gif","/:,@@":"34.gif","/::8":"35.gif","/:,@!":"36.gif","/:!!!":"37.gif","/:xx":"38.gif","/:bye":"39.gif","/:wipe":"40.gif","/:dig":"41.gif","/:handclap":"42.gif","/:&-(":"43.gif","/:B-)":"44.gif","/:<@":"45.gif","/:@>":"46.gif","/::-O":"47.gif","/:>-|":"48.gif","/:P-(":"49.gif","/::'|":"50.gif","/:X-)":"51.gif","/::*":"52.gif","/:@x":"53.gif","/:8*":"54.gif","/:pd":"55.gif","/:<W>":"56.gif","/:beer":"57.gif","/:basketb":"58.gif","/:oo":"59.gif","/:coffee":"60.gif","/:eat":"61.gif","/:pig":"62.gif","/:rose":"63.gif","/:fade":"64.gif","/:showlove":"65.gif","/:heart":"66.gif","/:break":"67.gif","/:cake":"68.gif","/:li":"69.gif","/:bome":"70.gif","/:kn":"71.gif","/:footb":"72.gif","/:ladybug":"73.gif","/:shit":"74.gif","/:moon":"75.gif","/:sun":"76.gif","/:gift":"77.gif","/:hug":"78.gif","/:strong":"79.gif","/:weak":"80.gif","/:share":"81.gif","/:v":"82.gif","/:@)":"83.gif","/:jj":"84.gif","/:@@":"85.gif","/:bad":"86.gif","/:lvu":"87.gif","/:no":"88.gif","/:ok":"89.gif","/:love":"90.gif","/:<L>":"91.gif","/:jump":"92.gif","/:shake":"93.gif","/:<O>":"94.gif","/:circle":"95.gif","/:kotow":"96.gif","/:turn":"97.gif","/:skip":"98.gif","/:oY":"99.gif","/:#-0":"100.gif","/:skip":"101.gif","/:kiss":"102.gif","/:<&":"103.gif","/:&>":"104.gif"},
		emojiWz={"[微笑]":"0.gif","[撇嘴]":"1.gif","[色]":"2.gif","[发呆]":"3.gif","[得意]":"4.gif","[流泪]":"5.gif","[害羞]":"6.gif","[闭嘴]":"7.gif","[睡]":"8.gif","[大哭]":"9.gif","[尴尬]":"10.gif","[发怒]":"11.gif","[调皮]":"12.gif","[呲牙]":"13.gif","[惊讶]":"14.gif","[难过]":"15.gif","[酷]":"16.gif","[冷汗]":"17.gif","[抓狂]":"18.gif","[吐]":"19.gif","[偷笑]":"20.gif","[愉快]":"21.gif","[白眼]":"22.gif","[傲慢]":"23.gif","[饥饿]":"24.gif","[困]":"25.gif","[惊恐]":"26.gif","[流汗]":"27.gif","[憨笑]":"28.gif","[悠闲]":"29.gif","[奋斗]":"30.gif","[咒骂]":"31.gif","[疑问]":"32.gif","[嘘]":"33.gif","[晕]":"34.gif","[疯了]":"35.gif","[衰]":"36.gif","[骷髅]":"37.gif","[敲打]":"38.gif","[再见]":"39.gif","[擦汗]":"40.gif","[抠鼻]":"41.gif","[鼓掌]":"42.gif","[糗大了]":"43.gif","[坏笑]":"44.gif","[左哼哼]":"45.gif","[右哼哼]":"46.gif","[哈欠]":"47.gif","[鄙视]":"48.gif","[委屈]":"49.gif","[快哭了]":"50.gif","[阴险]":"51.gif","[亲亲]":"52.gif","[吓]":"53.gif","[可怜]":"54.gif","[菜刀]":"55.gif","[西瓜]":"56.gif","[啤酒]":"57.gif","[篮球]":"58.gif","[乒乓]":"59.gif","[咖啡]":"60.gif","[饭]":"61.gif","[猪头]":"62.gif","[玫瑰]":"63.gif","[凋谢]":"64.gif","[示爱]":"65.gif","[爱心]":"66.gif","[心碎]":"67.gif","[蛋糕]":"68.gif","[闪电]":"69.gif","[炸弹]":"70.gif","[刀]":"71.gif","[足球]":"72.gif","[瓢虫]":"73.gif","[便便]":"74.gif","[月亮]":"75.gif","[太阳]":"76.gif","[礼物]":"77.gif","[拥抱]":"78.gif","[强]":"79.gif","[弱]":"80.gif","[握手]":"81.gif","[胜利]":"82.gif","[抱拳]":"83.gif","[勾引]":"84.gif","[拳头]":"85.gif","[差劲]":"86.gif","[爱你]":"87.gif","[NO]":"88.gif","[OK]":"89.gif","[爱情]":"90.gif","[飞吻]":"91.gif","[跳跳]":"92.gif","[发抖]":"93.gif","[怄火]":"94.gif","[转圈]":"95.gif","[磕头]":"96.gif","[回头]":"97.gif","[跳绳]":"98.gif","[挥手]":"99.gif","[激动]":"100.gif","[街舞]":"101.gif","[献吻]":"102.gif","[左太极]":"103.gif","[右太极]":"104.gif"}
	
	var initEvent = function(){
		$(document).click(function(){
			$('#wxEmotion').hide();
		});
		$('#wxEmotion').on('click',function(){
			event.stopPropagation();
		}).on('click','.wx-emotion',function(){
			var emval=$(this).prop('alt');
			$('#wxEmotion').hide();
			if($assign.length<=0){
				options.callback&&options.callback(emval);
			}else{
				$assign.insertText(emval).trigger('keyup');
			}
			event.preventDefault();
		});
	};

	var loadwxEmotion = function(){
		var strFace, labFace;
		if($('#wxEmotion').length<=0){
			strFace = '<div id="wxEmotion" style="position:absolute;display:none;z-index:1000;">' +
						  '<table border="0" cellspacing="0" cellpadding="0"><tr>';
			$.each(emotions,function(index, el) {
				strFace +='<td><img src="'+path+el.icon+'" alt="'+el.phrase+'" class="wx-emotion" /></td>';
				if( (index+1) % 15 == 0 ) strFace += '</tr><tr>';
			});
			strFace += '</tr></table></div>';
			$('body').append(strFace);
			initEvent();
		}
	};
	
	$.fn.wxEmotion = function(opts){
		options=$.extend({}, $.fn.wxEmotion.defaults, opts); 
		
		$assign = $(options.assign);
		path = options.path;
		
		// if($assign.length<=0){
		// 	console.log('缺少表情赋值对象。');
		// 	return false;
		// }

		var $that = $(this);
		var offset = $that.offset();
		
		if ($('#wxEmotion').length<=0||!$('#wxEmotion').is(':visible')) {
			loadwxEmotion();
			$('#wxEmotion').css({
				top : offset.top + $that.outerHeight(),
				left : offset.left
			}).show();
			event.stopPropagation();
		}
	};

	wxEmotion.paraseWxEmoji = function(hstr){
		var reg = new RegExp("\\/::\\)|\\/::~|\\/::B|\\/::\\||\\/:8-\\)|\\/::<|\\/::\\$|\\/::X|\\/::Z|\\/::'\\(|\\/::-\\||\\/::@|\\/::P|\\/::D|\\/::O|\\/::\\(|\\/::\\+|\\/:--b|\\/::Q|\\/::T|\\/:,@P|\\/:,@-D|\\/::d|\\/:,@o|\\/::g|\\/:\\|-\\)|\\/::!|\\/::L|\\/::>|\\/::,@|\\/:,@f|\\/::-S|\\/:\\?|\\/:,@x|\\/:,@@|\\/::8|\\/:,@!|\\/:!!!|\\/:xx|\\/:bye|\\/:wipe|\\/:dig|\\/:handclap|\\/:&-\\(|\\/:B-\\)|\\/:<@|\\/:@>|\\/::-O|\\/:>-\\||\\/:P-\\(|\\/::'\\||\\/:X-\\)|\\/::\\*|\\/:@x|\\/:8\\*|\\/:pd|\\/:<W>|\\/:beer|\\/:basketb|\\/:oo|\\/:coffee|\\/:eat|\\/:pig|\\/:rose|\\/:fade|\\/:showlove|\\/:heart|\\/:break|\\/:cake|\\/:li|\\/:bome|\\/:kn|\\/:footb|\\/:ladybug|\\/:shit|\\/:moon|\\/:sun|\\/:gift|\\/:hug|\\/:strong|\\/:weak|\\/:share|\\/:v|\\/:@\\)|\\/:jj|\\/:@@|\\/:bad|\\/:lvu|\\/:no|\\/:ok|\\/:love|\\/:<L>|\\/:jump|\\/:shake|\\/:<O>|\\/:circle|\\/:kotow|\\/:turn|\\/:skip|\\/:oY|\\/:#-0|\\/:hiphot|\\/:kiss|\\/:<&|\\/:&>|\\[微笑\\]|\\[撇嘴\\]|\\[色\\]|\\[发呆\\]|\\[得意\\]|\\[流泪\\]|\\[害羞\\]|\\[闭嘴\\]|\\[睡\\]|\\[大哭\\]|\\[尴尬\\]|\\[发怒\\]|\\[调皮\\]|\\[呲牙\\]|\\[惊讶\\]|\\[难过\\]|\\[酷\\]|\\[冷汗\\]|\\[抓狂\\]|\\[吐\\]|\\[偷笑\\]|\\[愉快\\]|\\[白眼\\]|\\[傲慢\\]|\\[饥饿\\]|\\[困\\]|\\[惊恐\\]|\\[流汗\\]|\\[憨笑\\]|\\[悠闲\\]|\\[奋斗\\]|\\[咒骂\\]|\\[疑问\\]|\\[嘘\\]|\\[晕\\]|\\[疯了\\]|\\[衰\\]|\\[骷髅\\]|\\[敲打\\]|\\[再见\\]|\\[擦汗\\]|\\[抠鼻\\]|\\[鼓掌\\]|\\[糗大了\\]|\\[坏笑\\]|\\[左哼哼\\]|\\[右哼哼\\]|\\[哈欠\\]|\\[鄙视\\]|\\[委屈\\]|\\[快哭了\\]|\\[阴险\\]|\\[亲亲\\]|\\[吓\\]|\\[可怜\\]|\\[菜刀\\]|\\[西瓜\\]|\\[啤酒\\]|\\[篮球\\]|\\[乒乓\\]|\\[咖啡\\]|\\[饭\\]|\\[猪头\\]|\\[玫瑰\\]|\\[凋谢\\]|\\[示爱\\]|\\[爱心\\]|\\[心碎\\]|\\[蛋糕\\]|\\[闪电\\]|\\[炸弹\\]|\\[刀\\]|\\[足球\\]|\\[瓢虫\\]|\\[便便\\]|\\[月亮\\]|\\[太阳\\]|\\[礼物\\]|\\[拥抱\\]|\\[强\\]|\\[弱\\]|\\[握手\\]|\\[胜利\\]|\\[抱拳\\]|\\[勾引\\]|\\[拳头\\]|\\[差劲\\]|\\[爱你\\]|\\[NO\\]|\\[OK\\]|\\[爱情\\]|\\[飞吻\\]|\\[跳跳\\]|\\[发抖\\]|\\[怄火\\]|\\[转圈\\]|\\[磕头\\]|\\[回头\\]|\\[跳绳\\]|\\[挥手\\]|\\[激动\\]|\\[街舞\\]|\\[献吻\\]|\\[左太极\\]|\\[右太极\\]","g");
		
		var matchers=hstr.match(reg),
			newStr=hstr;

		if(matchers&&matchers.length>0){
			$.each(matchers,function(index,val){
				var emojiImg=emojiCode[val]||emojiWz[val];
				if(emojiImg){
                	newStr=newStr.replace(val,'<img class="emoji" src="'+($.fn.wxEmotion.defaults.path+emojiImg)+'" />');
				}
            });
		}
		return newStr;
	}

	$.fn.insertText=function(text) {

        this.each(function() {

            if (this.tagName !== 'INPUT' && this.tagName !== 'TEXTAREA') {
                return;
            }
            if (document.selection) {
                this.focus();
                var cr = document.selection.createRange();
                cr.text = text;
                cr.collapse();
                cr.select();
            } else if (this.selectionStart !== undefined) {
                var start = this.selectionStart;
                var end = this.selectionEnd;
                this.value = this.value.substring(0, start) + text
                        + this.value.substring(end, this.value.length);
                this.selectionStart = this.selectionEnd = start + text.length;
            } else {
                this.value += text;
            }
        });

        return this;
    }

	$.fn.wxEmotion.defaults={
		path : 'emotion/',
		assign : '',//赋值对象
		callback:null
	};

	$.wxEmotion=wxEmotion;
	
	return wxEmotion;
})
);
