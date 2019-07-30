'use strict';

(function () {
  var PINS_LIMIT = 5;
  var TEXT_PIN = 'заголовок объявления {index}';

  function createPinElement(pin, index) {
    var pinElement = pinTemplateElement.cloneNode(true);
    var pinImageElement = pinElement.querySelector('img');

    pinElement.style.left = pin.location.x + 'px';
    pinElement.style.top = pin.location.y + 'px';
    pinElement.alt = TEXT_PIN.replace('{index}', index);

    pinImageElement.src = pin.author.avatar;

    pinElement.addEventListener('click', function (evt) {
      evt.preventDefault();
      if (typeof pinClickCallback === 'function') {
        pinClickCallback(pin);
      }
    });

    return pinElement;
  }

  var pinClickCallback;
  var mapPinsElement = document.querySelector('.map__pins');
  var pinTemplateElement = document.querySelector('#pin').content.querySelector('button');

  window.pins = {
    setPinClickCallback: function (callback) {
      pinClickCallback = callback;
      var mapPinElement = mapPinsElement.querySelector('.map__pin');
      mapPinElement.classList.add('map__pin--active');
    },
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
      mapPinsElement.querySelectorAll('.map__pin:not(.map__pin--main)')
        .forEach(function (pin) {
          mapPinsElement.removeChild(pin);
        });
    }
  };
})();
