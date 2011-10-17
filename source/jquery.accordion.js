/* 
 * jQuery.accordion
 *
 * Copyright 2010, Grifo Tecnologia
 * Licensed under the MIT License 
 *
 * expandable items
 * should be applied to a list of items, i.e. $('#contents li').accordion()
 * @author Ricardo Tomasi <ricardo.tomasi@grifotecnologia.com.br>
 *
 */
;(function($){
$.fn.accordion = function(opts){

	var o = $.extend({
	    links   : ':header'
	  , content : '.content'
	  , closed  : 'closed'
	}, opts)

	var content_all = this.find(o.content)
	  , elements = this

	content_all.eq(0).show()
	elements.slice(1).addClass(o.closed)

	return this.each(function(){

		var self = $(this)
		  , link = self.find(o.links).css({ cursor: 'pointer' }).attr('tabindex', 0)
		  , ctn = self.find(o.content)

		link.bind('mousedown keydown', function(e){
			// abrir somente com enter/espaço/down
			if (e.type == 'keydown' && $.inArray(e.which, [13,32,40]) < 0) return
				
			content_all.not(ctn).slideUp('fast')
			ctn.stop(true,true).slideToggle()
			
			self.toggleClass(o.closed)
			elements.not(self).addClass(o.closed)
			
			return false
		})

	})
}
})(jQuery);
