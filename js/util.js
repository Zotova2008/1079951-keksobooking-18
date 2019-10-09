'use strict';

(function () {
  var esc = 27;
  var enter = 13;

  // Случайное число из диапазона значений
  var getRandomRange = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  // Случайное число
  var getRandomIndex = function (array) {
    return Math.floor(Math.random() * (array));
  };

  // Случайное количество элементов из массива
  var getRandomArray = function (array) {
    var copyArray = array.slice();
    var newArray = [];
    // Случайное количество элементов, но не более длинны массива
    var size = getRandomRange(1, copyArray.length + 1);
    for (var i = 0; i < size; i++) {
      var indexNumber = getRandomRange(0, copyArray.length - 1);
      newArray.push(copyArray[indexNumber]);
      copyArray.splice(indexNumber, 1);
    }
    return newArray;
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

  var openPopup = function (item) {
    item.classList.remove('hidden');
  };

  window.util = {
    esc: esc,
    enter: enter,
    getRandomRange: getRandomRange,
    getRandomIndex: getRandomIndex,
    getRandomArray: getRandomArray,
    disabledOn: disabledOn,
    disabledOff: disabledOff,
    openPopup: openPopup,
  };
})();
