import $ from 'jquery';

// Пример данных: [название, проценты]
const datas = [
	['Не владею'],
	['Использую готовые решения', 19],
	['Использую готовые решения и умею их переделывать', 48],
	['Пишу сложный JS с нуля']
];

function Slider(options) {
	const elemId = '#'+ options.elemId || lineCont;
	const max = options.max || 100;
	const data = options.data || null;

	let shiftX;

	const elem = $(elemId);
	const $thumbElem = $('#thumb');

	// Создаем в контейнере линию и бегунок для слайдера
	elem.append(`<div id="line">
								<span id="thumb"></span>
							</div>`);

	$('#thumb').css("left", 0 - ($('#thumb').outerWidth() / 4) + 'px');
	// Здесь рисуются вехи скроллбара
	// // Не рисуем скролбар, если в массиве всего 1 цифра. Иначе зачем нам рисовать?
	if (data.length < 2) {
		$('#line').hide();
		$('.span').show().text(data[0][0]);

		// Рисуем, если в массиве 2 или более цифры
	}else if (data.length >= 2) {
		let i;
		// Объявляем первый и последний элемент массива
		const first = data[0][0];
		const last = data[data.length - 1][0];

		// Рисуем начальную точку скролбара
		$('#line').append(`
			<div class='circle' id='circle0' style='left: 0%;'>
				<div class="js-bar__text"> ${first} </div>
			</div>
		`);

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

	$('.circle:nth-child(3)').addClass('active');

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

	$('#thumb').mousedown(function(el) {
		startDrag(el.clientX);
		return false; // может надо удалить это...
	});

	function startDrag(startClientX) {
		document.addEventListener('mousemove', onMouseMove);
		document.addEventListener('mouseup', onMouseUp);
	}

	function dragThumb(clientX) {
		let lineCoords = $('#line').position().left;
		let leftCoord = clientX - lineCoords - ($('#thumb').innerWidth() / 2);

		let leftEdge = 0 - ($('#thumb').outerWidth() / 4);
		if (leftCoord < leftEdge) {
			leftCoord = leftEdge
		}
		let rigthEdge = $('#line').outerWidth() - ($('#thumb').outerWidth() / 2);
		if (leftCoord > rigthEdge) {
			leftCoord = rigthEdge;
		}

		$('#thumb').css('left', leftCoord + 'px');
	}
}

const slider = new Slider({
	elemId: 'lineCont',
	data: datas
});
