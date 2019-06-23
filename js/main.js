'use strict';

var MAP_WIDTH = 1200;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var PIN_LIMIT_Y_START = 130;
var PIN_LIMIT_Y_END = 630;
var START_PIN_WIDTH = 156;
var START_PIN_HEIGHT = 156;
var ACCOMODATION_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalo'
];
var AVATARS_LIMIT = 8;
var PINS_LIMIT = 8;
var PIN_LEG_HEIGHT = 22;

var isPageActive = false;

function generateRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomElement(array) {
  var randomIndex = generateRandomNumber(0, array.length - 1);
  return array[randomIndex];
}

function createAvatarURLs(avatarsCount) {
  var urls = [];
  for (var i = 1; i < avatarsCount + 1; i++) {
    urls.push('img/avatars/user0' + i + '.png');
  }
  return urls;
}

function createPin(index) {
  return {
    'author': {
      'avatar': avatarURLs[index % avatarURLs.length]
    },
    'offer': {
      'type': getRandomElement(ACCOMODATION_TYPES)
    },
    'location': {
      'x': generateRandomNumber(PIN_WIDTH / 2, MAP_WIDTH - PIN_WIDTH / 2),
      'y': generateRandomNumber(PIN_LIMIT_Y_START, PIN_LIMIT_Y_END - PIN_HEIGHT)
    }
  };
}

function createPins(limit) {
  var pins = [];

  for (var i = 0; i < limit; i++) {
    pins.push(createPin(i));
  }

  return pins;
}

function createPinElement(pin, index) {
  var pinElement = pinTemplateElement.cloneNode(true);
  var pinImageElement = pinElement.querySelector('img');

  pinElement.style.left = pin.location.x + 'px';
  pinElement.style.top = pin.location.y + 'px';
  pinElement.alt = 'заголовок объявления ' + index;

  pinImageElement.src = pin.author.avatar;

  return pinElement;
}

function renderPins(pins) {
  var fragment = document.createDocumentFragment();

  pins.forEach(function (pin, index) {
    fragment.appendChild(
        createPinElement(pin, index)
    );
  });

  mapPinsElement.appendChild(fragment);
}

function addDisabledAttribute(element) {
  element.setAttribute('disabled', 'disabled');
}

function addDisabledAttributes(elements) {
  elements.forEach(addDisabledAttribute);
}

function removeDisabledAttribute(element) {
  element.removeAttribute('disabled');
}

function removeDisabledAttributes(elements) {
  elements.forEach(removeDisabledAttribute);
}

function activatePage() {
  mapElement.classList.remove('map--faded');
  addFormElement.classList.remove('ad-form--disabled');
  filtersElement.classList.remove('map__filters--disabled');
  removeDisabledAttributes(adFormFieldsets);
  isPageActive = true;
}

function deactivatePage() {
  mapElement.classList.add('map--faded');
  addFormElement.classList.add('ad-form--disabled');
  filtersElement.classList.add('map__filters--disabled');
  addDisabledAttributes(adFormFieldsets);
  isPageActive = false;
}

function calculateMainPinCoords() {
  var mainPinRect = mapPinMainImageElement.getBoundingClientRect();
  var mapRect = mapPinsElement.getBoundingClientRect();

  return {
    top: mainPinRect.top - mapRect.top,
    left: mainPinRect.left - mapRect.left,
    height: mapRect.height,
    width: mapRect.width
  };
}

function addStartPinCoordinates() {
  var startPinCoordinates = calculateMainPinCoords();
  var startPinMiddleX;
  var startPinMiddleY;

  if (isPageActive === false) {
    startPinMiddleX = Math.round(startPinCoordinates.top + START_PIN_WIDTH * 0.5);
    startPinMiddleY = Math.round(startPinCoordinates.left - START_PIN_HEIGHT * 0.5);
  } else {
    startPinMiddleX = Math.round(startPinCoordinates.top + START_PIN_WIDTH * 0.5);
    startPinMiddleY = Math.round(startPinCoordinates.left - START_PIN_HEIGHT + PIN_LEG_HEIGHT);
  }

  addFormAddressInputElement.value = startPinMiddleX + ', ' + startPinMiddleY;
}

var mapPinMainElement = document.querySelector('.map__pin--main');
mapPinMainElement.addEventListener('mouseup', function () {
  activatePage();
  renderPins(pins);
  addStartPinCoordinates();
});

var mapElement = document.querySelector('.map');
var mapPinMainImageElement = document.querySelector('.map__pin--main img');
var addFormElement = document.querySelector('.ad-form');
var adFormFieldsets = addFormElement.querySelectorAll('fieldset');
var addFormAddressInputElement = addFormElement.querySelector('input[name="address"]');
var filtersElement = document.querySelector('.map__filters');
var mapPinsElement = document.querySelector('.map__pins');
var pinTemplateElement = document.querySelector('#pin').content.querySelector('button');
var avatarURLs = createAvatarURLs(AVATARS_LIMIT);
var pins = createPins(PINS_LIMIT);

deactivatePage();
addStartPinCoordinates();

