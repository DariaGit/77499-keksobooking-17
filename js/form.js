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

  function addDisabledAttribute(element) {
    element.setAttribute('disabled', 'disabled');
  }

  function addDisabledAttributes(elements) {
    elements.forEach(addDisabledAttribute);
  }

  function removeDisabledAttribute(element) {
    element.removeAttribute('disabled');
  }

  function removeDisabledAttributes(elements) {
    elements.forEach(removeDisabledAttribute);
  }

  window.form = (function () {
    return {
      activate: function () {
        addFormElement.classList.remove('ad-form--disabled');
        removeDisabledAttributes(adFormFieldsets);
      },
      deactivate: function () {
        addFormElement.classList.add('ad-form--disabled');
        addDisabledAttributes(adFormFieldsets);
      }
    };
  })();

  var formTypeElement = document.querySelector('#type');
  var formPriceElement = document.querySelector('#price');
  var formTimeInElement = document.querySelector('#timein');
  var formTimeOutElement = document.querySelector('#timeout');
  var addFormElement = document.querySelector('.ad-form');
  var adFormFieldsets = addFormElement.querySelectorAll('fieldset');

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
