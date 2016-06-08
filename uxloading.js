/*
The MIT License (MIT)
Copyright (c) 2016 David Falconer

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

window.UXLoading = (function() {
	// Option filtering
	function take(a, b) {
		if (typeof(a) === 'undefined') return b;
		if (typeof(b) === 'undefined') return a;
		if (a === null) return b;
		return a;
	};

	var _p = {};

	// Defaults
	_p.defaults = {
		title: 'Loading',
		message: '',
		template:
			'<div class="ux-loading">' +
				'<div class="ux-body">' +
				 	'<div class="animation">' +
						'<div class="spinner"></div>' +
					'</div>' +
					'<h3>{{title}}</h3>' +
					'<p>{{message}}</p>' +
				'</div>' +
			'</div>'
	};

	// Functions
	// Show
	_p.show = function(selector, title, message) {
		title = take(title, _p.defaults.title);
		message = take(message, _p.defaults.message);


		// Prepare our html
		var template = _p.defaults.template;
		template = template.replace('{{title}}', title);
		template = template.replace('{{message}}', message);

		// Trick as old as time -- append our template as innerHTML of a DOM
		// to quickly generate the elements.
		// NOTE Rumours have been spotted claiming some elements don't work
		// with this method e.g. td, tr etc.
		var sneakyDiv = document.createElement('div');
		sneakyDiv.innerHTML = template;

		// Create a document fragment to hold our elements
		var frag = document.createDocumentFragment();
		var ele = null;

		// Append generated elements to our document fragment
		while (ele = sneakyDiv.firstChild) {
			frag.appendChild(ele);
		}

		// Select our elements to attach our loading HMTL to
		var elements = document.querySelectorAll(selector);

		// Loop through the elements and append our class and HMTL
		for (var i = 0; i < elements.length; i++) {
			var element = elements[i];
			element.className += " ux-loading-container";
			element.appendChild(frag);
		}
	};

	// Hide
	_p.hide = function(selector) {
		var elements = document.querySelectorAll(selector);
		for (var i = 0; i < elements.length; i++) {
			var element = elements[i];

			// Remove our class
			// Review the regex @ regex101.com to fully understand how it works
			// Simply put, (start of string OR whitespace)ux-loading-container(next char can't be whitespace)
			element.className = element.className.replace(/(?:^|\s)ux-loading-container(?!\S)/, '');

			// Remove child element
			var childElement = element.querySelector('.ux-loading');
			if (childElement != null) {
				childElement.remove();
			}
		}
	};

	_p.hideAll = function() {
		_p.hide('.ux-loading-container');
	}

	return {
		show: _p.show,
		hide: _p.hide,
		hideAll: _p.hideAll
	};
})();
