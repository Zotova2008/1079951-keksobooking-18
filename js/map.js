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

      mapPinMainLeft = Math.floor(parseInt(mapPinMain.style.left, 10) + window.card.widthMarker / 2);
      mapPinMainTop = Math.floor(parseInt(mapPinMain.style.top, 10) + window.card.heightMarket);

      mapPinMainActive(mapPinMainLeft, mapPinMainTop);

      // Вставляем в разметку метки
      mapPins.appendChild(window.card.fragmentMarker);
      // Вставляем в разметку карточки
      map.insertBefore(window.card.fragmentCard, cardFilters);

      mapPinMain.onmousedown = function (event) {
        var shiftX = event.clientX - mapPinMain.getBoundingClientRect().left;
        var shiftY = event.clientY - mapPinMain.getBoundingClientRect().top;
        mapPinMain.style.position = 'absolute';
        mapPinMain.style.zIndex = 1000;
        document.body.append(mapPinMain);
        moveAt(event.pageX, event.pageY);
        // переносит пин на координаты (pageX, pageY),
        // дополнительно учитывая изначальный сдвиг относительно указателя мыши
        function moveAt(pageX, pageY) {
          mapPinMain.style.left = pageX - shiftX + 'px';
          mapPinMain.style.top = pageY - shiftY + 'px';
        }

        function onMouseMove(evt) {
          moveAt(evt.pageX, evt.pageY);
          mapPinMainActive(Math.floor(parseInt(mapPinMain.style.left, 10)), Math.floor(parseInt(mapPinMain.style.top, 10)));
        }
        // передвигаем пин при событии mousemove
        document.addEventListener('mousemove', onMouseMove);
        // отпустить пин, удалить ненужные обработчики
        mapPinMain.onmouseup = function () {
          document.removeEventListener('mousemove', onMouseMove);
          mapPinMain.onmouseup = null;
        };
      };
      mapPinMain.ondragstart = function () {
        return false;
      };

      var popup = map.querySelectorAll('.popup');
      var mapPin = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
      var closeButton = document.querySelectorAll('.popup__close');

      mapPin.forEach(function (item) {
        var popupHidden = map.querySelectorAll('.popup.hidden');
        item.addEventListener('click', function (evt) {
          evt.preventDefault();
          var modalId = item.getAttribute('data-id');
          var modalElem = document.querySelector('.popup[id="' + modalId + '"]');
          for (var a = 0; a < popup.length; a++) {
            if (popupHidden) {
              popup[a].classList.add('hidden');
            }
          }
          window.util.openPopup(modalElem);
        });

        item.addEventListener('keydown', function (evt) {
          var modalId = evt.target.getAttribute('data-id');
          var modalElem = document.querySelector('.popup[id="' + modalId + '"]');
          if (evt.keyCode === window.util.enter) {
            evt.preventDefault();

            for (var a = 0; a < popup.length; a++) {
              if (popupHidden) {
                popup[a].classList.add('hidden');
              }
            }
            window.util.openPopup(modalElem);
          }

          if (evt.keyCode === window.util.esc) {
            modalElem.classList.add('hidden');
          }
        });

        for (var b = 0; b < closeButton.length; b++) {
          closeButton[b].addEventListener('click', function (evt) {
            evt.target.parentNode.classList.add('hidden');
          });
        }
      });
    }
  };
  activatePage();

  // Переводим страницу в активное состояние
  mapPinMain.addEventListener('mousedown', function () {
    isPageActive = true;
    activatePage();
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    isPageActive = true;
    if (evt.keyCode === window.util.enter) {
      activatePage();
    }
  });

  window.map = {
    adForm: adForm,
  };
})();
