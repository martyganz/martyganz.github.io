let scale = false;

window.onload = () => {
    let places = loadPlaces();
    renderPlaces(places);
    renderHUD();
    renderEgg();
};

function loadPlaces() {
    return [
        {
            id: 1,
            name: 'Mart\s huis',
            location: {
                lat: 52.237535,
                lng: 6.492181,
            },
        },
        {
            id: 2,
            name: 'De Kroon',
            location: {
                lat: 52.236017,
                lng: 6.494519,
            },
        },
        {
            id: 3,
            name: 'Rick',
            location: {
                lat: 52.237746,
                lng: 6.491500
            }
        },
        {
            id: 4,
            name: 'Markelose berg',
            location: {
                lat: 52.237207,
                lng: 6.491522
            }
        },
        {
            id: 5,
            name: 'Wijngaard',
            location: {
                lat: 52.231482,
                lng: 6.487487
            }
        },
        {
            id: 6,
            name: 'Kistemaker',
            location: {
                lat: 52.234632,
                lng: 6.492949
            }
        }
    ];
}

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');
    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;

        renderEgg(scene, latitude, longitude, place.id);
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

function renderHUD () {
    let camera = document.querySelector('a-camera');
    let basketModel = document.createElement('a-entity');
    basketModel.setAttribute('gltf-model', './models/basket/scene.gltf');
    basketModel.setAttribute('position', '0 -1.6 -5');
    basketModel.setAttribute('scale', '0.25 0.25 0.25');
    basketModel.setAttribute('rotation', '0 180 0');

    camera.appendChild(basketModel);
}

function renderEgg(scene, latitude, longitude, id) {
    let scale = '1';
    let eggModel = document.createElement('a-entity');
    eggModel.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
    eggModel.setAttribute('gltf-model', './models/easter-egg/egg.gltf');
    eggModel.setAttribute('position', '0 -1 0');
    eggModel.setAttribute('scale', `${scale} ${scale} ${scale}`);
    eggModel.setAttribute('rotation', '0 180 0');
    eggModel.setAttribute('emitevents', 'true');
    eggModel.setAttribute('cursor', 'rayOrigin: mouse');
    eggModel.setAttribute('id', `easter-egg-${id}`);

    eggModel.addEventListener('loaded', () => {
        window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
    });

    eggModel.addEventListener('click', (ev, target) => {
        console.log(ev, target);
    });

    eggModel.addEventListener('touchstart', (ev, target) => {
        alert('vet');
    })

    scene.appendChild(eggModel);
}
