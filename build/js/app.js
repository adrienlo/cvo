'use strict';

(function (window) {
	var doc = window.document;
	var body = doc.body;

	function init() {
		var toggles = document.querySelectorAll('.menu--toggle');

		Array.from(toggles).forEach(function (toggle) {
			toggle.addEventListener('click', function () {
				body.classList.toggle('menu--open');
			});
		});
	}

	doc.addEventListener('DOMContentLoaded', init);
})(window);