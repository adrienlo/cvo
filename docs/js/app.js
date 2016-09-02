'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// import throttle from 'throttle';

window.lazySizesConfig = window.lazySizesConfig || {};
window.lazySizesConfig.loadMode = 1;
window.lazySizesConfig.expand = 10;

(function (window) {
	var doc = window.document;
	var body = doc.body;

	function init() {
		var toggles = doc.querySelectorAll('.menu--toggle');

		[].concat(_toConsumableArray(toggles)).forEach(function (toggle) {
			toggle.addEventListener('click', function () {
				body.classList.toggle('menu--open');
			});
		});

		bindEvents();
	}

	function bindEvents() {
		// document.addEventListener('mousewheel', throttle(() => {
		// 	console.log('hi')
		// }, 500), { passive: true });
	}

	doc.addEventListener('DOMContentLoaded', init);
})(window);