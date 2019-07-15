'use strict';

(function () {
  // var PIN_WIDTH = 50;
  // var PIN_HEIGHT = 70;

  function createPinElement(pin, index) {
    var pinElement = pinTemplateElement.cloneNode(true);
    var pinImageElement = pinElement.querySelector('img');

    pinElement.style.left = pin.location.x + 'px';
    pinElement.style.top = pin.location.y + 'px';
    pinElement.alt = 'заголовок объявления ' + index;

    pinImageElement.src = pin.author.avatar;

    return pinElement;
  }

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
    }
  };
})();
