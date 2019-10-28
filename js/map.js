'use strict';

(function () {
  var WIDTH_MARKER = 65;
  var HEIGHT_MARKER = 87;
  var MAIN_DEF = {
    X: 570,
    Y: 375
  };
  var main = document.querySelector('main');
  var map = document.querySelector('.map');
  var pinMain = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var adFormFieldset = adForm.querySelectorAll('fieldset');
  var mapFilters = window.filter.mapFilters;
  var mapFiltersFieldset = mapFilters.querySelectorAll('fieldset');
  var mapFiltersSelects = mapFilters.querySelectorAll('select');
  var buttonFormReset = adForm.querySelector('.ad-form__reset');
  var isPageActive = false;
  var address = document.querySelector('#address');
  var pinMainLeft = parseInt(pinMain.style.left, 10);
  var pinMainTop = parseInt(pinMain.style.top, 10);

  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var pinMainActive = function (left, top) {
    address.value = left + ', ' + top;
  };

  var successHandler = function () {
    // var successTemplate = document.querySelector('#success').content.querySelector('.success');
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
    // var errorTemplate = document.querySelector('#error').content.querySelector('.error');
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
      if (evt.keyCode === window.util.ESC) {
        errorElement.remove();
      }
    });
  };

  var activatePage = function () {
    if (!isPageActive) {
      window.util.disabledOn(adFormFieldset);
      window.util.disabledOn(mapFiltersFieldset);
      window.util.disabledOn(mapFiltersSelects);
      window.card.removePins();

      pinMainActive(pinMainLeft, pinMainTop);
    } else {
      map.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');
      window.util.disabledOff(adFormFieldset);
      window.util.disabledOff(mapFiltersFieldset);
      window.util.disabledOff(mapFiltersSelects);

      pinMainLeft = Math.floor(parseInt(pinMain.style.left, 10) + WIDTH_MARKER / 2);
      pinMainTop = Math.floor(parseInt(pinMain.style.top, 10) + HEIGHT_MARKER);

      pinMainActive(pinMainLeft, pinMainTop);
      window.backend.load(window.card.renderFilterPins, errorHandler);
      window.move();
    }
  };
  activatePage();

  var deactivationPage = function () {
    adForm.reset();
    adForm.classList.add('ad-form--disabled');
    map.classList.add('map--faded');
    window.resetFormImage();
    mapFilters.reset();
    window.card.removePopup();
    isPageActive = false;
    activatePage();
    pinMain.style.top = MAIN_DEF.Y + 'px';
    pinMain.style.left = MAIN_DEF.X + 'px';
    pinMainActive(MAIN_DEF.X, MAIN_DEF.Y);
    pinMain.addEventListener('mousedown', onActiveClickPage);
    pinMain.addEventListener('keydown', onActiveKeyPage);
  };

  var successSaveHandler = function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(adForm), function () {
      deactivationPage();
      successHandler();
    }, errorHandler);
  };

  adForm.addEventListener('submit', successSaveHandler, errorHandler);

  buttonFormReset.addEventListener('click', function () {
    deactivationPage();
  });

  var onActiveClickPage = function (evt) {
    evt.preventDefault();
    isPageActive = true;
    activatePage();
    pinMain.removeEventListener('mousedown', onActiveClickPage);
    pinMain.removeEventListener('keydown', onActiveKeyPage);
  };

  var onActiveKeyPage = function (evt) {
    isPageActive = true;
    if (evt.keyCode === window.util.ENTER) {
      activatePage();
    }
    pinMain.removeEventListener('mousedown', onActiveClickPage);
    pinMain.removeEventListener('keydown', onActiveKeyPage);
  };

  pinMain.addEventListener('mousedown', onActiveClickPage);
  pinMain.addEventListener('keydown', onActiveKeyPage);

  window.map = {
    adForm: adForm,
    isPageActive: isPageActive,
    pinMain: pinMain,
    pinMainActive: pinMainActive,
    WIDTH_MARKER: WIDTH_MARKER,
  };
})();
