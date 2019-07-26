'use strict';

(function () {
    var KEY_CODE_ESC = 27;
    var ERROR_LOAD_TEXT = 'При отправке данных произошла ошибка запроса';

    var mainElement = document.querySelector('main');
    var messageSuccessTemplateElement = document.querySelector('#success').content.querySelector('.success');
    var messageSuccessElement = messageSuccessTemplateElement.cloneNode(true);

    var errorTemplateElement = document.querySelector('#error').content.querySelector('.error');
    var messageErrorElement = errorTemplateElement.cloneNode(true);

    var errorButtonElement = messageErrorElement.querySelector('.error__button');
    var activeElement;

    function onDocumentKeydown(evt) {
      evt.preventDefault();
      if (evt.keyCode === KEY_CODE_ESC) {
        destroyMessage();
      }
    }

    function onDocumentClick() {
        destroyMessage();
    }

    function onErrorButtonElementClick() {
        destroyMessage();
    }

    function createMessage(element, text) {
        activeElement = element;

        if (text) {
            var textElement = element.querySelector('[data-role="message"]')
            if (textElement) {
                textElement.textContent = text;
            }
        }

        document.addEventListener('keydown', onDocumentKeydown);
        document.addEventListener('click', onDocumentClick);

        // errorButtonElement.addEventListener('click', onErrorButtonElementClick);

        mainElement.appendChild(activeElement);
    }

    function destroyMessage() {
        document.removeEventListener('keydown', onDocumentKeydown);
        document.removeEventListener('click', onDocumentClick);

        mainElement.removeChild(activeElement);
    }


    window.messages = {
        createSuccessMessage: function() {
            createMessage(messageSuccessElement)
        },
        createErrorMessage: function(text) {
            createMessage(messageErrorElement, text)
        }
    };
})();
