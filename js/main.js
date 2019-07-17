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

  var housingTypeElement = document.querySelector('#housing-type');

  housingTypeElement.addEventListener('change', function (evt) {
    var selectedType = evt.target.value;
    var newPins = window.filters.filterPins(pins, selectedType);
    window.pins.render(newPins);
  });
})();
