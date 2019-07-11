'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_LEG_HEIGHT = 22;
  var MAP_WIDTH = 1200;
  var PINS_LIMIT = 8;
  var isPageActive;

  function createPins(limit) {
    var pins = [];

    for (var i = 0; i < limit; i++) {
      pins.push(window.createPin(i));
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

  function activatePage() {
    mapElement.classList.remove('map--faded');
    filtersElement.classList.remove('map__filters--disabled');
    window.form.activate();
    isPageActive = true;
  }

  function deactivatePage() {
    mapElement.classList.add('map--faded');
    filtersElement.classList.add('map__filters--disabled');
    window.form.deactivate();
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

  var pins = createPins(PINS_LIMIT);
  var pinTemplateElement = document.querySelector('#pin').content.querySelector('button'); // карта
  var addFormElement = document.querySelector('.ad-form');
  var mapPinMainElement = document.querySelector('.map__pin--main');
  var mapElement = document.querySelector('.map');
  var mapPinMainImageElement = document.querySelector('.map__pin--main img');
  var addFormAddressInputElement = addFormElement.querySelector('input[name="address"]'); // форма
  var filtersElement = document.querySelector('.map__filters');
  var mapPinsElement = document.querySelector('.map__pins');

  mapPinMainElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    if (!isPageActive) {
      activatePage();
      renderPins(pins);
    }
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    function onMouseMove(moveEvt) {
      var MAX_TOP_SHIFT = 130;
      var MAX_BOTTOM_SHIFT = 630;
      var MAX_LEFT_SHIFT = 0;
      moveEvt.preventDefault();
      addStartPinCoordinates();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var newCoordTop = mapPinMainElement.offsetTop - shift.y;
      var newCoordLeft = mapPinMainElement.offsetLeft - shift.x;
      mapPinMainElement.style.top = Math.max(MAX_TOP_SHIFT, Math.min(newCoordTop, MAX_BOTTOM_SHIFT)) + 'px';
      mapPinMainElement.style.left = Math.max(MAX_LEFT_SHIFT, Math.min(newCoordLeft, MAP_WIDTH - PIN_WIDTH)) + 'px';
    }

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  deactivatePage();
  addStartPinCoordinates();
})();
