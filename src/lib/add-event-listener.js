export default function addEventListener(el, eventType, callback) {
	el.addEventListener(eventType, callback);
	return function() {
		el.removeEventListener(eventType, callback);
	}
}