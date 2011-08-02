/* 
 * jQuery.tabs
 *
 * Copyright 2010, Grifo Tecnologia
 * Licensed under the MIT License 
 *
 * simple tab behaviour with anchor
 * @author Renatho Rosa <renatho@gri.fo>
 *
 */
$.fn.tabs = function(options){ 
	var defaults = { 
		anchor:false
	};
	var options = $.extend({}, defaults, options);

	return this.each(function(){
		var lis = $(this).find('li')
		  , links = lis.find('a')
		  , contents = $('');

		links.each(function(){
			var target = $(this).attr('href')
			contents = contents.add($(target))
		})

		lis.each(function(i){
			var li = $(this)
			function changeNav(e){
				e && e.preventDefault()
				var target = $(this).attr('href')
				lis.removeClass('active')
				li.addClass('active')
				contents.removeClass('active')
				$(target).addClass('active')
			}
			li.find('a').click(changeNav)
		})

		// Anchor on start
		if (options.anchor) {
			links.filter("[href='"+window.location.href.replace(/.*#/g,"#")+"']").click();
		}
	});

}