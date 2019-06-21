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
}

function deactivatePage() {
  mapElement.classList.add('map--faded');
  addFormElement.classList.add('ad-form--disabled');
  filtersElement.classList.add('map__filters--disabled');
  addDisabledAttributes(adFormFieldsets);
}

function getOffsetRect(element) {
  var box = element.getBoundingClientRect();
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
  var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
  var clientTop = document.documentElement.clientTop || document.body.clientTop || 0;
  var clientLeft = document.documentElement.clientLeft || document.body.clientLeft || 0;
  var top = box.top + scrollTop - clientTop;
  var left = box.left + scrollLeft - clientLeft;
  return {top: Math.round(top), left: Math.round(left)};
}

function addStartPinCoordinates() {
  var startPinCoordinates = getOffsetRect(mapPinMainElement);
  var startPinMiddleX = startPinCoordinates.top + START_PIN_WIDTH * 0.5;
  var startPinMiddleY = startPinCoordinates.left - START_PIN_HEIGHT * 0.5;
  addFormAddressInputElement.value = startPinMiddleX + ', ' + startPinMiddleY;
}

var mapPinMainElement = document.querySelector('.map__pin--main');
mapPinMainElement.addEventListener('mouseup', function () {
  activatePage();
  renderPins(pins);
  addStartPinCoordinates();
});

var mapElement = document.querySelector('.map');
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
