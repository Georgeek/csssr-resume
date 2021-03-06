;(function ($, global) {

	$.fn.gslider = function (data, initValue = 40) {

		// Если массив не передан или пустой, выводим ошибку
		if (!data || data.length < 1) {
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

		if (initValue < 0 || initValue > 100 || typeof initValue !== 'number') {
			throw 'Введите число от 0 до 100';
		}

		// Объявляем первый и последний элемент массива
		const first = data[0][0];
		const last = data[data.length - 1][0];

		// объявляем
		// слайдер, бегунок, выравнивание бегунка по левому и правому краю
		let thumbOffsetLeft, thumbOffsetRight;
		// положение бегунка будем хранить в sessionStorage
		let valPercent = sessionStorage.getItem('valPercent');
		let leftCoord;

		// Создаем в контейнере линию и бегунок для слайдера
		this.append(`
			<div class="gslider">
				<div class="gslider__input">
					<span class="gslider__thumb"></span>
					<input type="hidden" name="slidervalue" value="" />
				</div>
				<div class="gslider__container">
					<div class="gslider__line"></div>
				</div>
			</div>
		`);

		let $line = $('.gslider__line');
		let $input = $('.gslider__input');
		let $thumbElem = $('.gslider__thumb');

		// Здесь рисуются вехи скроллбара
		// // Не рисуем скролбар, если длина массива меньше 2. Иначе зачем нам рисовать?
		if (data.length < 2) {
			$line.hide();
			this.append(`<span class="gslider__span"> ${data[0][0]} </span>`);
			throw 'Длина массива меньше 2';

		// Рисуем, если в массиве 2 или более цифры
		}else if (data.length >= 2) {
			let i;

			// Рисуем начальную точку скролбара
			$line.append(`
				<div class='gslider__split' style='left: 0%; top: 32px'>
					<div class="gslider__text"> ${first} </div>
				</div>
			`);

			// Циклом проходим через промежуточные данные
			for (i = 1; i < data.length - 1; i++) {
				// Рисуем промежуточные данные, где data[i][1] - это проценты на которые элемент сместится в скроллбаре
				$line.append(`
					<div class='gslider__split gslider__split--middle' style='left: ${data[i][1]}%; top: 30px'>
						<div class="gslider__text"> ${data[i][0]} </div>
					</div>
				`);
			}

			// Рисуем конец скролбара
			$line.append(`
				<div class='gslider__split' style='top: 37px'>
					<div class="gslider__text gslider__text--last"> ${last} </div>
				</div>
			`);

			// определяем начальное положение бегунка
			if (!sessionStorage.valPercent) {
				$thumbElem.css('left', initValue + '%');
			}
			$thumbElem.css('left', valPercent + '%');
		}

		// отцентровываем бегунок по левому и правому краю
		thumbOffsetLeft = $thumbElem.outerWidth() / 4;
		thumbOffsetRight = $thumbElem.outerWidth() / 2;

		// Здесь описывается движение бегунка
		function onMouseMove(e) {
			dragThumb(e.clientX);
			onSetSessionStorage(e.clientX);
		}

		// При отпускании кнопки мыши мы заканчиваем слушать события и запоминаем конечную координату
		function onMouseUp() {
			endDrug();
			onGetSessionStorage();
		}

		// любые изменения положения бегунка записываем в sessionStorage
		function onSetSessionStorage() {
			sessionStorage.setItem('valPercent', valPercent);
		}

		// присваиваем конечное положение бегунка в переменную, чтобы после перезагрузки страницы бегунок появился на том же месте
		function onGetSessionStorage() {
			valPercent = sessionStorage.getItem('valPercent');
		}

		// заканчиваем слушать события мыши
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

		// здесь вычисляется координата бегунка относительно линии слайдера
		function dragThumb(clientX) {
			const lineCoords = $input.position().left;
			leftCoord = clientX - lineCoords - thumbOffsetRight;

			// центруем бегунок по левому краю слайдера
			const leftEdge = 1 - thumbOffsetLeft;
			if (leftCoord <= leftEdge) {
				leftCoord = leftEdge;
			}

			// центруем бегунок по правому краю слайдера
			const rigthEdge = $input.outerWidth() - thumbOffsetRight;
			if (leftCoord >= rigthEdge) {
				leftCoord = rigthEdge;
			}

			valPercent = ((leftCoord - leftEdge) / (rigthEdge - leftEdge) * 100).toFixed(2);

			// раскомментировать для проверки значений бегунка
			// console.log(rigthEdge, leftCoord, leftEdge, valPercent);

			// изменяем положение бегунка
			$thumbElem.css('left', valPercent + '%');
			$('input[name=slidervalue]').val(valPercent);
		}

		// делаем chainable
		return this;

	};
}( $, window ));
