export function random(min, max) {
	return Math.round(min - 0.5 + Math.random() * (max - min + 1));
}

export const addElemNode = (elem, classElem, textContent) =>
	new DOMParser().parseFromString(
		`<${elem} class=${classElem}>${textContent}</${elem}>`,
		'text/html'
	).body.firstChild;
