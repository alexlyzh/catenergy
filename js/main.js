// Объявляем дебаунсер
export function debounce(func, wait, immediate) {
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

export function isScrolled() {
    return document.documentElement.scrollTop > 0;
}

// Чтобы отличить событие мыши от тач-события
export function touchEventChecker(event) {
    if (event.changedTouches) {
        return event.changedTouches[0];
    }
        return event;
}
