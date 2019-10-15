'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var mapPinMain = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var adFormFieldset = adForm.querySelectorAll('fieldset');
  var mapFilters = document.querySelector('.map__filters');
  var mapFiltersFieldset = mapFilters.querySelectorAll('fieldset');
  var mapFiltersSelects = mapFilters.querySelectorAll('select');

  var isPageActive = false;

  var address = document.querySelector('#address');
  // Положения метки при не активном режиме
  var mapPinMainLeft = parseInt(mapPinMain.style.left, 10);
  var mapPinMainTop = parseInt(mapPinMain.style.top, 10);

  var cardFilters = document.querySelector('.map__filters-container');

  var WIDTH_MARKER = 65;
  var HEIGHT_MARKER = 87;

  // Положение метки при активном режиме
  var mapPinMainActive = function (left, top) {
    address.value = left + ', ' + top;
  };

  var activatePage = function () {
    if (!isPageActive) {
      window.util.disabledOn(adFormFieldset);
      window.util.disabledOn(mapFiltersFieldset);
      window.util.disabledOn(mapFiltersSelects);

      mapPinMainActive(mapPinMainLeft, mapPinMainTop);
    } else {
      map.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');
      window.util.disabledOff(adFormFieldset);
      window.util.disabledOff(mapFiltersFieldset);
      window.util.disabledOff(mapFiltersSelects);

      mapPinMainLeft = Math.floor(parseInt(mapPinMain.style.left, 10) + WIDTH_MARKER / 2);
      mapPinMainTop = Math.floor(parseInt(mapPinMain.style.top, 10) + HEIGHT_MARKER);

      mapPinMainActive(mapPinMainLeft, mapPinMainTop);

      // Вставляем в разметку метки
      mapPins.appendChild(window.card.fragmentMarker);
      // Вставляем в разметку карточки
      map.insertBefore(window.card.fragmentCard, cardFilters);

      window.move();
      window.popup();
    }
  };
  activatePage();

  var removePins = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < pins.length; i++) {
      if (!pins[i].classList.contains('hidden')) {
        pins[i].classList.toggle('hidden');
      }
    }
  };

  var removePopup = function () {
    var popup = document.querySelectorAll('.popup');
    for (var i = 0; i < popup.length; i++) {
      if (!popup[i].classList.contains('hidden')) {
        popup[i].classList.add('hidden');
      }
    }
  };

  var MAIN_DEF = {
    X: 570,
    Y: 375
  };

  var successSaveHandler = function (evt) {
    window.backend.save(new FormData(adForm), function () {
      adForm.reset();
      adForm.classList.add('ad-form--disabled');
      map.classList.add('map--faded');
      removePins();
      removePopup();
      isPageActive = false;
      mapPinMain.style.top = MAIN_DEF.Y + 'px';
      mapPinMain.style.left = MAIN_DEF.X + 'px';
      mapPinMainActive(MAIN_DEF.X, MAIN_DEF.Y);
      window.util.successHandler();
    }, window.util.errorHandler);
    evt.preventDefault();
  };

  adForm.addEventListener('submit', successSaveHandler, window.util.errorHandler);

  // Переводим страницу в активное состояние
  mapPinMain.addEventListener('mousedown', function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < pins.length; i++) {
      if (pins[i].classList.contains('hidden')) {
        pins[i].classList.remove('hidden');
      }
    }
    isPageActive = true;
    activatePage();
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    isPageActive = true;
    if (evt.keyCode === window.util.ENTER) {
      var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      for (var i = 0; i < pins.length; i++) {
        if (pins[i].classList.contains('hidden')) {
          pins[i].classList.remove('hidden');
        }
      }
      activatePage();
    }
  });

  window.map = {
    adForm: adForm,
    mapPinMain: mapPinMain,
    mapPinMainActive: mapPinMainActive,
    WIDTH_MARKER: WIDTH_MARKER,
    HEIGHT_MARKER: HEIGHT_MARKER,
    removePins: removePins,
    removePopup: removePopup,
  };
})();
