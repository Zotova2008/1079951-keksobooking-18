'use strict';

(function () {

  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var URL_SAVE = 'https://js.dump.academy/keksobooking';
  var METHOD_LOAD = 'GET';
  var METHOD_SAVE = 'POST';
  var SUCCESS_CODE = 200;
  var TIMEOUT = 10000;

  var sendXMLHttpRequest = function (url, method, data, loadHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        loadHandler(xhr.response);
      } else {
        errorHandler('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      errorHandler('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      errorHandler('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;
    xhr.open(method, url);
    var params = data ? data : new FormData();
    xhr.send(params);
  };

  var load = function (loadHandler, errorHandler) {
    sendXMLHttpRequest(URL_LOAD, METHOD_LOAD, false, loadHandler, errorHandler);
  };

  var save = function (data, loadHandler, errorHandler) {
    sendXMLHttpRequest(URL_SAVE, METHOD_SAVE, data, loadHandler, errorHandler);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
