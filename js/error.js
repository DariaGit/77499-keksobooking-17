'use strict';

(function () {
  var mainElement = document.querySelector('main');

  window.error = function () {
    var errorTemplateElement = document.querySelector('#error').content.querySelector('.error');
    var errorMessageNodeElement = errorTemplateElement.cloneNode(true);
    var errorTextElement = errorMessageNodeElement.querySelector('.error__message');
    errorTextElement.textContent = 'При отправке данных произошла ошибка запроса';
    mainElement.appendChild(errorMessageNodeElement);
  };
})();
