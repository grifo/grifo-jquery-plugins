/* 
 * jQuery.autotab
 *
 * Copyright 2011, Grifo Tecnologia
 * Licensed under the MIT License 
 *
 * simple tab behaviour with anchor
 * @author Jean Carlo Emer <jean@gri.fo>
 *
 */
 ;(function($){
	$.fn.autotab = function(opts){
		var options = $.extend({
			parent: 'form',
			elements: ['input', 'select', 'textarea', 'button', 'a'],
			itens: function(target){
				return $(target).closest(options.parent)
					.find(options.elements.join(','));
			},

			refresh: false,
			mask_set: '_',
			mask_to: '',
			maxlength_track: 100
		}, opts);


		return this.each(function(){
			var self = $(this),
				maxlength = self.attr('maxlength'),
				itens;
			
			if(maxlength && maxlength <= options.maxlength_track){
				self.focus(function(){
					self.data('printable', false);
					(options.refresh || !itens) && (itens = options.itens(self));
				});

				self.keypress(function(e){
					self.data('printable', e.which !== 0 && e.charCode !== 0);
				});

				self.keyup(function(e){
					if(
						self.data('printable') &&
						self.val().replace(options.mask_set, options.mask_to).length >= maxlength
					)
						itens.eq(itens.index(self) + 1).focus();
				});
			}
		});
	}
})(jQuery);