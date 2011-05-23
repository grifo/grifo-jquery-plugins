/* 
 * jQuery.innerLabel
 *
 * Copyright 2010, Grifo Tecnologia
 * Licensed under the MIT License 
 *
 * like a placeholder, but sexier
 * @author Ricardo Tomasi <ricardo.tomasi@grifotecnologia.com.br>
 *
 */
;(function($){
$.fn.innerLabel = function(opts){

	var options = $.extend({
	    focusClass  : 'focus'
	  , filledClass : 'filled'
	}, opts)

	return this.each(function(){

		var self = $(this)
		  , parentItem = self.closest('li')
		  , siblings = parentItem.siblings('li')

		self.focus(function(){
			parentLI.addClass( options.focusClass )
			siblingsLI.removeClass( options.focusClass )
		})

		$.browser.msie && $.browser.version < 9 && self.bind('focusout', function(){
			parentLI.removeClass( options.focusClass )
		})

		self.bind('keyup change', function(){
			if (self.val().length == 0) {
				parentLI.removeClass( options.filledClass )
			} else {
				parentLI.addClass( options.filledClass )
			}
		})

		parentLI.find('label').bind('mousedown touchstart', function(e) {
			e.preventDefault()
			self.focus()
		})

	})
}
})(jQuery);