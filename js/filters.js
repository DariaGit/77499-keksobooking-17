'use strict';

(function () {
  var сhangeCallback;
  var filtersElement = document.querySelector('.map__filters');
  var housingTypeElement = document.querySelector('#housing-type');
  var housingPriceElement = document.querySelector('#housing-price');
  var housingRoomsElement = document.querySelector('#housing-rooms');
  var housingGuestsElement = document.querySelector('#housing-guests');

  housingTypeElement.addEventListener('change', function () {
    // @TODO: add check
    сhangeCallback();
  });

  housingPriceElement.addEventListener('change', function () {
    // @TODO: add check
    сhangeCallback();
  });

  housingRoomsElement.addEventListener('change', function () {
    // @TODO: add check
    сhangeCallback();
  });

  housingGuestsElement.addEventListener('change', function () {
    // @TODO: add check
    сhangeCallback();
  });

  window.filters = {
    activate: function () {
      filtersElement.classList.remove('map__filters--disabled');
    },
    deactivate: function () {
      filtersElement.classList.add('map__filters--disabled');
    },
    setChangeCallback: function (callback) {
      сhangeCallback = callback;
    },
    filterPins: function (pins) {
      return pins.filter(function () {
        return pins.offer.type === housingTypeElement.value;
      });
      // .slice(0, LIMIT);
    }
  };
})();

