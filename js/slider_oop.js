import {touchEventChecker} from "./main.js";

document.addEventListener('DOMContentLoaded', () => {

class Slider {
    constructor() {
        this.container = document.querySelector('.slider')
        this.input = document.querySelector('#fat-cat-slim')
        this.line = document.querySelector('.slider__line')
        this.pin = document.querySelector('.slider__pin')
        this.fatCat = document.querySelector('.slider__pic-before')
        this.beforeBtn = document.querySelector('#before-btn')
        this.afterBtn = document.querySelector('#after-btn')
    }

    /**
     * Отслеживаем движение ползунка и меняем изображения котов "до и после" на десктоп и планшетной версиях сайта
     * @param event Событие mousemove или touchmove
     * @param sliderContainer HTML-объект слайдера
     */
    movePinHandler(event, sliderContainer) {
        const evMove = touchEventChecker(event)
        /**
         * Найти положение курсора/пальца относительно левой границы элемента
         * @param ev Объект события: тач или мыши
         * @param el Элемент, с которого началось событие
         * @returns {number} Координаты курсора/пальца относительно левой границы viewport минус...
         * координаты начала левой границы элемента, внутри которого находится курсор
         */
        const getInnerPosition = (ev, el) => {
            return ev.clientX - el.getBoundingClientRect().left
        }
        if (window.innerWidth >= 748) {
            let pinPosition = getInnerPosition(evMove, this.line)
            let pinProgress = Math.round(pinPosition / this.line.clientWidth * 100)

            if (pinProgress < 0) {
                pinProgress = 0
            }
            if (pinProgress > 100) {
                pinProgress = 100
            }

            this.pin.style.left = pinProgress + "%"
            this.input.setAttribute('value', pinProgress.toString())

            let sliderResize = getInnerPosition(evMove, this.container)
            let sliderLimiter = (this.container.clientWidth - this.line.clientWidth) / 2
            if (sliderResize > this.container.clientWidth - sliderLimiter) {
                sliderResize = this.container.clientWidth - sliderLimiter + 50 // 50 пикселей, чтобы не обрезать тень от кота
            }
            this.fatCat.style.width = sliderResize + "px"
        }
    }
    /**
     * Кнопки ДО и ПОСЛЕ
     * @param ev Событие click
     */
    showState(ev) {
        if (ev.target.getAttribute('id') === 'before-btn') {
            this.pin.style.left = '100%'
            this.pin.classList.remove('slider__pin--after')
            this.input.setAttribute('value', '100')
            this.fatCat.style.width = '100%'
        } else {
            this.pin.style.left = '0'
            this.pin.classList.add('slider__pin--after')
            this.input.setAttribute('value', '0')
            this.fatCat.style.width = '0%'
        }
    }
}

const slider = new Slider()

slider.beforeBtn.addEventListener('click', slider.showState)
slider.afterBtn.addEventListener('click', slider.showState)

// Отслеживаем смещение слайдера касанием
    slider.pin.addEventListener('touchstart', () => {
        slider.pin.addEventListener('touchmove', slider.movePinHandler)
        slider.pin.addEventListener('touchend', () => {
            slider.pin.removeEventListener('touchmove', slider.movePinHandler)
        });
    })

// Отслеживаем смещение слайдера мышью
    slider.pin.addEventListener('mousedown', () => {
        slider.container.addEventListener('mousemove', slider.movePinHandler)
        slider.pin.addEventListener('mouseup', () => {
            slider.container.removeEventListener('mousemove', slider.movePinHandler)
        })
        document.addEventListener('mouseup', () => {
            slider.container.removeEventListener('mousemove', slider.movePinHandler)
        })
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




