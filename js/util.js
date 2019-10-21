'use strict';

(function () {

  var CODE = {
    ESC: 27,
    ENTER: 13
  };

  var main = document.querySelector('main');

  var disabledOn = function (arr) {
    for (var a = 0; a < arr.length; a++) {
      arr[a].disabled = true;
    }
  };
  var disabledOff = function (arr) {
    for (var a = 0; a < arr.length; a++) {
      arr[a].disabled = false;
    }
  };

  var openPopup = function (item) {
    item.classList.remove('hidden');
  };

  var successHandler = function () {
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var successElement = successTemplate.cloneNode(true);
    main.appendChild(successElement);

    document.addEventListener('click', function () {
      if (main.contains(successElement)) {
        successElement.remove();
      }
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.ESC && main.contains(successElement)) {
        successElement.remove();
      }
    });

    window.map.isPageActive = false;
  };

  var errorHandler = function () {
    var fragment = document.createDocumentFragment();
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorElement = errorTemplate.cloneNode(true);
    fragment.appendChild(errorElement);
    main.appendChild(fragment);

    var errorBtn = document.querySelector('.error__button');
    errorBtn.addEventListener('click', function () {
      errorElement.remove();
    });
    errorElement.addEventListener('click', function () {
      errorElement.remove();
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === CODE.ESC) {
        errorElement.remove();
      }
    });
  };

  window.util = {
    ESC: CODE.ESC,
    main: main,
    ENTER: CODE.ENTER,
    disabledOn: disabledOn,
    disabledOff: disabledOff,
    openPopup: openPopup,
    successHandler: successHandler,
    errorHandler: errorHandler,
  };
})();
