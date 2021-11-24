/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/header.js":
/*!**********************!*\
  !*** ./js/header.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./js/utils.js");


// Получаем ссылки на DOM-элементы
const header = document.querySelector('.header');
const button = document.querySelector('.header__button');
const cross = document.getElementById('cross');
const menu = document.getElementById('menu');
const nav = document.querySelector('.menu');
const navList = document.querySelector('.menu__list');
const navLinks = document.querySelectorAll('.menu__link');
const menuOverlay = document.querySelector('.menu-overlay');
document.addEventListener('keydown', onEscPress);

function closeHeaderMenu() {
    menu.classList.remove('header__icon--invisible');
    cross.classList.add('header__icon--invisible');
    nav.classList.add('menu--closed');
    menuOverlay.classList.remove('menu-overlay--open');
}

function onEscPress(evt) {
    if (evt.keyCode === 27) {
        closeHeaderMenu();
    }
}

// Открываем/закрываем меню-бургер
button.addEventListener('click', () => {
    menu.classList.toggle('header__icon--invisible');
    cross.classList.toggle('header__icon--invisible');
    nav.classList.toggle('menu--closed');
    menuOverlay.classList.toggle('menu-overlay--open');
});


// Закрываем меню-бургер при переключении в режимы планшета или десктопа
const hideMobileMenu = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.debounce)(function () {
    if (window.innerWidth >= 748) {
        closeHeaderMenu();
    }
}, 600);
window.addEventListener('resize', hideMobileMenu);

// Меняем стили header при скролле
const setHeaderTransparency = method => {
    header.classList[method]('header--transparent');
}

const restyleHeader = () => {
    const page = document.querySelector('.page');
        if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.isScrolled)()) {
            if (page.dataset.page === 'index') {
                setHeaderTransparency('remove');
                navList.classList.add('menu__list--modified');
                navLinks.forEach(el => {
                    el.classList.add('menu__link--modified');
                });
            }
            header.classList.add('header--page-scrolled');

        }
        if (!(0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.isScrolled)()) {
            if (page.dataset.page === 'index') {
                setHeaderTransparency('add');
                navList.classList.remove('menu__list--modified');
                navLinks.forEach(el => {
                    el.classList.remove('menu__link--modified');
                });
            }
            header.classList.remove('header--page-scrolled');
        }
}
restyleHeader();

window.addEventListener('scroll', restyleHeader);

// Прячем/показываем header при скроллах вверх-вниз - тиснуто отсюда: https://frontips.ru/skryvaem-pokazyvaem-header-pri-prokrutke/
const onScrollHeader = () => {

    let prevScroll = window.pageYOffset;
    let currentScroll;

    window.addEventListener('scroll', ()=> {
        currentScroll = window.pageYOffset;
        const isHeaderHidden = () => header.classList.contains('header--hidden');
        if (currentScroll > prevScroll && !isHeaderHidden() && currentScroll > 80) {
            // скролл > 80 нужен, чтобы не спешить прятать header в самом верху страницы
            header.classList.add('header--hidden');
            closeHeaderMenu();
        }
        if (currentScroll < prevScroll && isHeaderHidden()) {
            header.classList.remove('header--hidden');
        }
        if (currentScroll < prevScroll && !menu.classList.contains('menu--closed')) {
            closeHeaderMenu();
        }
        prevScroll = currentScroll;
    })
}

onScrollHeader();

menuOverlay.addEventListener('click', closeHeaderMenu);




/***/ }),

