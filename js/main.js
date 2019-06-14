'use strict';

var typesOfAccommodation = ['palace', 'flat', 'house', 'bungalo'];
var MAP_WIDTH = 1200;
var Y_START = 130;
var Y_END = 630;
var mapPins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('button');
var pins;

function shuffle(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[j];
    array[j] = array[i];
    array[i] = temp;
  }
  return array;
}

function getRandomElement(array) {
  for (var i = 0; i < array.length; i++) {
    var randomIndex = Math.floor(Math.random() * array.length);
    var randomElement = array[randomIndex];
  }
  return randomElement;
}

function getRandomNumber (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

function getAvatars (avatarsCount) {
  var avatarUrls = [];

  for (var i = 1; i < avatarsCount + 1; i++) {
    avatarUrls.push('img/avatars/user0' + i + '.png');
  }
  return avatarUrls;
}

function getMapsPin () {
 return {
    'author': {
      'avatar': getRandomElement(getAvatars (8))
    },
    "offer": {
      "type": getRandomElement(typesOfAccommodation)
    },

    "location": {
      "x": getRandomNumber (0, 1200),
      "y": getRandomNumber (Y_START, Y_END)
    }
  }
}

function renderAllPins (count) {
  var allPins = [];

  for (var i = 0; i < count; i++) {
    allPins.push(getMapsPin());
  }
  return shuffle(allPins);
}

function addPinsOnMap () {
  pins = renderAllPins(8);

  for (var i = 0; i < pins.length; i++) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style = 'left: ' + pins[i].location.x + 'px; top: ' + pins[i].location.y + 'px;';
    var pinImg = pinElement.querySelector('img');
    pinImg.src = pins[i].author.avatar;
    pinElement.alt = 'заголовок объявления ' + i;
    mapPins.appendChild(pinElement);
  }
}

addPinsOnMap();
document.querySelector('.map').classList.remove('map--faded');
