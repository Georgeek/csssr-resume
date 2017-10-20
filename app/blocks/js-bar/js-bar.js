import $ from 'jquery';

// Пример данных: [название, проценты]
const datas = [
	['Не владею'],
	['Использую готовые решения', 19],
	['Использую готовые решения и умею их переделывать', 48],
	['Пишу сложный JS с нуля']
];

function Slider(options) {
	const elem = options.elem;
	const max = options.max || 100;
	const data = options.data || null;

	let sliderCoords, thumbCoords, shiftX;

	// Создаем в контейнере линию и бегунок для слайдера
	const thumbElem = line;
	const line = document.createElement('div');
	const thumb = document.createElement('div');
	elem.appendChild(line);
	line.setAttribute('id', 'line');
	thumb.className = 'thumb';
	line.appendChild(thumb);

		// Здесь рисуются вехи скроллбара
	(function() {
		// Не рисуем скролбар, если в массиве всего 1 цифра. Иначе зачем нам рисовать?
		if (data.length < 2) {
			const span = document.createElement('div');
			// прячем скроллбар
			line.hidden = true;
			// создаем элемент спан и вставляем его в id/класс --- переписать
			elem.appendChild(span);
			span.className = "span";
			span.innerHTML = data[0][0];

			// Рисуем, если в массиве 2 или более цифры
		}else if (data.length >= 2) {
			let i;
			// Объявляем первый и последний элемент массива
			const first = data[0][0];
			const last = data[data.length - 1][0];
			const firstTestEl = document.createElement('div');
			const firstElement = `<div class="js-bar__text"> ${first} </div>`;
			firstTestEl.innerHTML = firstElement;
			firstTestEl.className = 'circle';
			firstTestEl.setAttribute('id', 'circle0');
			firstTestEl.setAttribute('style', 'left: 0%;');

			// Рисуем начальную точку скролбара
			line.appendChild(firstTestEl);

			// Циклом проходим через промежуточные данные
			for (i = 1; i < data.length - 1; i++) {
				// Рисуем промежуточные данные, где data[i][1] - это проценты на которые элемент сместится в скроллбаре
				$('#line').append(`
					<div class='circle' id='circle${i}' style='left: ${data[i][1]}%;'>
						<div class="js-bar__text"> ${data[i][0]} </div>
					</div>
				`);
			}

			// Рисуем конец скролбара
			$('#line').append(`
				<div class='circle' id='circle${i}' style='left: 99%;'>
					<div class="js-bar__text"> ${last} </div>
				</div>
			`);
		}

		$('.circle:nth-child(4)').addClass('active');
	}());

	// makeCircles();

	// const pixelPerValue = (elem.clientWidth - thumbElem.clientWidth) / max;

	// elem.ondragstart = function () {
	// 	return false;
	// };

	// function onDocumentMouseMove(e) {
	// 	moveTo(e.clientX);
	// }

	// function onDocumentMouseUp() {
	// 	endDrag();
	// }

	// function startDrag(startClientX) {
	// 	thumbCoords = thumbElem.getBoundingClientRect();
	// 	shiftX = startClientX - thumbCoords.left;

	// 	sliderCoords = elem.getBoundingClientRect();

	// 	document.addEventListener('mousemove', onDocumentMouseMove);
	// 	document.addEventListener('mouseup', onDocumentMouseUp);
	// }

	// elem.onmousedown = function (event) {
	// 	if (event.target.closest('.thumb')) {
	// 		startDrag(event.clientX, event.clientY);

	// 		// отключаем изменение курсора в начале выделения
	// 		return false;
	// 	}
	// };

	// function positionToValue(left) {
	// 	return Math.round(left / pixelPerValue);
	// }

	// function moveTo(clientX) {
	// 	// определяем координату родителя
	// 	let newLeft = clientX - shiftX - sliderCoords.left;

	// 	// если курсор ушел вне слайдера
	// 	if (newLeft < 0) {
	// 		newLeft = 0 - 7;
	// 	}

	// 	const rigthEdge = elem.offsetWidth - thumbElem.offsetWidth;
	// 	if (newLeft > rigthEdge) {
	// 		newLeft = rigthEdge + 5;
	// 	}

	// 	thumbElem.style.left = newLeft + 'px';

	// 	elem.dispatchEvent(new CustomEvent('slide', {
	// 		bubbles: true,
	// 		detail: positionToValue(newLeft)
	// 	}));
	// }

	// function endDrag() {
	// 	document.removeEventListener('mousemove', onDocumentMouseMove);
	// 	document.removeEventListener('mouseup', onDocumentMouseUp);

	// 	elem.dispatchEvent(new CustomEvent('change', {
	// 		bubbles: true,
	// 		detail: positionToValue(parseInt(thumbElem.style.left, 10))
	// 	}));
	// }

	// function valueToPosition(value) {
	// 	return pixelPerValue * value;
	// }

	// function setValue(value) {
	// 	thumbElem.style.left = valueToPosition(value) + 'px';
	// }

	// this.setValue = setValue;
}

const sliderElem = document.getElementById('lineCont');
const slider = new Slider({
	elem: sliderElem,
	max: 5000,
	data: datas
});


	// sliderElem.addEventListener('slide', function(event) {
	// 	document.getElementById('slide').innerHTML = event.detail;
	// });

	// sliderElem.addEventListener('change', function(event) {
	// 	document.getElementById('change').innerHTML = event.detail;
	// });
