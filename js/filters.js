'use strict';

(function () {
  var сhangeCallback;
  var filtersElement = document.querySelector('.map__filters');
  var housingTypeElement = document.querySelector('#housing-type');
  var housingPriceElement = document.querySelector('#housing-price');
  var housingRoomsElement = document.querySelector('#housing-rooms');
  var housingGuestsElement = document.querySelector('#housing-guests');
  var housingFeaturesElements = filtersElement.querySelectorAll('.map__checkbox');

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

  function getCheckedElements(array) {
    var newArray = [];

    array.forEach(function (item) {
      if (item.checked) {
        newArray.push(item);
      }
    });

    return newArray;
  }

  function filterByFeatures(item) {
    var features = getCheckedElements(housingFeaturesElements);

    for (var i = 0; i < features.length; i++) {
      if (item.offer.features.indexOf(features[i].value) === -1) {
        return false;
      }
    }
    return true;
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
        .filter(filterByHousingGuestsCount)
        .filter(filterByFeatures);
    }
  };
})();
