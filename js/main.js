'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
// Количество объявлений
var NUM_OBJ = 8;
// Заголовок предложения
var OFFER_TITLE = ['Уютное гнездышко для молодоженов', 'Маленькая квартирка рядом с парком', 'Небольшая лавочка в парке', 'Маленькая квартирка на чердаке'];

// Стоимость недвижимости
var offerPriceMin = 0;
var offerPriceMax = 50000;

// Тип недвижимости
var OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var OFFER_TYPE_DESCRIPT = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'
};

// Количество комнат
// var offerRoomsMin = 1;
// var offerRoomsMax = 3;
var OFFER_ROOMS = ['1 комната', '2 комнаты', '3 комнаты', '100 комнат'];
var OFFER_QUESTS = ['для 1 гостя', 'для 2 гостей', 'для 3 гостей', 'не для гостей'];
var OFFER_PRICE = {
  bungalo: 0,
  flat: 1000,
  house: 5000,
  palace: 10000
};

// Время заезда и выезда
var OFFER_TIMES = ['12: 00', '13: 00', '14: 00'];

// Преимущества недвижимости
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

// Описание недвижимости
var OFFER_DESCRIPT = ['Шикарная жилая площадь.', 'Лучше не найдете.', 'Можно жить как дома.'];

var OFFER_PHOTO = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

// Координаты по оси X
var WIDTH_MAP = document.querySelector('.map').clientWidth;
var WIDTH_MARKER = 65;
var HEIGHT_MARKER = 87;
var LOCATION_Y_MIN = 130;
var LOCATION_Y_MAX = 630;

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

// Массив для настроек объекта (предложения)
var getSittingObj = function () {
  var randomObj = [];
  for (var i = 0; i < NUM_OBJ; i++) {
    var locationX = getRandomIndex(WIDTH_MAP - WIDTH_MARKER / 2);
    var locationY = getRandomRange(LOCATION_Y_MIN, LOCATION_Y_MAX - HEIGHT_MARKER);
    randomObj[i] = {
      author: {
        avatar: 'img/avatars/user0' + getRandomRange(1, NUM_OBJ) + '.png',
      },
      offer: {
        title: OFFER_TITLE[getRandomIndex(OFFER_TITLE.length)],
        address: locationX + ', ' + locationY,
        price: getRandomRange(offerPriceMin, offerPriceMax),
        type: OFFER_TYPE[getRandomIndex(OFFER_TYPE.length)],
        rooms: OFFER_ROOMS[getRandomIndex(OFFER_ROOMS.length)],
        guests: OFFER_QUESTS[getRandomIndex(OFFER_QUESTS.length)],
        checkin: OFFER_TIMES[getRandomIndex(OFFER_TIMES.length)],
        checkout: OFFER_TIMES[getRandomIndex(OFFER_TIMES.length)],
        features: getRandomArray(OFFER_FEATURES),
        description: OFFER_DESCRIPT[getRandomIndex(OFFER_DESCRIPT.length)],
        photos: OFFER_PHOTO[getRandomIndex(OFFER_PHOTO.length)],
      },
      location: {
        x: locationX,
        y: locationY,
      }
    };
  }
  return randomObj;
};

// Создание разметки 8 объектов (предложений) с помощью фрагмента
var map = document.querySelector('.map');
// Куда вставлять метку
var mapPins = document.querySelector('.map__pins');
var cardFilters = document.querySelector('.map__filters-container');
// Шаблон разметки для расположения метки
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
// Шаблон разметки для карточки
var cardTemplate = document.querySelector('#card').content.querySelector('.popup');

var avatarsMarkers = getSittingObj();

// Создаем данные для метки
var renderMarker = function (marker) {
  var marketElement = pinTemplate.cloneNode(true);
  marketElement.style.left = marker.location.x + 'px';
  marketElement.style.top = marker.location.y + 'px';
  var marketElementImg = marketElement.querySelector('img');
  marketElementImg.src = marker.author.avatar;
  marketElementImg.alt = marker.offer.title;

  return marketElement;
};

var renderFeatures = function (feature) {
  var featureFragment = document.createDocumentFragment();
  for (var i = 0; i < feature.offer.features.length; i++) {
    var featureElement = document.createElement('li');
    featureElement.classList.add('popup__feature', 'popup__feature--' + feature.offer.features[i]);
    featureFragment.appendChild(featureElement);
  }

  return featureFragment;
};

