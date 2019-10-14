'use strict';

(function () {

  var OFFER_PRICE = {
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
  var timein = window.map.adForm.querySelector('#timein');
  var timeout = window.map.adForm.querySelector('#timeout');

  inputType.addEventListener('change', function () {
    var inputTypeCurrentValue = inputType.querySelector('option:checked').value;
    inputPrice.setAttribute('placeholder', OFFER_PRICE[inputTypeCurrentValue]);
    inputPrice.setAttribute('minlength', OFFER_PRICE[inputTypeCurrentValue]);
  });

  inputPrice.addEventListener('input', function (evt) {
    var inputTypeCurrentValue = inputType.querySelector('option:checked').value;
    var target = evt.target;
    if (target.value < OFFER_PRICE[inputTypeCurrentValue]) {
      target.setCustomValidity('Минимальная цена за ночь: ' + OFFER_PRICE[inputTypeCurrentValue]);
    } else {
      target.setCustomValidity('');
    }
  });

  timein.addEventListener('change', function () {
    timeout.value = timein.value;
  });

  timeout.addEventListener('change', function () {
    timein.value = timeout.value;
  });

  // Валидация (удаление) лишних элементов из кол-ва мест
  var inputRoomValidateNumber = function () {
    // Удаляем все option из #capacity
    inputCapacityOptions.forEach(function (element) {
      element.remove();
    });
    // Находим элементы указанные в case перебираем #capacity и добавляем option(с указанным элементом в case) в #capacity
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

  // Слушаем изменения комнат
  var changeInputRoomNumber = function () {
    inputRoomValidateNumber();
  };

  // добавляем ее на событие change
  inputRoomNumber.addEventListener('change', changeInputRoomNumber);

  // var MAIN_PIN_DEF_X = 570;
  // var MAIN_PIN_DEF_Y = 375;
  // var successSaveHandler = function (evt) {
  //   window.backend.save(new FormData(window.map.adForm), function () {
  //     window.map.adForm.reset();
  //     window.map.mapPinMain.style.top = MAIN_PIN_DEF_Y + 'px';
  //     window.map.mapPinMain.style.left = MAIN_PIN_DEF_X + 'px';
  //     window.map.mapPinMainActive(MAIN_PIN_DEF_X, MAIN_PIN_DEF_Y);
  //     window.card.successHandler();
  //   }, window.card.errorHandler);
  //   evt.preventDefault();
  // };

  // window.map.adForm.addEventListener('submit', successSaveHandler, window.card.errorHandler);
})();