/***/ "./js/slider.js":
/*!**********************!*\
  !*** ./js/slider.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./js/utils.js");


const slider = document.querySelector('.slider');
if (slider) {
    const SLIDER_TABLET_WIDTH = 690;
    const input = document.getElementById('fat-cat-slim');
    const line = slider.querySelector('.slider__line');
    const pin = slider.querySelector('.slider__pin');
    const catsContainer = slider.querySelector('.slider__cats');
    const fatCatPic = slider.querySelector('.slider__pic-before');
    const slimCatImg = slider.querySelector('.slider__img-after');
    const beforeBtn = document.getElementById('before-btn');
    const afterBtn = document.getElementById('after-btn');

    function setSmoothMode(method) {
        pin.classList[method]('slider__pin--smooth');
        fatCatPic.classList[method]('slider__pic-before--smooth');
        slimCatImg.classList[method]('slider__img-after--smooth');
    }

    function movePinHandler(evt) {
        setSmoothMode('remove');
        const moveEvent = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.checkTouchEvent)(evt);
        if (window.innerWidth >= 748) {
            /**
             * Находим расстояние от курсора до левой границы элемента.
             * @param el Элемент
             * @returns {number} px
             */
            function getLeftBorderDistance(el) {
                return moveEvent.clientX - el.getBoundingClientRect().left;
            }

            let pinPosition = getLeftBorderDistance(line);
            let pinProgress = Math.round(pinPosition / line.clientWidth * 100);

            if (pinProgress < 0) {
                pinProgress = 0;
            }
            if (pinProgress > 100) {
                pinProgress = 100;
            }

            pin.style.left = pinProgress + '%';
            input.setAttribute('value', pinProgress.toString());

            fatCatPic.style.width = Math.min(getLeftBorderDistance(slider),SLIDER_TABLET_WIDTH) + 'px';
            slimCatImg.style.clip = `rect(auto, auto, auto, ${Math.min(getLeftBorderDistance(slider) < 0 ? 0 : getLeftBorderDistance(slider),SLIDER_TABLET_WIDTH)}px)`;
        }
    }

    function showBefore() {
        pin.style.left = '100%';
        pin.classList.remove('slider__pin--after');
        input.setAttribute('value', '100');
        fatCatPic.style.width = '100%';
        slimCatImg.style.clip = `rect(auto, auto, auto, ${SLIDER_TABLET_WIDTH}px)`;
        slider.dataset.state = '0';
    }
    function showAfter() {
        pin.style.left = '0';
        pin.classList.add('slider__pin--after');
        input.setAttribute('value', '0');
        fatCatPic.style.width = '0%';
        slimCatImg.style.clip = `rect(auto, auto, auto, 0px)`;
        slider.dataset.state = '1';
    }

    /**
     * Переключаем котов ДО и ПОСЛЕ в зависимости от data-state формы слайдера
     */
    function toggleCats() {
        if (window.innerWidth < 748) {
            if (slider.dataset.state === '0') {
                showAfter();
                return;
            }
            if (slider.dataset.state === '1') {
                showBefore();
            }
        }
    }
    catsContainer.addEventListener('touchstart', toggleCats);
    catsContainer.addEventListener('mousedown', toggleCats);
// Кнопки ДО и ПОСЛЕ
    function showState(evt) {
        if (evt.target.getAttribute('id') === 'before-btn') {
            showBefore();
        } else {
            showAfter();
        }
    }

    beforeBtn.addEventListener('click', showState);
    afterBtn.addEventListener('click', showState);



// Отслеживаем смещение слайдера касанием
    pin.addEventListener('touchstart', () => {
        document.addEventListener('touchmove', movePinHandler);
        document.addEventListener('touchend', () => {
            document.removeEventListener('touchmove', movePinHandler);
            setSmoothMode('add');
            if (input.value < 50) {
                showAfter();
            } else if (input.value > 50) {
                showBefore();
            }
        });
    });

// Отслеживаем смещение слайдера мышью
    pin.addEventListener('mousedown', () => {
        document.addEventListener('mousemove', movePinHandler);
        document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', movePinHandler);
            setSmoothMode('add');
            if (input.value < 50) {
                showAfter();
            } else if (input.value > 50) {
                showBefore();
            }
        });
    });

// // Мобильная версия. При переходе в моб. версию первым делом включаем слайд жирного кота
    const setFatCat = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.debounce)(function () {
        if (window.innerWidth < 748) {
            showBefore();
        }
    }, 600);

    window.addEventListener('resize', setFatCat);
}


/***/ }),

/***/ "./js/utils.js":
/*!*********************!*\
  !*** ./js/utils.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "debounce": () => (/* binding */ debounce),
/* harmony export */   "isScrolled": () => (/* binding */ isScrolled),
/* harmony export */   "checkTouchEvent": () => (/* binding */ checkTouchEvent)
/* harmony export */ });
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

function isScrolled() {
    return document.documentElement.scrollTop > 0;
}

function checkTouchEvent(event) {
    if (event.changedTouches) {
        return event.changedTouches[0];
    }
        return event;
}



/***/ }),

/***/ "./js/ymap.js":
/*!********************!*\
  !*** ./js/ymap.js ***!
  \********************/
/***/ (() => {

// Яндекс карта
const ymap = document.getElementById(`map`)

if (ymap) {
    function init() {
        const myMap = new ymaps.Map(
            `map`, {
                center: [59.938818, 30.323139],
                zoom: 17,
            }, {
                searchControlProvider: `yandex#search`
            }
        );

        myMap.behaviors.disable('scrollZoom');

        let myPlacemark = new ymaps.Placemark([59.938818, 30.323139], {
            hintContent: 'Cat Energy',
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'img/map-pin.svg',
            iconImageSize: [57, 53]
        });

        myMap.geoObjects.add(myPlacemark);
    }

    ymaps.ready(init)
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./js/utils.js");
/* harmony import */ var _header__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./header */ "./js/header.js");
/* harmony import */ var _slider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./slider */ "./js/slider.js");
/* harmony import */ var _ymap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ymap */ "./js/ymap.js");
/* harmony import */ var _ymap__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_ymap__WEBPACK_IMPORTED_MODULE_3__);





})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map