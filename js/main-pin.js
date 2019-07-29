'use strict';

(function () {
  var MAX_TOP_SHIFT = 130;
  var MAX_BOTTOM_SHIFT = 630;
  var MAX_LEFT_SHIFT = 0;

  var MAP_WIDTH = 1200;
  var PIN_WIDTH = 50;
  var PIN_LEG_HEIGHT = 22;

  var mapPinMainElement = document.querySelector('.map__pin--main');
  var mapPinMainImageElement = mapPinMainElement.querySelector('img');

  var mouseDownCallback;
  var mouseMoveCallback;

  mapPinMainElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    if (typeof mouseDownCallback === 'function') {
      mouseDownCallback();
    }

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      if (typeof mouseMoveCallback === 'function') {
        mouseMoveCallback();
      }

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

  window.mainPin = {
    setMouseDownCallback: function (callback) {
      mouseDownCallback = callback;
    },
    setMouseMoveCallback: function (callback) {
      mouseMoveCallback = callback;
    },
    calculateMainPinCoords: function (mapRect, isPageActive) {
      var mainPinRect = mapPinMainImageElement.getBoundingClientRect();

      var topOffset = isPageActive
        ? mainPinRect.height + PIN_LEG_HEIGHT
        : mainPinRect.height / 2;

      return {
        top: Math.round(mainPinRect.top - mapRect.top + topOffset),
        left: Math.round(mainPinRect.left - mapRect.left + mainPinRect.width / 2)
      };
    },
    setCoordinates: function (coords) {
      mapPinMainElement.style.top = coords.top + 'px';
      mapPinMainElement.style.left = coords.left + 'px';
    }
  };

})();
