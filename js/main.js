'use strict';

(function () {

  var isPageActive;
  var pins = [];
  var mapRect = window.map.getRect();
  var defaultMainPinCoords = window.mainPin.calculateMainPinCoords(mapRect, isPageActive);

  function filtersChangeCallback() {
    window.debounce(function () {
      window.pins.remove();
      window.pins.render(window.filters.filterPins(pins));
      window.card.destroy();
    });
  }

  function formResetCallback() {
    deactivatePage();
  }

  function formSubmitCallback(formData) {
    window.backend.send(
        formData,
        function () {
          deactivatePage();
          window.mainPin.setCoordinates(defaultMainPinCoords);
          window.messages.createSuccessMessage();
        },
        window.messages.createErrorMessage
    );
  }

  function activatePage() {
    window.map.activate();
    window.form.activate();
    window.filters.activate();

    isPageActive = true;

    window.form.setSubmitCallback(formSubmitCallback);
    window.pins.setPinClickCallback(window.card.create);
    window.form.setFormResetCallback(formResetCallback);
    window.filters.setChangeCallback(filtersChangeCallback);

    window.pins.render(pins);
  }

  function deactivatePage() {
    window.pins.remove();
    window.card.destroy();
    window.map.deactivate();
    window.filters.deactivate();
    window.form.deactivate();
    window.form.setCoordinates(defaultMainPinCoords);

    isPageActive = false;

    window.form.setSubmitCallback();
    window.pins.setPinClickCallback();
    window.form.setFormResetCallback();
    window.filters.setChangeCallback();
  }

  deactivatePage();

  window.backend.load(function (data) {
    pins = data;

    window.mainPin.setMouseDownCallback(function () {
      if (!isPageActive) {
        activatePage();
      }
    });
  }, window.messages.createErrorMessage);

  window.mainPin.setMouseMoveCallback(function () {
    var coords = window.mainPin.calculateMainPinCoords(mapRect, isPageActive);
    window.form.setCoordinates(coords);
  });
})();
