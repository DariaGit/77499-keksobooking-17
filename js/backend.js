'use strict';

(function() {
  var URL_LOAD = 'https://js.dump.academy/keksobooking';
  var URL_SEND = 'https://js.dump.academy/keksobooking/data';

  var TEXT_ERROR = 'Произошла ошибка соединения';
  var TEXT_TIMEOUT = 'Запрос не успел выполниться за {timeout} мс';

  function createRequest(url, method, onSuccess, onError, data) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('error', function () {
      onError(TEXT_ERROR);
    });

    xhr.addEventListener('timeout', function () {
      // onError(TEXT_TIMEOUT); // @TODO: use replace for {timeout} xhr.timeout
      onError('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
    });

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText); // @TODO: extract as text constant
      }
    });

    xhr.timeout = 10000; // @TODO: extract as constant
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
  }
})();
