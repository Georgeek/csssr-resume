import $ from 'jquery';

// Пример данных: [название, проценты]
const data = [
	// ['Не владею'],
	// ['Использую готовые решения', 19],
	// ['Использую готовые решения и умею их переделывать', 48],
	['Пишу сложный JS с нуля']
];

const sliderElem = document.getElementById('line');
const thumbElem = sliderElem.children[0];

// Основная функция. Здесь рисуется скроллбар
function makeCircles() {
	// Не рисуем скролбар, если в массиве всего 1 цифра. Иначе зачем нам рисовать?
	if (data.length < 2) {
		$('#line').hide();
		$('#span').show().text(data[0][0]);
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

	$('.circle:nth-child(4)').addClass('active');
}

function selectDate(selector) {
	const $selector = '#' + selector;

	$('.active').removeClass('active');
	$($selector).addClass('active');
}

makeCircles();

$('.circle').mouseenter(function () {
	$(this).addClass('hover');
});

$('.circle').mouseleave(function () {
	$(this).removeClass('hover');
});

$('.circle').click(function () {
	const spanNum = $(this).attr('id');
	selectDate(spanNum);
	console.dir(thumbElem.onmousedown);
	thumbElem.onmousedown;
});

function getCoords(elem) {
	const box = elem.getBoundingClientRect();
	return {
		left: box.left + pageXOffset
	};
}

thumbElem.onmousedown = function (e) {
	const thumbCoords = getCoords(thumbElem);
	const	shiftX = e.pageX - thumbCoords.left;
	const	sliderCoords = getCoords(sliderElem);

	document.onmousemove = function (el) {
	// вычесть координату бегунка (newLeft),
		let newLeft = el.pageX - shiftX - sliderCoords.left;
		const rightEdge = sliderElem.offsetWidth - thumbElem.offsetWidth;

		// опрееляем крайнюю точку слева и справа
		if (newLeft < 0) {
			newLeft = -7;
		}
		if (newLeft > rightEdge) {
			newLeft = rightEdge + 5;
		}
		// Смещаем бегунок на новую координату
		thumbElem.style.left = newLeft + 'px';
	};

	// отпускаем кнопку мыши - останавливаем функцию mousemove
	document.onmouseup = () => {
		document.onmousemove = document.onmouseup = null;
	};

	return false;
};

// отключаем возможность браузера своим методом перетаскивать элемент. Я буду использовать стандартный = mousemove
thumbElem.ondragstart = () => {
	return false;
};
