'use strict';

(function () {
  var mainElement = document.querySelector('main');
  var successTemplateElement = document.querySelector('#success').content.querySelector('.success');
  var successMessageNodeElement = successTemplateElement.cloneNode(true);
  var successTextElement = successMessageNodeElement.querySelector('.success__message');
  successTextElement.textContent = 'Ваше объявление<br>успешно размещено!';

  window.success = {
    create: function () {
      mainElement.appendChild(successMessageNodeElement);
    }
  };
})();
