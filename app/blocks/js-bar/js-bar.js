const sliderElem = document.getElementById('slider');
const thumbElem = sliderElem.children[0];

function getCoords(elem) {
	const box = elem.getBoundingClientRect();
	return {
		top: box.top + pageYOffset,
		left: box.left + pageXOffset
	};
}

thumbElem.onmousedown = function (e) {
	const thumbCoords = getCoords(thumbElem);
	const	shiftX = e.pageX - thumbCoords.left;
	const	sliderCoords = getCoords(sliderElem);

	document.onmousemove = function (el) {
		let newLeft = el.pageX - shiftX - sliderCoords.left;
		const rightEdge = sliderElem.offsetWidth - thumbElem.offsetWidth;
		if (newLeft < 0) {
			newLeft = 0;
		}

		if (newLeft > rightEdge) {
			newLeft = rightEdge;
		}

		thumbElem.style.left = newLeft + 'px';
	};

	document.onmouseup = () => {
		document.onmousemove = document.onmouseup = null;
	};

	return false;
};

thumbElem.ondragstart = () => {
	console.log('click DRAG');
	return false;
};


