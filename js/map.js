'use strict';

(function () {
  var map = document.querySelector('.map');
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
      window.card.removePins();

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
      window.backend.load(window.card.renderFilterPins, window.util.errorHandler);
      window.move();
    }
  };
  activatePage();

  var MAIN_DEF = {
    X: 570,
    Y: 375
  };

  var successSaveHandler = function (evt) {
    window.backend.save(new FormData(adForm), function () {
      adForm.reset();
      adForm.classList.add('ad-form--disabled');
      map.classList.add('map--faded');
      // window.card.removePins();
      window.card.removePopup();
      isPageActive = false;
      activatePage();
      mapPinMain.style.top = MAIN_DEF.Y + 'px';
      mapPinMain.style.left = MAIN_DEF.X + 'px';
      mapPinMainActive(MAIN_DEF.X, MAIN_DEF.Y);
      window.util.successHandler();
      mapPinMain.addEventListener('mousedown', onActiveClickPage);
      mapPinMain.addEventListener('keydown', onActiveKeyPage);
    }, window.util.errorHandler);
    evt.preventDefault();
  };

  adForm.addEventListener('submit', successSaveHandler, window.util.errorHandler);

  // Переводим страницу в активное состояние
  var onActiveClickPage = function (evt) {
    evt.preventDefault();
    isPageActive = true;
    activatePage();
    mapPinMain.removeEventListener('mousedown', onActiveClickPage);
    mapPinMain.removeEventListener('keydown', onActiveKeyPage);
  };

  var onActiveKeyPage = function (evt) {
    isPageActive = true;
    if (evt.keyCode === window.util.ENTER) {
      activatePage();
    }
    mapPinMain.removeEventListener('mousedown', onActiveClickPage);
    mapPinMain.removeEventListener('keydown', onActiveKeyPage);
  };

  mapPinMain.addEventListener('mousedown', onActiveClickPage);
  mapPinMain.addEventListener('keydown', onActiveKeyPage);

  window.map = {
    adForm: adForm,
    isPageActive: isPageActive,
    mapPinMain: mapPinMain,
    mapPinMainActive: mapPinMainActive,
    WIDTH_MARKER: WIDTH_MARKER,
    HEIGHT_MARKER: HEIGHT_MARKER,
  };
})();
