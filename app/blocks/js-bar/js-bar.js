'use strict';

$(document).on('ready', function() {
	$( '#slider' ).slider({
		value: 153,
		min: 0,
		max: 800,
		step: 1
	});
});
