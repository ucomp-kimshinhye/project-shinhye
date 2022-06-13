/**
 * @module 
 */
function findElement(selector, target, height) {
	var elem = document.querySelector(selector);
	if (!elem) return;

	document.querySelector(target).style.setProperty('padding-bottom', height);
}
// findElement('.content-util', '#page', '56rem');


function buiFormDncrementor(elem) {
	const formElem = elem.parentElement.querySelector('.form-elem');
	formElem.stepDown();
}

function buiFormIncrementor(elem) {
	const formElem = elem.parentElement.querySelector('.form-elem');
	formElem.stepUp();
}

/**
 * @module form buiFormCheckValue
 */
function buiFormCheckValue(formElem) {
	formElem.value.length > 0 ? formElem.classList.add('typed') : formElem.classList.remove('typed');
}

/**
 * @module form buiFormCancel
 */
function buiFormCancel(formElem) {
	if (formElem.readOnly) return;

	// check value
	buiFormCheckValue(formElem);
	formElem.addEventListener('input', function(e) {
		buiFormCheckValue(formElem);
	});

	// form util
	var formUtil = formElem.parentElement.querySelector('.form-func');
	if(!formUtil) {
		formUtil = document.createElement('span');
		formUtil.classList.add('form-func');
		formElem.parentElement.appendChild(formUtil);
	}

	// form cancel
	var formCancel = formElem.parentElement.querySelector('.form-cancel');
	if(!formCancel) {
		formCancel = document.createElement('span');
		formCancel.classList.add('form-cancel');
		formUtil.prepend(formCancel);
	}

	formElem.style.paddingRight = formUtil.offsetWidth + 'rem';

	var xStart = formUtil.offsetLeft + formCancel.offsetLeft;
	var yStart = formUtil.offsetTop + formCancel.offsetTop;
	var xEnd = xStart + formCancel.offsetWidth;
	var yEnd = yStart + formCancel.offsetHeight;

	formElem.addEventListener('mousemove', function(e) {
		if (formElem.classList.contains('typed')) {
			if (e.offsetX >= xStart && e.offsetX <= xEnd && e.offsetY >= yStart && e.offsetY <= yEnd) {
				formElem.style.setProperty('cursor', 'default');
			} else {
				formElem.style.removeProperty('cursor');
			}
		}
	});

	formElem.addEventListener('click', function(e) {
		if (formElem.classList.contains('typed')) {
			if (e.offsetX >= xStart && e.offsetX <= xEnd && e.offsetY >= yStart && e.offsetY <= yEnd) {
				formElem.value = '';
				formElem.classList.remove('typed');
				formElem.style.removeProperty('cursor');
			}
		}
	});
}

/**
 * @layout checkDevice
 */
function checkDevice() {
	if(navigator.userAgent.match(/Mobile/)) {
		document.querySelector('html').classList.remove('laptop');
		document.querySelector('html').classList.add('mobile');
	
	} else {
		document.querySelector('html').classList.remove('mobile');
		document.querySelector('html').classList.add('laptop');
	}
}
checkDevice();


/**
 * @layout checkScrollStart
 */

function checkScrollStart() {
	var elem = document.querySelector('#header');
	if (!elem) return;

	window.scrollY > 0 ? elem.classList.add('scroll-start') : elem.classList.remove('scroll-start');
	window.addEventListener('scroll', function() {
		window.scrollY > 0 ? elem.classList.add('scroll-start') : elem.classList.remove('scroll-start');
	});
 }

/**
 * @module buiToggle contentsPopup
 */
const contentsPopup = new buiToggle('[data-bui-toggle="contentsPopup"]', {
	inactiveButton: true,
	inactiveButtonClass: 'btn popup-close',
	inactiveButtonText: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px"><title>닫기</title><path d="M17.29,15.88c.39,.39,.39,1.02,0,1.41-.39,.39-1.02,.39-1.41,0l-3.88-3.88-3.88,3.88c-.39,.39-1.02,.39-1.41,0-.39-.39-.39-1.02,0-1.41l3.88-3.88-3.88-3.88c-.39-.39-.39-1.02,0-1.41,.39-.39,1.02-.39,1.41,0l3.88,3.88,3.88-3.88c.39-.39,1.02-.39,1.41,0,.39,.39,.39,1.02,0,1.41l-3.88,3.88,3.88,3.88Z"/></svg>',
	inactiveButtonArea: '.popup-local-func .button-area',
	reactTarget: 'html',
	reactTargetActiveClass: 'active-content-popup',
	focusin: true,
	onloadCallBack: function(myToggle) {
		const popupFuncContainer = myToggle.toggleTarget.querySelector('.popup-local');
		const popupFunc = document.createElement('div');
		popupFunc.className = 'popup-local-func'
		popupFunc.innerHTML = '<span class="button-area"></span>';
		popupFuncContainer.appendChild(popupFunc);
	},	
	activeBeforeCallBack: function(myToggle) {
		myToggle.toggleTarget.classList.add('enabled');
	},	
	inactiveAfterCallBack: function(myToggle) {
		setTimeout(function() {
			myToggle.toggleTarget.classList.remove('enabled');
		}, 250);
	}
});


/**
 * @module buiExpand postItem
 */
 const expandBoard = new buiExpand('[data-bui-expand="expandBoard"]', {
	accordion: false,
	activeClass: 'active',
	buttonClass: 'btn module-a expand',
	buttonText: '<span class="btn-text">자세히보기</span>',
	buttonActiveText: '<span class="btn-text">닫기</span>',
	buttonAppendTo: '.board-subject',
	targetClass: 'bui-expand-target',
	eventCallBack: function() {
		// 상품 상세 > 상품 옵션
		if (document.querySelector('#orderDisplay')) {
			orderDisplay.refresh();
		}
	},
});

/**
 * @name dataFinder
 */
function dataFinder(selector, reactTarget) {
	var datafinder = document.querySelector(selector);
	if (!datafinder) return;
	var dataForm = datafinder.querySelector('.select .form-elem');
	var reactTarget = document.querySelector(reactTarget);
	
	// focus event
	dataForm.addEventListener('focusin', function() {
		datafinder.classList.add('focus-within');
		reactTarget.classList.add('active-data-finder');
	});

	document.addEventListener('keydown', function(event) {
		if(event.keyCode === 9) {
			if (datafinder.querySelector('*:focus') != null) {
				datafinder.classList.add('focus-within');
				reactTarget.classList.add('active-data-finder');
			} else {
				datafinder.classList.remove('focus-within');
				reactTarget.classList.remove('active-data-finder');
			}
		}
	});

	document.addEventListener('mouseup', function(event) {
		if (!datafinder.contains(event.target)) {
			datafinder.classList.remove('focus-within');
			reactTarget.classList.remove('active-data-finder');
			dataForm.blur();
		}
	});
}
dataFinder('#orderOptions', 'html');