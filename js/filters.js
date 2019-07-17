'use strict';

(function () {
  var сhangeCallback;
  var filtersElement = document.querySelector('.map__filters');
  var housingTypeElement = document.querySelector('#housing-type');
  // @TODO: housing-price
  // @TODO: housing-rooms
  // @TODO: housing-guests

  housingTypeElement.addEventListener('change', function () {
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

  // var FROM = 1;
  // var TO = 10000;

  // function generateArray(fromNumber, toNumber) {
  //   var arrayOfNumbers = [];
  //   for (var i = fromNumber; i <= toNumber; i++) {
  //     arrayOfNumbers.push(i);
  //   }
  //   return arrayOfNumbers;
  // }

  // function printNumbers(number) {
  //   if (number % 17 === 0) {
  //     console.log('число ' + number + ' делиться на 17');
  //   }

  //   if (number % 51 === 0) {
  //     console.log('число ' + number + ' делиться на 51');
  //   }
  // }

  // var newArrayOfNumber = generateArray(FROM, TO);
  // newArrayOfNumber.forEach(printNumbers);
})();

