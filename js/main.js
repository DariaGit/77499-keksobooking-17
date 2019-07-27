'use strict';

(function () {
  var isPageActive;

  function activatePage() {
    window.map.activate();
    window.form.activate();
    window.filters.activate();

    isPageActive = true;
  }

  function deactivatePage() {
    var mapRect = window.map.getRect();
    var coordinates = window.mainPin.calculateMainPinCoords(mapRect, isPageActive);

    window.pins.remove();
    window.map.deactivate();
    window.form.deactivate();
    window.filters.deactivate();

    window.form.setCoordinates(coordinates.left + ', ' + coordinates.top);

    isPageActive = false;
  }

  var pins = [];

  window.backend.load(function (data) {
    pins = data;

    window.mainPin.setMouseDownCallback(function () {
      if (!isPageActive) {
        activatePage();
        window.pins.render(pins);
      }
    });

  }, window.messages.createErrorMessage);

  var mapRect = window.map.getRect();
  var coordinates = window.mainPin.calculateMainPinCoords(mapRect, isPageActive);

  deactivatePage();

  window.form.setCoordinates(coordinates.left + ', ' + coordinates.top);

  window.form.setSubmitCallback(function (formData) {
    window.backend.send(
        formData,
        function () {
          window.messages.createSuccessMessage();
          deactivatePage();
        },
        window.messages.createErrorMessage
    );
  });

  window.pins.setPinClickCallback(window.card.create);

  window.mainPin.setMouseMoveCallback(function () {
    var coords = window.mainPin.calculateMainPinCoords(mapRect, isPageActive);
    window.form.setCoordinates(coords.left + ', ' + coords.top);
  });

  window.filters.setChangeCallback(function () {
    window.pins.remove();
    window.pins.render(
        window.filters.filterPins(pins)
    );
  });
})();
