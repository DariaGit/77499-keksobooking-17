'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var URL_SEND = 'https://js.dump.academy/keksobooking';
  var TIMEOUT = 10000;
  var STATUS_CODE_OK = 200;

  var TEXT_ERROR = 'Произошла ошибка соединения';
  var TEXT_LOAD_ERROR = 'Статус ответа: {status} {statusText}';
  var TEXT_TIMEOUT = 'Запрос не успел выполниться за {timeout} мс';

  function createRequest(url, method, onSuccess, onError, data) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('error', function () {
      onError(TEXT_ERROR);
    });

    xhr.addEventListener('timeout', function () {
      onError(TEXT_TIMEOUT.replace('{timeout}', xhr.timeout));
    });

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_CODE_OK) {
        onSuccess(xhr.response);
      } else {
        onError(TEXT_LOAD_ERROR
          .replace('{status}', xhr.status)
          .replace('{statusText}', xhr.statusText));
      }
    });

    xhr.timeout = TIMEOUT;
    xhr.open(method, url);
    xhr.send(data);

    return xhr;
  }

  window.backend = {
    load: function (onSuccess, onError) {
      createRequest(URL_LOAD, 'GET', onSuccess, onError);
    },
    send: function (data, onSuccess, onError) {
      createRequest(URL_SEND, 'POST', onSuccess, onError, data);
    }
  };
})();
