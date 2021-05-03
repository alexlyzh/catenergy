import {touchEventChecker} from "./main.js";

document.addEventListener('DOMContentLoaded', () => {

    const slider = document.querySelector('.slider')
    const input = document.getElementById('fat-cat-slim')
    const line = slider.querySelector('.slider__line')
    const pin = slider.querySelector('.slider__pin')
    const fatCat = slider.querySelector('.slider__pic-before')
    const beforeBtn = document.getElementById('before-btn')
    const afterBtn = document.getElementById('after-btn')
    const movePinHandler = (event) => {
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

            let sliderResize = getInnerPosition(slider)
            let sliderLimiter = (slider.clientWidth - line.clientWidth) / 2
            if (sliderResize > slider.clientWidth - sliderLimiter) {
                sliderResize = slider.clientWidth - sliderLimiter + 50 // 50 пикселей добавлены, чтобы не обрезать тень от кота
            }
            fatCat.style.width = sliderResize + "px"
        }
    }

// Кнопки ДО и ПОСЛЕ
    function showState(ev) {
        if (ev.target.getAttribute('id') === 'before-btn') {
            if (window.innerWidth >=748) {
                pin.style.left = '100%'
                input.setAttribute('value', '100')
                fatCat.style.width = '100%'
            }
        } else {
            pin.style.left = '0'
            input.setAttribute('value', '0')
            fatCat.style.width = '0%'
        }
    }

    beforeBtn.addEventListener('click', showState)
    afterBtn.addEventListener('click', showState)

// Отслеживаем смещение слайдера касанием
    pin.addEventListener('touchstart', () => {
        document.addEventListener('touchmove', movePinHandler)
        document.addEventListener('touchend', () => {
            document.removeEventListener('touchmove', movePinHandler);
        });
    })

// Отслеживаем смещение слайдера мышью
    pin.addEventListener('mousedown', () => {
        document.addEventListener('mousemove', movePinHandler)
        document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', movePinHandler);
        });
    })

// Мобильная версия. При переходе в моб. версию первым делом устанавливаем ширину картинки жирного кота = 100%
    window.addEventListener('resize', () => {
        if (window.innerWidth < 748) {
            fatCat.style.width = '100%'
            pin.style.left = '100%'
            input.setAttribute('value', '100')
        }
    })
})




