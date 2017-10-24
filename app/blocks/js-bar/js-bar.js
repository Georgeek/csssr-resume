import $ from 'jquery';

// TO DO
// [ ] Обозначить options как объект конструктор?
// [ ] Переделать Slider в класс с методами?
// [ ] При создании вех должны создаваться и отметки для более четкого расположения
// [ ] При клике на имя бегунок должен автоматически смещаться на заданное значение

import { jslevel } from '../../data/data.json';
const datas = jslevel;

function Slider(options) {
	const elemId = '#' + options.elemId;
	const data = options.data || null;

	// объявляем
	// слайдер, бегунок, выравнивание бегунка по левому и правому краю
	let $line, $thumbElem, thumbOffsetLeft, thumbOffsetRight;

	// Создаем в контейнере линию и бегунок для слайдера
	const elem = $(elemId);
	elem.append(`
	<div id="line">
		<span id="thumb"></span>
	</div>`);

	$line = $('#line');
	$thumbElem = $('#thumb');

	// Здесь рисуются вехи скроллбара
	// // Не рисуем скролбар, если длина массива меньше 2. Иначе зачем нам рисовать?
	if (data.length < 2) {
		$line.hide();
		$('.span').show().text(data[0][0]);

		// Рисуем, если в массиве 2 или более цифры
	}else if (data.length >= 2) {
		let i;
		// Объявляем первый и последний элемент массива
		const first = data[0][0];
		const last = data[data.length - 1][0];

		// Рисуем начальную точку скролбара
		$line.append(`
			<div class='circle' id='circle0' style='left: 0%; top: 32px'>
				<div class="js-bar__text"> ${first} </div>
			</div>
		`);

		// Циклом проходим через промежуточные данные
		for (i = 1; i < data.length - 1; i++) {
			// Рисуем промежуточные данные, где data[i][1] - это проценты на которые элемент сместится в скроллбаре
			$line.append(`
				<div class='circle' id='circle${i}' style='left: ${data[i][1]}%; top: 30px'>
					<div class="js-bar__text"> ${data[i][0]} </div>
				</div>
			`);
		}

		// Рисуем конец скролбара
		$line.append(`
			<div class='circle' id='circle${i}' style='top: 37px'>
				<div class="js-bar__text js-bar__text--last"> ${last} </div>
			</div>
		`);
	}

	// отцентровываем бегунок по левому и правому краю
	thumbOffsetLeft = $thumbElem.outerWidth() / 4;
	thumbOffsetRight = $thumbElem.outerWidth() / 2;

	// определяем начальное положение бегунка
	$thumbElem.css('left', datas[1][1] - 0.4 + '%');
	// или тут
	$('#circle2').addClass('active');

	function onMouseMove(e) {
		dragThumb(e.clientX);
	}

	function onMouseUp() {
		endDrug();
	}

	function endDrug() {
		document.removeEventListener('mousemove', onMouseMove);
		document.removeEventListener('mouseup', onMouseUp);
	}

	$thumbElem.mousedown(function (el) {
		startDrag(el.clientX);

		// не выделяет текст при нажатии мышкой
		return false;
	});

	function startDrag(startClientX) {
		document.addEventListener('mousemove', onMouseMove);
		document.addEventListener('mouseup', onMouseUp);
	}

	function dragThumb(clientX) {
		const lineCoords = $line.position().left;
		let leftCoord = clientX - lineCoords - thumbOffsetRight;

		// центруем бегунок по левому краю слайдера
		const leftEdge = 0 - thumbOffsetLeft;
		if (leftCoord < leftEdge) {
			leftCoord = leftEdge;
		}

		// центруем бегунок по правому краю слайдера
		const rigthEdge = $line.outerWidth() - thumbOffsetRight;
		if (leftCoord > rigthEdge) {
			leftCoord = rigthEdge;
		}

		// изменяем положение бегунка
		$thumbElem.css('left', leftCoord + 'px');
	}
}

new Slider({
	elemId: 'lineCont',
	data: datas
});
