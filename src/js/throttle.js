function throttle(fn, threshhold = 250, scope = this) {
	var last;
	var timer;

	return (...args) => {
		var now = +new Date;

		if (last && now < last + threshhold) {
			clearTimeout(timer);
			timer = setTimeout(() => {
				last = now;
				fn.apply(scope, args);
			}, threshhold);
		} else {
			last = now;
			fn.apply(scope, args);
		}
	};
}

export default throttle
