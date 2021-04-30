// Яндекс карта
const ymap = document.getElementById(`map`)

if (ymap) {
    const mapCenter = [59.938818, 30.323139]
    const mapZoom = 17

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
