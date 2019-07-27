'use strict';

(function () {
  var KEY_CODE_ESC = 27;

  var errorMessageOnLoad = 'При отправке данных произошла ошибка запроса';

  var mainElement = document.querySelector('main');
  var errorTemplateElement = document.querySelector('#error').content.querySelector('.error');
  var errorMessageNodeElement = errorTemplateElement.cloneNode(true);
  var errorTextElement = errorMessageNodeElement.querySelector('.error__message');
  var errorButtonElement = errorMessageNodeElement.querySelector('.error__button');

  function loadError() {
    errorTextElement.textContent = errorMessageOnLoad;
    mainElement.appendChild(errorMessageNodeElement);
  }

  function sendError() {
    mainElement.appendChild(errorMessageNodeElement);
  }

  function closeMessage() {
    errorMessageNodeElement.remove();
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

  function onErrorButtonElementClick() {
    closeMessage();
  }

  function createListeners() {
    document.addEventListener('keydown', onDocumentKeydown);
    document.addEventListener('click', onDocumentClick);
    errorButtonElement.addEventListener('click', onErrorButtonElementClick);
  }

  function destroyListeners() {
    document.removeEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('click', onDocumentClick);
    errorButtonElement.removeEventListener('click', onErrorButtonElementClick);
  }

  window.error = {
    createOnLoad: function () {
      createListeners();
      loadError();
    },
    createOnSend: function () {
      createListeners();
      sendError();
    }
  };
})();
