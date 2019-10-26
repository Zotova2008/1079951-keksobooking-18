'use strict';

(function () {

  var offerPrice = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var inputRoomNumber = window.map.adForm.querySelector('#room_number');
  var inputType = window.map.adForm.querySelector('#type');
  var inputPrice = window.map.adForm.querySelector('#price');
  var inputCapacity = window.map.adForm.querySelector('#capacity');
  var inputCapacityOptions = inputCapacity.querySelectorAll('option');
  var timeIn = window.map.adForm.querySelector('#timein');
  var timeOut = window.map.adForm.querySelector('#timeout');

  inputType.addEventListener('change', function () {
    var inputTypeCurrentValue = inputType.querySelector('option:checked').value;
    inputPrice.setAttribute('placeholder', offerPrice[inputTypeCurrentValue]);
    inputPrice.setAttribute('minlength', offerPrice[inputTypeCurrentValue]);
  });

  inputPrice.addEventListener('input', function (evt) {
    var inputTypeCurrentValue = inputType.querySelector('option:checked').value;
    var target = evt.target;
    if (target.value < offerPrice[inputTypeCurrentValue]) {
      target.setCustomValidity('Минимальная цена за ночь: ' + offerPrice[inputTypeCurrentValue]);
    } else {
      target.setCustomValidity('');
    }
  });

  timeIn.addEventListener('change', function () {
    timeOut.value = timeIn.value;
  });

  timeOut.addEventListener('change', function () {
    timeIn.value = timeOut.value;
  });

  var inputRoomValidateNumber = function () {
    inputCapacityOptions.forEach(function (element) {
      element.remove();
    });
    var insertInputCapacityOptions = function (elements) {
      elements.forEach(function (element) {
        inputCapacity.appendChild(inputCapacityOptions[element]);
      });
    };

    switch (inputRoomNumber.selectedIndex) {
      case 0:
        insertInputCapacityOptions([2]);
        break;
      case 1:
        insertInputCapacityOptions([1, 2]);
        break;
      case 2:
        insertInputCapacityOptions([0, 1, 2]);
        break;
      case 3:
        insertInputCapacityOptions([3]);
        break;
    }
  };

  inputRoomValidateNumber();

  var changeInputRoomNumber = function () {
    inputRoomValidateNumber();
  };

  inputRoomNumber.addEventListener('change', changeInputRoomNumber);
})();
