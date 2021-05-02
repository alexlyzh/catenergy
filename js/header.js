import {debounce, isScrolled} from "./main.js";

document.addEventListener('DOMContentLoaded', () => {

// Получаем ссылки на DOM-элементы
    const header = document.querySelector('.header');
    const button = document.querySelector('.header__button');
    const cross = document.getElementById('cross');
    const menu = document.getElementById('menu');
    const nav = document.querySelector('.menu');
    const navList = document.querySelector('.menu__list');
    const navLinks = document.querySelectorAll('.menu__link');
    document.addEventListener('keydown', onEscPress);

    function closeHeaderMenu() {
        menu.classList.remove('header__icon--invisible');
        cross.classList.add('header__icon--invisible');
        nav.classList.add('menu--closed');
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
    })


// Закрываем меню-бургер при переключении в режимы планшета или десктопа
    const hideMobileMenu = debounce(function () {
        if (window.innerWidth >= 748) {
            nav.classList.add('menu--closed');
            menu.classList.remove('header__icon--invisible');
            cross.classList.add('header__icon--invisible');
        }
    }, 600);
    window.addEventListener('resize', hideMobileMenu);

// Меняем стили header при скролле

    const restyleHeader = () => {
        if (isScrolled()) {
            header.classList.remove('header--transparent');
            header.classList.add('header--page-scrolled');
            navList.classList.add('menu__list--modified');
            navLinks.forEach(el => {
                el.classList.add('menu__link--modified');
            });
        }
        if (!isScrolled()) {
            header.classList.add('header--transparent');
            header.classList.remove('header--page-scrolled');
            navList.classList.remove('menu__list--modified');
            navLinks.forEach(el => {
                el.classList.remove('menu__link--modified');
            });
        }
    }
    restyleHeader()

    window.addEventListener('scroll', restyleHeader)

// Прячем/показываем header при скроллах вверх-вниз - тиснуто отсюда: https://frontips.ru/skryvaem-pokazyvaem-header-pri-prokrutke/
    const onScrollHeader = () => {

        const header = document.querySelector('.header')
        let prevScroll = window.pageYOffset
        let currentScroll

        window.addEventListener('scroll', () => {
            currentScroll = window.pageYOffset
            const headerHidden = () => header.classList.contains('header--hidden')
            if (currentScroll > prevScroll && !headerHidden() && currentScroll > 40) {
                // скролл > 50 нужен, чтобы не спешить прятать header в самом верху страницы
                header.classList.add('header--hidden')
            }
            if (currentScroll < prevScroll && headerHidden()) {
                header.classList.remove('header--hidden')
            }
            prevScroll = currentScroll
        })
    }

    onScrollHeader()

})


