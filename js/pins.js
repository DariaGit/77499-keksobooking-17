'use strict';

(function () {
  // var AVATARS_LIMIT = 8;
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  // var PIN_LIMIT_Y_START = 130;
  // var PIN_LIMIT_Y_END = 630;
  // var MAP_WIDTH = 1200;
  // var ACCOMODATION_TYPES = [
  //   'palace',
  //   'flat',
  //   'house',
  //   'bungalo'
  // ];

  // function generateRandomNumber(min, max) {
  //   return Math.round(Math.random() * (max - min) + min);
  // }

  // function getRandomElement(array) {
  //   var randomIndex = generateRandomNumber(0, array.length - 1);
  //   return array[randomIndex];
  // }

  // function createAvatarURLs(avatarsCount) {
  //   var urls = [];
  //   for (var i = 1; i < avatarsCount + 1; i++) {
  //     urls.push('img/avatars/user0' + i + '.png');
  //   }
  //   return urls;
  // }

  var testPins = window.load('https://js.dump.academy/keksobooking/data');

  function createPin() {
    return {
      'author': {
        'avatar': testPins.author.avatar
      },
      'offer': {
        'type': testPins.offer.type
      },
      'location': {
        'x': testPins.location.x - PIN_WIDTH / 2,
        'y': testPins.Location.y - PIN_HEIGHT / 2
      }
    };
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


  // var avatarURLs = createAvatarURLs(AVATARS_LIMIT);
  var mapPinsElement = document.querySelector('.map__pins');
  var pinTemplateElement = document.querySelector('#pin').content.querySelector('button');

  window.pins = {
    render: function (pins) {
      var fragment = document.createDocumentFragment();

      pins.forEach(function (pin, index) {
        fragment.appendChild(
            createPinElement(pin, index)
        );
      });

      mapPinsElement.appendChild(fragment);
    },
    create: function (limit) {
      var pins = [];
      for (var i = 0; i < limit; i++) {
        pins.push(createPin(i));
      }

      return pins;
    }
  };
})();
