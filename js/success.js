'use strict';

(function () {
  var KEY_CODE_ESC = 27;

  var mainElement = document.querySelector('main');
  var successTemplateElement = document.querySelector('#success').content.querySelector('.success');
  var successMessageNodeElement = successTemplateElement.cloneNode(true);

  function closeMessage() {
    successMessageNodeElement.remove();
    destroyListeners();
  }

  function onDocumentKeydown(evt) {
    evt.preventDefault();
    if (evt.keyCode === KEY_CODE_ESC) {
      closeMessage();
    }
  }

  function onDocumentClick() {
    closeMessage();
  }

  function createListeners() {
    document.addEventListener('keydown', onDocumentKeydown);
    document.addEventListener('click', onDocumentClick);
  }

  function destroyListeners() {
    document.removeEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('click', onDocumentClick);
  }

  window.success = {
    create: function () {
      createListeners();
      mainElement.appendChild(successMessageNodeElement);
    }
  };
})();
