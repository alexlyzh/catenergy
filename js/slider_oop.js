import {debounce, touchEventChecker} from "./main.js";

document.addEventListener('DOMContentLoaded', () => {

    const cSlider = document.querySelector('.slider')
    const input = document.getElementById('fat-cat-slim')
    const line = cSlider.querySelector('.slider__line')
    const pin = cSlider.querySelector('.slider__pin')
    const fatCat = cSlider.querySelector('.slider__pic-before')
    const beforeBtn = document.getElementById('before-btn')
    const afterBtn = document.getElementById('after-btn')

    const slider = {
        container: document.querySelector('.slider'),
        input: document.querySelector('#fat-cat-slim'),
        line: document.querySelector('.slider__line'),
        pin: document.querySelector('.slider__pin'),
        fatCat: document.querySelector('.slider__pic-before'),
        beforeBtn: document.querySelector('#before-btn'),
        afterBtn: document.querySelector('#after-btn'),
        /**
         *
         * @param event
         */
        movePinHandler(event) {
            const evMove = touchEventChecker(event)
            if (window.innerWidth >= 748) {

                const getInnerPosition = (el) => {
                    return evMove.clientX - el.getBoundingClientRect().left
                }

                let pinPosition = getInnerPosition(line)
                let progress = Math.round(pinPosition / line.clientWidth * 100)

                if (progress < 0) {
                    progress = 0
                }
                if (progress > 100) {
                    progress = 100
                }

                pin.style.left = progress + "%"
                input.setAttribute('value', progress.toString())

                let sliderResize = getInnerPosition(cSlider)
                let sliderLimiter = (cSlider.clientWidth - line.clientWidth) / 2
                if (sliderResize > cSlider.clientWidth - sliderLimiter) {
                    sliderResize = cSlider.clientWidth - sliderLimiter + 50 // 50 пикселей, чтобы не обрезать тень от кота
                }
                fatCat.style.width = sliderResize + "px"
            }
        },
        showState(ev) { // Кнопки ДО и ПОСЛЕ
            if (ev.target.getAttribute('id') === 'before-btn') {
                pin.style.left = '100%'
                pin.classList.remove('slider__pin--after')
                input.setAttribute('value', '100')
                fatCat.style.width = '100%'
            } else {
                pin.style.left = '0'
                pin.classList.add('slider__pin--after')
                input.setAttribute('value', '0')
                fatCat.style.width = '0%'
            }
        },
    }



    beforeBtn.addEventListener('click', showState)
    afterBtn.addEventListener('click', showState)

// Отслеживаем смещение слайдера касанием
    pin.addEventListener('touchstart', () => {
        pin.addEventListener('touchmove', movePinHandler)
        pin.addEventListener('touchend', () => {
            pin.removeEventListener('touchmove', movePinHandler);
        });
    })

// Отслеживаем смещение слайдера мышью
    pin.addEventListener('mousedown', () => {
        pin.addEventListener('mousemove', movePinHandler)
        pin.addEventListener('mouseup', () => {
            pin.removeEventListener('mousemove', movePinHandler);
        });
    })

// // Мобильная версия. При переходе в моб. версию первым делом включаем слайд жирного кота
//     const setFatCat = debounce(function () {
//         if (window.innerWidth < 748) {
//             fatCat.style.width = '100%'
//             pin.style.left = '100%'
//             pin.classList.remove('slider__pin--after')
//             input.setAttribute('value', '100')
//         }
//     }, 600)
//
//     window.addEventListener('resize', setFatCat)
})




