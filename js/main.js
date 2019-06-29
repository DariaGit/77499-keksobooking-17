'use strict';

var MAP_WIDTH = 1200;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var PIN_LIMIT_Y_START = 130;
var PIN_LIMIT_Y_END = 630;
var ACCOMODATION_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalo'
];
var AVATARS_LIMIT = 8;
var PINS_LIMIT = 8;
var PIN_LEG_HEIGHT = 22;

var RoomTypeMinPriceMap = {
  bungalo: 0,
  flat: 1000,
  house: 5000,
  palace: 10000
};

var isPageActive;

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
  var topOffset = isPageActive ? mainPinRect.height + PIN_LEG_HEIGHT : mainPinRect.height / 2;

  return {
    top: Math.round(mainPinRect.top - mapRect.top + topOffset),
    left: Math.round(mainPinRect.left - mapRect.left + mainPinRect.width / 2)
  };
}

function addStartPinCoordinates() {
  var coordinates = calculateMainPinCoords();
  addFormAddressInputElement.value = coordinates.left + ', ' + coordinates.top;
}

function updateFormPriceAttributes(evt) {
  var type = evt;
  formPriceElement.setAttribute('min', RoomTypeMinPriceMap[type]);
  formPriceElement.setAttribute('placeholder', RoomTypeMinPriceMap[type]);
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
var formTypeElement = document.querySelector('#type');
var formPriceElement = document.querySelector('#price');
var formTimeInElement = document.querySelector('#timein');
var formTimeOutElement = document.querySelector('#timeout');
var avatarURLs = createAvatarURLs(AVATARS_LIMIT);
var pins = createPins(PINS_LIMIT);

formTypeElement.addEventListener('change', function (evt) {
  updateFormPriceAttributes(evt.target.value);
});

formTimeInElement.addEventListener('change', function (evt) {
  formTimeOutElement.selectedIndex = evt.target.selectedIndex;
});

formTimeOutElement.addEventListener('change', function (evt) {
  formTimeInElement.selectedIndex = evt.target.selectedIndex;
});

deactivatePage();
addStartPinCoordinates();
updateFormPriceAttributes(formTypeElement.value);


