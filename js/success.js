'use strict';

(function () {
  var mainElement = document.querySelector('main');
  var successTemplateElement = document.querySelector('#success').content.querySelector('.success');
  var successMessageNodeElement = successTemplateElement.cloneNode(true);

  window.success = {
    create: function () {
      mainElement.appendChild(successMessageNodeElement);
    }
  };
})();
