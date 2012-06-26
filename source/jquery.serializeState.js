/* 
 * jQuery.serializeState
 *
 * Copyright 2012, Grifo
 * Licensed under the MIT License 
 *
 * save and restore state behaviour
 * @author Renatho De Carli Rosa <renatho@gri.fo>
 *
 */
 
;(function($) {
	$.fn.extend({

		// Serialize state
		serializeState: function(attrs) {
			var attrs = attrs.split(','),
				serializedState = '',
				attr = ''

			// Objects
			$(this).each(function() {
				// Attrs
				for (var attrIndex = 0; attrIndex < attrs.length; attrIndex++) {
					attr = attrs[attrIndex]
					serializedState += attr+'>'+$(this).attr(attr)
					// No last
					serializedState += attrIndex < attrs.length-1 ? '|' : ''
				}
				serializedState += '||'
			})

			return serializedState
		},

		// Restore state
		restoreState: function(serialzedState) {
			var states = serialzedState.split('||'),
				attrs = [],
				attrValue = []

			// Objects
			$(this).each(function(i) {
				attrs = states[i].split('|')

				// Attrs
				for (var indexAttrs = 0; indexAttrs < attrs.length; indexAttrs++) {
					attrValue = attrs[indexAttrs].split('>')
					if (attrValue[1] != 'undefined') {
						$(this).attr(attrValue[0],attrValue[1])
					}
				}
			})
		},

		// Save state
		saveState: function(options) {
			var defaults = { 
				attr: 'class,style', 
				hours: 24*365, 
				path: window.location.href,
				cookieName:'saveState'
			},
			options = $.extend({}, defaults, options)

			modMan.tools.cookie.create(options.cookieName,$(this).serializeState(options.attr),options.hours,options.path);
		},

		// Load state
		loadState: function(cookieName) {
			$(this).restoreState(modMan.tools.cookie.read(cookieName))
		}
	})
})(jQuery)