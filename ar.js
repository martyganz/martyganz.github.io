let scale = false;

window.onload = () => {
    let places = loadPlaces();
    renderPlaces(places);
};

function loadPlaces() {
    return [
        {
            name: 'Mart\s huis',
            location: {
                lat: 52.237535,
                lng: 6.492181,
            },
        },
        {
            name: 'De Kroon',
            location: {
                lat: 52.236017,
                lng: 6.494519,
            },
        },
        {
            name: 'Achtertuin',
            location: {
                lat: 52.237746,
                lng: 6.491500
            }
        },
        {
            name: 'Rick',
            location: {
                lat: 52.237207,
                lng: 6.491522
            }
        }
    ];
}

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;

        let model = document.createElement('a-image');
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
        model.setAttribute('src', './images/map-marker.png');
        model.setAttribute('name', place.name);
        model.setAttribute('scale', scale ? '20 20 20' : '5 5 5');
        model.setAttribute('class', 'marker')

        model.addEventListener('loaded', () => {
            window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
        });

        const clickListener = function (ev) {
            ev.stopPropagation();
            ev.preventDefault();

            const name = ev.target.getAttribute('name');
            const el = ev.detail.intersection && ev.detail.intersection.object.el;

            if (el && el === ev.target) {
                const instructionsElement = document.querySelector('.instructions');
                instructionsElement.innerText = name;
            }
        };

        model.addEventListener('click', clickListener);

        scene.appendChild(model);
    });
}

function toggleScale() {
    scale = !scale;
    const elements = document.querySelectorAll('.marker');
    elements.forEach((element) => {
        element.setAttribute('scale', getScale());
    });
}

function getScale() {
    return scale ? '20 20 20' : '5 5 5';
}
