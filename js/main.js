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
    window.map.deactivate();
    window.form.deactivate();
    window.filters.deactivate();

    isPageActive = false;
  }

  var pins = [];
  window.backend.load(function (data) {
    pins = data;

    window.mainPin.setMouseDownCallback(function () {
      if (!isPageActive) {
        activatePage();
        window.pins.render(pins);
        window.cards.render(pins[0]);
      }
    });

  }, window.error.create);

  var mapRect = window.map.getRect();
  var coordinates = window.mainPin.calculateMainPinCoords(mapRect, isPageActive);

  deactivatePage();

  window.form.setCoordinates(coordinates.left + ', ' + coordinates.top);

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
