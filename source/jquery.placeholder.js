/* 
 * jQuery.placeholder
 *
 * Copyright 2010, Grifo Tecnologia
 * Licensed under the MIT License 
 *
 * Shim for the placeholder attribute, works on password fields
 * @author Ricardo Tomasi <ricardo.tomasi@grifotecnologia.com.br>
 *
 */
;(function($){
$.fn.placeholder = function(opts){
	
	var options = $.extend({
	    attr       : 'placeholder'
	  , emptyClass : 'empty'
	}, opts)
	
	// test for native support
	if (options.attr === 'placeholder' && 'placeholder' in document.createElement('input'))
		return this

	return this.each(function(){

		var input = $(this)
			, text = input.attr(options.textSource)
			, isPassword = input.attr('type') === 'password'
			, replaced

		if (!text)
			return

		// replace password input with type=text to show placeholder text
		// reverts back to type=password when focused
		if (isPassword) {
			replaced = $('<input type="text" />')
				.attr({ value: text, className: input[0].className })
				.insertAfter( input.hide() )
		}

		input.closest('form').submit(function(){
			input.trigger('focus')
		})

		input.val(text).addClass(options.emptyClass)

		input.focus(function(){
			if (input.val() == text)
				input.val("").removeClass(options.emptyClass)
		})

		input.blur(function(){
			if ($.trim(this.value) != ""){
				return
			}
			if (isPassword)
				input.after(replaced).hide()
			else
				input.val(text).addClass(options.emptyClass)
		})

		if (isPassword){
		 	replaced.addClass(options.emptyClass).focus(function(){
				replaced.detach()
				input.show().focus()
			})
		}

	})
}
})(jQuery);