// Создаем данные для карточки
var renderCard = function (card) {
  var cardElement = cardTemplate.cloneNode(true);
  var featuresList = cardElement.querySelector('.popup__features');

  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = OFFER_TYPE_DESCRIPT[card.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' ' + card.offer.guests;
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
  featuresList.innerHTML = '';
  featuresList.appendChild(renderFeatures(card));
  cardElement.querySelector('.popup__description').textContent = card.offer.description;
  cardElement.querySelector('.popup__photos img').src = card.offer.photos;
  cardElement.querySelector('.popup__avatar').src = card.author.avatar;

  cardElement.classList.add('hidden');

  return cardElement;
};

// Создаем разметку для метки
var fragmentMarker = document.createDocumentFragment();
// Создаем разметку для карточки
var fragmentCard = document.createDocumentFragment();

for (var i = 0; i < NUM_OBJ; i++) {
  fragmentMarker.appendChild(renderMarker(avatarsMarkers[i]));
  fragmentMarker.childNodes[i].dataset.id = i + 1;
  fragmentCard.appendChild(renderCard(avatarsMarkers[i]));
  fragmentCard.childNodes[i].setAttribute('id', i + 1);
}

// Неактивное состояние страницы
var mapPinMain = document.querySelector('.map__pin--main');

var adForm = document.querySelector('.ad-form');
var adFormFieldset = adForm.querySelectorAll('fieldset');
var mapFilters = document.querySelector('.map__filters');
var mapFiltersFieldset = mapFilters.querySelectorAll('fieldset');
var mapFiltersSelects = mapFilters.querySelectorAll('select');

var isPageActive = false;

var address = document.querySelector('#address');

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

// Положения метки при не активном режиме
var mapPinMainLeft = parseInt(mapPinMain.style.left, 10);
var mapPinMainTop = parseInt(mapPinMain.style.top, 10);
// Положение метки при активном режиме
var mapPinMainActive = function (left, top) {
  address.value = left + ', ' + top;
};

var activatePage = function () {
  if (!isPageActive) {
    disabledOn(adFormFieldset);
    disabledOn(mapFiltersFieldset);
    disabledOn(mapFiltersSelects);

    mapPinMainActive(mapPinMainLeft, mapPinMainTop);
  } else {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    disabledOff(adFormFieldset);
    disabledOff(mapFiltersFieldset);
    disabledOff(mapFiltersSelects);

    mapPinMainLeft = Math.floor(parseInt(mapPinMain.style.left, 10) + WIDTH_MARKER / 2);
    mapPinMainTop = Math.floor(parseInt(mapPinMain.style.top, 10) + HEIGHT_MARKER);

    mapPinMainActive(mapPinMainLeft, mapPinMainTop);

    // Вставляем в разметку метки
    mapPins.appendChild(fragmentMarker);
    // Вставляем в разметку карточки
    map.insertBefore(fragmentCard, cardFilters);

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

    var openPopup = function (item) {
      item.classList.remove('hidden');
    };

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
        openPopup(modalElem);
      });

      item.addEventListener('keydown', function (evt) {
        var modalId = evt.target.getAttribute('data-id');
        var modalElem = document.querySelector('.popup[id="' + modalId + '"]');
        if (evt.keyCode === ENTER_KEYCODE) {
          evt.preventDefault();

          for (var a = 0; a < popup.length; a++) {
            if (popupHidden) {
              popup[a].classList.add('hidden');
            }
          }
          openPopup(modalElem);
        }

        if (evt.keyCode === ESC_KEYCODE) {
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
  if (evt.keyCode === ENTER_KEYCODE) {
    activatePage();
  }
});

// Создаем условия показа нужных характеристик комнат и гостей
var inputRoomNumber = adForm.querySelector('#room_number');
var inputType = adForm.querySelector('#type');
// var inputTypeCurrentValue = inputType.querySelector('option:checked').value;
var inputPrice = adForm.querySelector('#price');
var inputCapacity = adForm.querySelector('#capacity');
var inputCapacityOptions = inputCapacity.querySelectorAll('option');
var timein = adForm.querySelector('#timein');
var timeout = adForm.querySelector('#timeout');

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
