'use strict';

(function () {
  var RoomTypeMinPriceMap = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var RoomsToCapacityMap = {
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

  var submitCallback;
  var formResetCallback;

  var formTypeElement = document.querySelector('#type');
  var formPriceElement = document.querySelector('#price');
  var formTimeInElement = document.querySelector('#timein');
  var formTimeOutElement = document.querySelector('#timeout');
  var formRoomNumberElement = document.querySelector('#room_number');
  var formCapacityElement = document.querySelector('#capacity');
  var formCapacityElements = formCapacityElement.querySelectorAll('option');
  var addFormElement = document.querySelector('.ad-form');
  var adFormFieldsets = addFormElement.querySelectorAll('fieldset');
  var addFormAddressInputElement = addFormElement.querySelector('input[name="address"]');
  var addFormResetElement = addFormElement.querySelector('.ad-form__reset');
  var defaultRoomNumberValue = formRoomNumberElement.value;

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
    updateCapacityValidation();
  }

  function onAddFormElementSubmit(evt) {
    evt.preventDefault();

    if (typeof submitCallback === 'function') {
      submitCallback(new FormData(addFormElement));
    }
  }

  function onAddFormResetElementClick(evt) {
    evt.preventDefault();

    if (typeof formResetCallback === 'function') {
      formResetCallback(new FormData(addFormElement));
    }
  }

  function updateCapacityValidation() {
    var capacities = RoomsToCapacityMap[formRoomNumberElement.value];

    formCapacityElements.forEach(function (element) {
      element.removeAttribute('selected');
      element.removeAttribute('disabled');
      if (capacities.indexOf(element.value) === -1) {
        element.setAttribute('disabled', 'disabled');
      }
    });

    formCapacityElement.value = capacities[0];
  }

  function createListeners() {
    formTypeElement.addEventListener('change', onFormTypeElementChange);
    formTimeInElement.addEventListener('change', onFormTimeInElementChange);
    formTimeOutElement.addEventListener('change', onFormTimeOutElementChange);
    formRoomNumberElement.addEventListener('change', onFormRoomNumberElementChange);
    addFormElement.addEventListener('submit', onAddFormElementSubmit);
    addFormResetElement.addEventListener('click', onAddFormResetElementClick);
  }

  function destroyListeners() {
    formTypeElement.removeEventListener('change', onFormTypeElementChange);
    formTimeInElement.removeEventListener('change', onFormTimeInElementChange);
    formTimeOutElement.removeEventListener('change', onFormTimeOutElementChange);
    formRoomNumberElement.removeEventListener('change', onFormRoomNumberElementChange);
    addFormElement.removeEventListener('submit', onAddFormElementSubmit);
    addFormResetElement.removeEventListener('click', onAddFormResetElementClick);
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
      addFormElement.reset();
      updateFormPriceAttributes(formTypeElement.value);
      addDisabledAttributes(adFormFieldsets);
      formRoomNumberElement.value = defaultRoomNumberValue;
      updateCapacityValidation();
      destroyListeners();
    },
    setCoordinates: function (coords) {
      addFormAddressInputElement.value = coords.top + ', ' + coords.left;
    },
    setSubmitCallback: function (callback) {
      submitCallback = callback;
    },
    setFormResetCallback: function (callback) {
      formResetCallback = callback;
    }
  };
})();
