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
        parent: 'form'
      , elements: 'input, select, textarea, button, a'
      , items: function(target){
            return $(target).closest(options.parent).find(options.elements)
        }
      , refresh: false
      , maskSet: '_'
      , maskTo: ''
      , maxlengthTrack: 100
    }, opts)

    return this.each(function(){
        var self = $(this)
          , maxlength = self.attr('maxlength')
          , items
        
        if (!maxlength || maxlength > options.maxlengthTrack) return
        
        self.focus(function(){
            self.data('printable', false)
            if (options.refresh || !items){
                items = options.items(self)
            }
        })

        self.keypress(function(e){
            self.data('printable', e.which !== 0 && e.charCode !== 0)
        })

        self.keyup(function(e){
            if (self.data('printable')
                && self.val().replace(options.maskSet, options.maskTo).length >= maxlength
            ){
                items.eq(items.index(self) + 1).focus()
            }
        })
    })
}
})(jQuery);
