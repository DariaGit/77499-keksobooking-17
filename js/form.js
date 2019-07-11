'use strict';

(function () {
  var RoomTypeMinPriceMap = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  function updateFormPriceAttributes(type) {
    formPriceElement.setAttribute('min', RoomTypeMinPriceMap[type]);
    formPriceElement.setAttribute('placeholder', RoomTypeMinPriceMap[type]);
  }

  var formTypeElement = document.querySelector('#type');
  var formPriceElement = document.querySelector('#price');
  var formTimeInElement = document.querySelector('#timein');
  var formTimeOutElement = document.querySelector('#timeout');

  formTypeElement.addEventListener('change', function (evt) {
    updateFormPriceAttributes(evt.target.value);
  });

  formTimeInElement.addEventListener('change', function (evt) {
    formTimeOutElement.selectedIndex = evt.target.selectedIndex;
  });

  formTimeOutElement.addEventListener('change', function (evt) {
    formTimeInElement.selectedIndex = evt.target.selectedIndex;
  });

  updateFormPriceAttributes(formTypeElement.value);
})();
