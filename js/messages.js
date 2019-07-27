'use strict';

(function () {
  var KEY_CODE_ESC = 27;

  var mainElement = document.querySelector('main');
  var messageSuccessTemplateElement = document.querySelector('#success').content.querySelector('.success');
  var messageSuccessElement = messageSuccessTemplateElement.cloneNode(true);

  var errorTemplateElement = document.querySelector('#error').content.querySelector('.error');
  var messageErrorElement = errorTemplateElement.cloneNode(true);

  var activeElement;
  var activeButtonElement;

  function onDocumentKeydown(evt) {
    evt.preventDefault();
    if (evt.keyCode === KEY_CODE_ESC) {
      destroyMessage();
    }
  }

  function onDocumentClick() {
    destroyMessage();
  }

  function onButtonElementClick() {
    destroyMessage();
  }

  function createMessage(element, text) {
    var buttonElement = element.querySelector('[data-role="button"]');
    var textElement = element.querySelector('[data-role="message"]');

    activeElement = element;
    activeButtonElement = buttonElement;

    if (text && textElement) {
      textElement.textContent = text;
    }

    document.addEventListener('keydown', onDocumentKeydown);
    document.addEventListener('click', onDocumentClick);

    if (activeButtonElement) {
      activeButtonElement.addEventListener('click', onButtonElementClick);
    }

    mainElement.appendChild(activeElement);
  }

  function destroyMessage() {
    document.removeEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('click', onDocumentClick);

    if (activeButtonElement) {
      activeButtonElement.removeEventListener('click', onButtonElementClick);
    }

    mainElement.removeChild(activeElement);

    activeElement = null;
    activeButtonElement = null;
  }

  window.messages = {
    createSuccessMessage: function () {
      createMessage(messageSuccessElement);
    },
    createErrorMessage: function (text) {
      createMessage(messageErrorElement, text);
    }
  };
})();
