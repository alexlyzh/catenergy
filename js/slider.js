const slider = document.querySelector('.slider')
const input = document.getElementById('fat-cat-slim')
const line = slider.querySelector('.slider__line')
const pin = slider.querySelector('.slider__pin')
const fatCat = slider.querySelector('.slider__pic-before')
const beforeBtn = document.getElementById('before-btn')
const afterBtn = document.getElementById('after-btn')


// Отслеживаем смещение слайдера мышью
pin.addEventListener('mousedown', () => {

    const movePinHandler = (evMove) => {
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
        // if (sliderResize < sliderLimiter) {
        //     sliderResize = 0
        // }
        if (sliderResize > slider.clientWidth - sliderLimiter) {
            sliderResize = slider.clientWidth - sliderLimiter + 50
        }
        fatCat.style.width = sliderResize + "px"
    }

    document.addEventListener('mousemove', movePinHandler)

    document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', movePinHandler);
    });
})


