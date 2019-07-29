'use strict';

(function () {

  var isPageActive;
  var pins = [];
  var mapRect = window.map.getRect();
  var defaultMainPinCoords = window.mainPin.calculateMainPinCoords(mapRect, isPageActive);

  var filtersChangeCallback = function () {
    window.debounce(function () {
      window.pins.remove();
      window.pins.render(window.filters.filterPins(pins));
      window.card.destroy();
    });
  };

  var formResetCallback = function () {
    deactivatePage();
    window.mainPin.setCoordinates(defaultMainPinCoords);
    window.card.destroy();
  };

  var formSubmitCallback = function (formData) {
    window.backend.send(
        formData,
        function () {
          deactivatePage();
          window.mainPin.setCoordinates(defaultMainPinCoords);
          window.messages.createSuccessMessage();
        },
        window.messages.createErrorMessage
    );
  };


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

  window.mainPin.setMouseDownCallback(function () {
    if (!isPageActive) {
      if (!pins.length) {
        window.backend.load(function (data) {
          pins = data;
          if (!isPageActive) {
            activatePage();
          }
        }, window.messages.createErrorMessage);
      } else {
        activatePage();
      }
    }
  });

  window.mainPin.setMouseMoveCallback(function () {
    var coords = window.mainPin.calculateMainPinCoords(mapRect, isPageActive);
    window.form.setCoordinates(coords);
  });
})();
