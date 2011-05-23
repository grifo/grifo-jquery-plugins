/* 
 * jQuery.tabs
 *
 * Copyright 2010, Grifo Tecnologia
 * Licensed under the MIT License 
 *
 * simple tab behaviour
 * @author Ricardo Tomasi <ricardo.tomasi@grifotecnologia.com.br>
 *
 */
;(function($){
$.fn.tabs = function(opts){
	
	var options = $.extend({
	    tabs     : '.tabs'
	  , content  : '.tab-content'
	  , active   : 'ativo'
	  , show     : showDefault
	  , hide     : hideDefault
	  , onchange : null
	}, opts)
	
	function showDefault(){
		$(this).show()
	}
	
	function hideDefault(){
		$(this).hide()
	}

	return this.each(function(){

		var root = $(this)
		  , tabs = root.find( opts.tabs )
		  , li = tabs.find('li')
		  , links = tabs.find('a')
		  , content = root.find( opts.content )
		  , classes = $.map(content, function(el){ return 'tab-'+el.id; }).join(' ')

		links.click(function(e, init){

			var self = $(this)
			  , targetID = self.attr('href')
			  , target = $(targetId)

			root.removeClass( classes ).addClass( 'tab-'+targetID.substring(1).replace(/\W/g,'') )

			content.each( opts.hide )
			target.each( init ? showDefault : opts.show )

			li.removeClass( opts.active )
			self.parent().addClass( opts.active )

			self.delay(200).blur()

			opts.onchange && opts.onchange.call && opts.onchange( this, target )

			return false
		})

		links.eq(0).trigger('click', [true])
	})
}
})(jQuery);