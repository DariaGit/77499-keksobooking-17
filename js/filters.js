'use strict';

(function () {
  var filtersElement = document.querySelector('.map__filters');

  window.filters = {
    activate: function () {
      filtersElement.classList.remove('map__filters--disabled');
    },
    deactivate: function () {
      filtersElement.classList.add('map__filters--disabled');
    },
    filterPins: function (pins, selectedType) {
      var newPins = pins.filter(function () {
        return pins.offer.type === selectedType;
      });
      return newPins;
    }
  };
})();
