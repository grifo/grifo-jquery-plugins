/* 
 * jQuery.scrollTo
 *
 * Copyright 2010, Grifo Tecnologia
 * Licensed under the MIT License 
 *
 * animated page scrolling
 * @author Ricardo Tomasi <ricardo.tomasi@grifotecnologia.com.br>
 *
 */
;(function($){

function _scroll(){
	
	var doc = document.documentElement || document.body
	  , top = $(this).offset().top

	if (top > doc.scrollTop) return this

	$(doc).animate({
		scrollTop: top-(margin||30)
	}, Math.min(doc.scrollTop-top+200, 1500))
	
}

$.fn.scrollTo = function(queue, margin){

	if (queue){
		this.eq(0).queue('fx', function(){
			_scroll.call(this)
			$(this).dequeue()
		})
	} else {
		_scroll.call(this[0])
	}
	
	return this
}
})(jQuery);