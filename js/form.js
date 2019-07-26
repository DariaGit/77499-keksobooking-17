'use strict';

(function () {
  var RoomTypeMinPriceMap = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var roomsToCapacityMap = {
    '1': ['1'],
    '2': ['2', '1'],
    '3': ['3', '2', '1'],
    '100': ['0']
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
  // var addFormSubmitButtonElement = addFormElement.querySelector('.ad-form__submit');

  function setRoomsCapacityStartValue() {
    formRoomNumberElement.item(0).setAttribute('selected', 'selected');
    formCapacityElements.forEach(function (item) {
      item.setAttribute('disabled', 'disabled');
      item.removeAttribute('selected', 'selected');
    });
    formCapacityElement.item(2).setAttribute('selected', 'selected');
    formCapacityElement.item(2).removeAttribute('disabled', 'disabled');
  }

  function onFormTypeElementChange(evt) {
    updateFormPriceAttributes(evt.target.value);
  }

  function onFormTimeInElementChange(evt) {
    formTimeOutElement.selectedIndex = evt.target.selectedIndex;
  }

  function onFormTimeOutElementChange(evt) {
    formTimeInElement.selectedIndex = evt.target.selectedIndex;
  }

  function onFormRoomNumberElementChange() {
    var capacities = roomsToCapacityMap[formRoomNumberElement.value];

    formCapacityElements.forEach(function (element) {
      element.removeAttribute('selected');
      element.removeAttribute('disabled');
      if (capacities.indexOf(element.value) === -1) {
        element.setAttribute('disabled', 'disabled');
      } else {
        element.removeAttribute('disabled');
        element.setAttribute('selected', 'selected');
      }
    });
  }

  function onAddFormElementSubmit(evt) {
    evt.preventDefault();
    var formData = new FormData(addFormElement);
    window.backend.send(formData, window.success.create, window.error.create);
  }

  function createListeners() {
    formTypeElement.addEventListener('change', onFormTypeElementChange);
    formTimeInElement.addEventListener('change', onFormTimeInElementChange);
    formTimeOutElement.addEventListener('change', onFormTimeOutElementChange);
    formRoomNumberElement.addEventListener('change', onFormRoomNumberElementChange);
    addFormElement.addEventListener('submit', onAddFormElementSubmit);
  }

  function destroyListeners() {
    formTypeElement.removeEventListener('change', onFormTypeElementChange);
    formTimeInElement.removeEventListener('change', onFormTimeInElementChange);
    formTimeOutElement.removeEventListener('change', onFormTimeOutElementChange);
    formRoomNumberElement.removeEventListener('change', onFormRoomNumberElementChange);
    addFormElement.removeEventListener('submit', onAddFormElementSubmit);
  }

  updateFormPriceAttributes(formTypeElement.value);

  window.form = {
    activate: function () {
      addFormElement.classList.remove('ad-form--disabled');
      createListeners();
      removeDisabledAttributes(adFormFieldsets);
    },
    deactivate: function () {
      addFormElement.classList.add('ad-form--disabled');
      addDisabledAttributes(adFormFieldsets);
      setRoomsCapacityStartValue();
      destroyListeners();
    },
    setCoordinates: function (value) {
      addFormAddressInputElement.value = value;
    }
  };
})();
