'use strict';

(function () {

  var CODE = {
    ESC: 27,
    ENTER: 13
  };

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

  window.util = {
    ESC: CODE.ESC,
    ENTER: CODE.ENTER,
    disabledOn: disabledOn,
    disabledOff: disabledOff,
  };
})();
