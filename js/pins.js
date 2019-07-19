'use strict';

(function () {
  function createPinElement(pin, index) {
    var pinElement = pinTemplateElement.cloneNode(true);
    var pinImageElement = pinElement.querySelector('img');

    pinElement.style.left = pin.location.x + 'px';
    pinElement.style.top = pin.location.y + 'px';
    pinElement.alt = 'заголовок объявления ' + index;

    pinImageElement.src = pin.author.avatar;

    return pinElement;
  }

  var PINS_LIMIT = 5;
  var mapPinsElement = document.querySelector('.map__pins');
  var pinTemplateElement = document.querySelector('#pin').content.querySelector('button');

  window.pins = {
    render: function (pins) {
      var fragment = document.createDocumentFragment();

      pins.slice(0, PINS_LIMIT).forEach(function (pin, index) {
        fragment.appendChild(
            createPinElement(pin, index)
        );
      });

      mapPinsElement.appendChild(fragment);
    },
    remove: function () {
      var mapPinsElements = Array.from(mapPinsElement.querySelectorAll('.map__pin:not(.map__pin--main)'));
      mapPinsElements.forEach(function (pin) {
        mapPinsElement.removeChild(pin);
      });
    }
  };
})();
