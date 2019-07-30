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
      min: 50000,
      max: Infinity
    }
  };

  function filterByType(pin) {
    return (
      housingTypeElement.value === 'any' ||
      pin.offer.type === housingTypeElement.value
    );
  }

  function filterByPrice(pin) {
    var price = housingPriceElement.value;
    var limit = HousingPriceMap[price];
    return (
      price === 'any' ||
      (pin.offer.price >= limit.min && pin.offer.price < limit.max)
    );
  }

  function filterByHousingRoomsCount(pin) {
    return (
      housingRoomsElement.value === 'any' ||
      pin.offer.rooms.toString() === housingRoomsElement.value
    );
  }

  function filterByHousingGuestsCount(pin) {
    return (
      housingGuestsElement.value === 'any' ||
      pin.offer.guests.toString() === housingGuestsElement.value
    );
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
      return pins.filter(function (pin) {
        return (
          filterByType(pin) &&
          filterByPrice(pin) &&
          filterByHousingRoomsCount(pin) &&
          filterByHousingGuestsCount(pin) &&
          filterByFeatures(pin)
        );
      });
    }
  };
})();
