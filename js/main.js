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
var adFormFieldsets = [];

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

function addDisabledAttribute(elem) {
  elem.setAttribute('disabled', 'disabled');
}

function addDisabledAttributes(elems) {
  for (var i = 0; i < elems.length; i++) {
    addDisabledAttribute(elems[i]);
  }
}

function removeDisabledAttribute(elem) {
  elem.removeAttribute('disabled');
}

function removeDisabledAttributes(elems) {
  for (var i = 0; i < elems.length; i++) {
    removeDisabledAttribute(elems[i]);
  }
}

function activatePage() {
  mapElement.classList.remove('map--faded');
  addFormElement.classList.remove('ad-form--disabled');
  filtersElement.classList.remove('map__filters--disabled');
  renderPins(pins);
  removeDisabledAttributes(adFormFieldsets);
}

function deactivatePage() {
  mapElement.classList.add('map--faded');
  addFormElement.classList.add('ad-form--disabled');
  filtersElement.classList.add('map__filters--disabled');
  addDisabledAttributes(adFormFieldsets);
}

function getOffsetRect(elem) {
  var box = elem.getBoundingClientRect();
  var body = document.body;
  var docElem = document.documentElement;
  var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
  var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;
  var clientTop = docElem.clientTop || body.clientTop || 0;
  var clientLeft = docElem.clientLeft || body.clientLeft || 0;
  var top = box.top + scrollTop - clientTop;
  var left = box.left + scrollLeft - clientLeft;
  return {top: Math.round(top), left: Math.round(left)};
}

function getStartPinCoordinates() {
  var startPinCoordinates = getOffsetRect(mapPinMainElement);
  var startPinMiddleX = startPinCoordinates.top + START_PIN_WIDTH * 0.5;
  var startPinMiddleY = startPinCoordinates.left - START_PIN_HEIGHT * 0.5;
  addFormAddressInput.value = startPinMiddleX + ', ' + startPinMiddleY;
}

var mapPinMainElement = document.querySelector('.map__pin--main');
mapPinMainElement.addEventListener('mouseup', function () {
  activatePage();
  getStartPinCoordinates();
});

var mapElement = document.querySelector('.map');
var addFormElement = document.querySelector('.ad-form');
adFormFieldsets = addFormElement.querySelectorAll('fieldset');
var addFormAddressInput = addFormElement.querySelector('input[name="address"]');
var filtersElement = document.querySelector('.map__filters');
var mapPinsElement = document.querySelector('.map__pins');
var pinTemplateElement = document.querySelector('#pin').content.querySelector('button');
var avatarURLs = createAvatarURLs(AVATARS_LIMIT);
var pins = createPins(PINS_LIMIT);

deactivatePage();
getStartPinCoordinates();
