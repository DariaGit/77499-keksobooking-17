'use strict';

(function () {
  var сhangeCallback;
  var filtersElement = document.querySelector('.map__filters');
  var housingTypeElement = document.querySelector('#housing-type');
  var housingPriceElement = document.querySelector('#housing-price');
  var housingRoomsElement = document.querySelector('#housing-rooms');
  var housingGuestsElement = document.querySelector('#housing-guests');
  var housingFeaturesElement = Array.from(filtersElement.querySelectorAll('.map__checkbox'));

  var HousingPriceMap = {
    middle: {
      min: 10000,
      max: 50000
    },
    low: {
      min: 0,
      max: 10000
    },
    high: {
      min: 50000
    }
  };

  function filterByType(pin) {
    return pin.offer.type === housingTypeElement.value || housingTypeElement.value === 'any';
  }

  function filterByPrice(pin) {
    return housingPriceElement.value === 'any' ||
    pin.offer.price >= HousingPriceMap[pin.offer.price] ||
    pin.offer.price >= HousingPriceMap[housingPriceElement.value].min &&
    pin.offer.price < HousingPriceMap[housingPriceElement.value].max;
  }

  function filterByHousingRoomsCount(pin) {
    return pin.offer.rooms.toString() === housingRoomsElement.value ||
    housingRoomsElement.value === 'any';
  }

  function filterByHousingGuestsCount(pin) {
    return pin.offer.guests.toString() === housingGuestsElement.value ||
    housingGuestsElement.value === 'any';
  }

  var getCheckedElements = function (array) {
    var checkedElements = [];
    array.forEach(function (item) {
      if (item.checked) {
        checkedElements.push(item.value);
      }
    });
    return checkedElements;
  };

  function filterByFeatures(features, array) {
    array.forEach(function (item) {
      if (features.includes(item)) {
        return true;
      } else {
        return false;
      }
    });
  }

  filtersElement.addEventListener('change', function () {
    if (typeof сhangeCallback === 'function') {
      сhangeCallback();
    }
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
      return pins
        .filter(filterByType)
        .filter(filterByPrice)
        .filter(filterByHousingRoomsCount)
        .filter(filterByHousingGuestsCount);
    }
  };
})();
