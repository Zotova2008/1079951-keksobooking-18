'use strict';

(function () {

  var CODE = {
    ESC: 27,
    ENTER: 13
  };

  var disabledOn = function (arr) {
    arr.forEach(function (el) {
      el.disabled = true;
    });
  };
  var disabledOff = function (arr) {
    arr.forEach(function (el) {
      el.disabled = false;
    });
  };

  window.util = {
    ESC: CODE.ESC,
    ENTER: CODE.ENTER,
    disabledOn: disabledOn,
    disabledOff: disabledOff,
  };
})();
