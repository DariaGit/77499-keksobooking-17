'use strict';

(function () {
  var AVATARS_LIMIT = 8;
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var PIN_LIMIT_Y_START = 130;
  var PIN_LIMIT_Y_END = 630;
  var MAP_WIDTH = 1200;
  var ACCOMODATION_TYPES = [
    'palace',
    'flat',
    'house',
    'bungalo'
  ];

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

  window.createPin = function createPin(index) {
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
  };

  var avatarURLs = createAvatarURLs(AVATARS_LIMIT);
})();
