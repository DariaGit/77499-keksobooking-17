'use strict';

(function () {
  var mainElement = document.querySelector('main');
  var errorTemplateElement = document.querySelector('#error').content.querySelector('.error');
  var errorMessageNodeElement = errorTemplateElement.cloneNode(true);
  var errorTextElement = errorMessageNodeElement.querySelector('.error__message');
  errorTextElement.textContent = 'При отправке данных произошла ошибка запроса';

  window.error = {
    create: function () {
      mainElement.appendChild(errorMessageNodeElement);
    }
  };
})();
