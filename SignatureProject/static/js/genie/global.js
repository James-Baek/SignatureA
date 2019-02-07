define(function () {
	var PopupOption = Object.freeze({
		NOT_USE: '0',
		USE: '1'
	});

	var DragOption = Object.freeze({
		DRAG: '1',
		CTRL_DRAG: '2',
		ALT_DRAG: '3'
	});

	var TransOption = Object.freeze({
		ICON_BTN: '1',
		DIRECT: '2'
	});

	var isMacOS = navigator.appVersion.indexOf("Mac") != -1;

	return {
		$ajax : null,
		maxTransSize : 2000,
		PopupOption : PopupOption,
		DragOption : DragOption,
		TransOption : TransOption,
		isMacOS : isMacOS
	};
});