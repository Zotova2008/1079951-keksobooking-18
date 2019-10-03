'use strict';

// Количество объявлений
var NUM_OBJ = 8;
// Заголовок предложения
var OFFER_TITLE = ['Уютное гнездышко для молодоженов', 'Маленькая квартирка рядом с парком', 'Небольшая лавочка в парке', 'Маленькая квартирка на чердаке'];

// Стоимость недвижимости
var offerPriceMin = 1000;
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

// Время заезда и выезда
var OFFER_TIMES = ['12: 00', '13: 00', '14: 00'];

// Преимущества недвижимости
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

// Описание недвижимости
var OFFER_DESCRIPT = ['Шикарная жилая площадь.', 'Лучше не найдете.', 'Можно жить как дома.'];

var OFFER_PHOTO = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

// Координаты по оси X
var WIDTH_MAP = document.querySelector('.map').clientWidth;
var HEIGHT_MAP = document.querySelector('.map').clientHeight;
var WIDTH_MARKER = 65;
var HEIGHT_MARKER = 65;
var HEIGHT_MARKER_AFTER = 22;
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
var mapSetting = document.querySelector('.map');

// Куда вставлять метку
var pinContainer = document.querySelector('.map__pins');
var cardContainer = document.querySelector('.map');
var cardFilter = document.querySelector('.map__filters-container');
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

// Создаем разметку для метки
var fragmentMarker = document.createDocumentFragment();
for (var i = 0; i < NUM_OBJ; i++) {
  fragmentMarker.appendChild(renderMarker(avatarsMarkers[i]));
}

var renderFeatures = function (feature) {
  var featureFragment = document.createDocumentFragment();
  for (var k = 0; k < feature.offer.features.length; k++) {
    var featureElement = document.createElement('li');
    featureElement.classList.add('popup__feature', 'popup__feature--' + feature.offer.features[k]);
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

  return cardElement;
};

// Создаем разметку для карточки
var fragmentCard = document.createDocumentFragment();
for (var j = 0; j < NUM_OBJ; j++) {
  fragmentCard.appendChild(renderCard(avatarsMarkers[j]));
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

var ENTER_KEYCODE = 13;

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
// Координаты главной метки для поля адрес в объявлении
var pinMainLeftAdressDisabled = Math.floor(WIDTH_MAP / 2);
var pinMainTopAdressDisabled = Math.floor(HEIGHT_MAP / 2);
var pinMainLeftAdressActive = pinMainLeftAdressDisabled;
var pinMainTopAdressActive = pinMainTopAdressDisabled + Math.floor(HEIGHT_MARKER / 2) + HEIGHT_MARKER_AFTER;
// Координаты главной метки для стилей
var pinMainLeft = pinMainLeftAdressDisabled - Math.floor(WIDTH_MARKER / 2);
var pinMainTop = pinMainTopAdressDisabled - Math.floor(HEIGHT_MARKER / 2);

// Положение метки при активном режиме
var mapPinMainValue = function (left, top) {
  address.value = left + ', ' + top;
  mapPinMain.style.left = pinMainLeft + 'px';
  mapPinMain.style.top = pinMainTop + 'px';
};

var activatePage = function () {
  if (!isPageActive) {
    disabledOn(adFormFieldset);
    disabledOn(mapFiltersFieldset);
    disabledOn(mapFiltersSelects);

    mapPinMainValue(pinMainLeftAdressDisabled, pinMainTopAdressDisabled);
  } else {
    mapSetting.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    disabledOff(adFormFieldset);
    disabledOff(mapFiltersFieldset);
    disabledOff(mapFiltersSelects);

    mapPinMainValue(pinMainLeftAdressActive, pinMainTopAdressActive);

    // Вставляем в разметку метки
    pinContainer.appendChild(fragmentMarker);
    // Вставляем в разметку карточки
    cardContainer.insertBefore(fragmentCard, cardFilter);
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
var inputRoomNumber = document.querySelector('#room_number');
var inputCapacity = document.querySelector('#capacity');
var inputCapacityOptions = inputCapacity.querySelectorAll('option');

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
