((window) => {
	const doc = window.document;
	const body = doc.body;

	function init() {
		const toggles = document.querySelectorAll('.menu--toggle');

		Array.from(toggles).forEach((toggle) => {
			toggle.addEventListener('click', () => {
				body.classList.toggle('menu--open');
			});
		});
	}

	doc.addEventListener('DOMContentLoaded', init);
})(window);
