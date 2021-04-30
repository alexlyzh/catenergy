// Получаем ссылки DOM-элементы
const header = document.querySelector('.header');
const button = document.querySelector('.header__button');
const cross = document.getElementById('cross');
const menu = document.getElementById('menu');
const nav = document.querySelector('.menu');
const navList = document.querySelector('.menu__list');
const navLinks = document.querySelectorAll('.menu__link');
document.addEventListener('keydown', onEscPress);

function isScrolled() {
    return document.documentElement.scrollTop > 0;
}

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

// Объявляем дебаунсер
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

// Закрываем меню-бургер при переключении в режимы планшета или десктопа
const hideMobileMenu = debounce(function() {
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
        header.classList.add('header--shift');
        navList.classList.add('menu__list--modified');
        navLinks.forEach(el => {
            el.classList.add('menu__link--modified');
        });
    }
    if (!isScrolled()) {
        header.classList.add('header--transparent');
        header.classList.remove('header--shift');
        navList.classList.remove('menu__list--modified');
        navLinks.forEach(el => {
            el.classList.remove('menu__link--modified');
        });
    }
}

window.addEventListener('scroll', restyleHeader)
