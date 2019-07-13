'use strict';

(function () {
  var mapElement = document.querySelector('.map');
  var mapPinsElement = document.querySelector('.map__pins');
  window.map = {
    activate: function () {
      mapElement.classList.remove('map--faded');
    },
    deactivate: function () {
      mapElement.classList.add('map--faded');
    },
    getRect: function () {
      return mapPinsElement.getBoundingClientRect();
    }
  };
})();
