import {debounce, isScrolled} from "./main.js";

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
const hideMobileMenu = debounce(function () {
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
        if (isScrolled()) {
            if (page.dataset.page === 'index') {
                setHeaderTransparency('remove');
                navList.classList.add('menu__list--modified');
                navLinks.forEach(el => {
                    el.classList.add('menu__link--modified');
                });
            }
            header.classList.add('header--page-scrolled');

        }
        if (!isScrolled()) {
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


