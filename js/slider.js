import {debounce, touchEventChecker} from "./main.js";

document.addEventListener('DOMContentLoaded', () => {

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
            const moveEvent = touchEventChecker(evt);
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
        const setFatCat = debounce(function () {
            if (window.innerWidth < 748) {
                showBefore();
            }
        }, 600);

        window.addEventListener('resize', setFatCat);
    }
});




