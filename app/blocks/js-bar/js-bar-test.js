import $ from 'jquery';

// TO DO
// [ ] При создании вех должны создаваться и отметки для более четкого расположения. Взять вехи из Фотошопа
// [ ] При перезагрузке страницы слайдер сохраняет положение бегунка. Подписать комментарии. Изменить localStorage на sessionStorage. Удалить все лишнее
// [ ] При клике на имя бегунок должен автоматически смещаться на заданное значение

import {jslevel}from '../../data/data.json';
const datas = jslevel;

;(function ($, global) {


	$.fn.gslider = function (arr) {

		if (!arr || arr.length < 1) {
			throw `Отсутствуют данные.
			Передайте массив данных в gslider в формате:
			[
				['свойство'],
				['свойство', число],
				...
				['свойство', число],
				['свойство']
			]`;
		}

		const data = arr;
		// Объявляем первый и последний элемент массива
		const first = data[0][0];
		const last = data[data.length - 1][0];

		// объявляем
		// слайдер, бегунок, выравнивание бегунка по левому и правому краю
		let $line, $thumbElem, thumbOffsetLeft, thumbOffsetRight;
		// положение бегунка
		let leftCoord = localStorage.getItem("leftCoord");

		// Создаем в контейнере линию и бегунок для слайдера
		this.append(`
			<div id="line">
				<span id="thumb"></span>
			</div>
		`);

		$line = $('#line');
		$thumbElem = $('#thumb');

		// Здесь рисуются вехи скроллбара
		// // Не рисуем скролбар, если длина массива меньше 2. Иначе зачем нам рисовать?
		if (data.length < 2) {
			$line.hide();
			this.append(`<span class="span"> ${data[0][0]} </span>`);
			throw 'Длина массива меньше 2';

		// Рисуем, если в массиве 2 или более цифры
		}else if (data.length >= 2) {
			let i;

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

			// определяем начальное положение бегунка
			if (localStorage.leftCoord === undefined) {
				$thumbElem.css('left', 141 + 'px');
			}
			$thumbElem.css('left', leftCoord + 'px');
			// или тут
			$('#circle2').addClass('active');
		}

		// отцентровываем бегунок по левому и правому краю
		thumbOffsetLeft = $thumbElem.outerWidth() / 4;
		thumbOffsetRight = $thumbElem.outerWidth() / 2;

		// Здесь описывается движение бегунка
		function onMouseMove(e) {
			dragThumb(e.clientX);
			onSetLocalStorage(e.clientX);
		}

		function onMouseUp() {
			endDrug();
			onGetLocalStorage();
		}

		// записываем
		function onSetLocalStorage(clientX) {
			localStorage.setItem("leftCoord", leftCoord);
		}

		function onGetLocalStorage() {
			leftCoord = localStorage.getItem("leftCoord");
		}

		function endDrug() {
			document.removeEventListener('mousemove', onMouseMove);
			document.removeEventListener('mouseup', onMouseUp);
		}

		// при нажатии на бегунок начинаем слушать события мыши
		$thumbElem.mousedown(function (el) {
			startDrag(el);

			// не выделяет текст при нажатии мышкой
			return false;
		});

		// слушаем события при движении/отпускании кнопки мыши и передаем событие в функции onMouseMove и onMouseUp
		function startDrag() {
			document.addEventListener('mousemove', onMouseMove);
			document.addEventListener('mouseup', onMouseUp);
		}

		function dragThumb(clientX) {
			const lineCoords = $line.position().left;
			leftCoord = clientX - lineCoords - thumbOffsetRight;

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

			// localStorage.setItem("leftCoord", leftCoord);

			// изменяем положение бегунка
			$thumbElem.css('left', leftCoord + 'px');
			// console.log(leftCoord);
		}

		// делаем chainable
		console.log(global.localStorage);
		return this;
	};
}( $, window ));

$('#lineCont').gslider(datas);
