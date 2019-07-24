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

  var formTypeElement = document.querySelector('#type');
  var formPriceElement = document.querySelector('#price');
  var formTimeInElement = document.querySelector('#timein');
  var formTimeOutElement = document.querySelector('#timeout');
  var formRoomNumberElement = document.querySelector('#room_number');
  var formCapacityElement = document.querySelector('#capacity');
  var formCapacityElements = Array.from(formCapacityElement.querySelectorAll('option'));
  var addFormElement = document.querySelector('.ad-form');
  var adFormFieldsets = addFormElement.querySelectorAll('fieldset');
  var addFormAddressInputElement = addFormElement.querySelector('input[name="address"]');

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

  function setRoomsCapacityStartValue() {
    formRoomNumberElement.item(0).setAttribute('selected', 'selected');
    formCapacityElements.forEach(function (item) {
      item.setAttribute('disabled', 'disabled');
      item.removeAttribute('selected', 'selected');
    });
    formCapacityElement.item(2).setAttribute('selected', 'selected');
    formCapacityElement.item(2).removeAttribute('disabled', 'disabled');

  }

  formRoomNumberElement.addEventListener('change', function () {
    formCapacityElements.forEach(function (item) {
      item.setAttribute('disabled', 'disabled');
      item.removeAttribute('selected', 'selected');
    });

    switch (formRoomNumberElement.value) {
      case '1':
        formCapacityElement.item(2).removeAttribute('disabled', 'disabled');
        formCapacityElement.item(2).setAttribute('selected', 'selected');
        break;
      case '2':
        formCapacityElement.item(1).removeAttribute('disabled', 'disabled');
        formCapacityElement.item(2).removeAttribute('disabled', 'disabled');
        formCapacityElement.item(1).setAttribute('selected', 'selected');
        break;
      case '3':
        formCapacityElement.item(0).removeAttribute('disabled', 'disabled');
        formCapacityElement.item(1).removeAttribute('disabled', 'disabled');
        formCapacityElement.item(2).removeAttribute('disabled', 'disabled');
        formCapacityElement.item(0).setAttribute('selected', 'selected');
        break;
      case '100':
        formCapacityElement.item(3).removeAttribute('disabled', 'disabled');
        formCapacityElement.item(3).setAttribute('selected', 'selected');
    }
  });

  window.form = {
    activate: function () {
      addFormElement.classList.remove('ad-form--disabled');
      removeDisabledAttributes(adFormFieldsets);
    },
    deactivate: function () {
      addFormElement.classList.add('ad-form--disabled');
      addDisabledAttributes(adFormFieldsets);
      setRoomsCapacityStartValue();
    },
    setCoordinates: function (value) {
      addFormAddressInputElement.value = value;
    }
  };
})();
