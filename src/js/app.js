// import throttle from 'throttle';

window.lazySizesConfig = window.lazySizesConfig || {};
// window.lazySizesConfig.loadMode = 1;
// window.lazySizesConfig.expand = 100;

((window) => {
	const doc = window.document;
	const body = doc.body;

	function init() {
		const toggles = doc.querySelectorAll('.menu--toggle');

		[...toggles].forEach(toggle => {
			toggle.addEventListener('click', () => {
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
