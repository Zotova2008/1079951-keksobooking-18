'use strict';

// Количество объявлений
var NUM_OBJ = 8;
// Заголовок предложения
var OFFER_TITLE = ['Супер цена', 'Рядом с метро', 'В центре', 'Рядом с парком'];

// Стоимость недвижимости
var offerPriceMin = 1000;
var offerPriceMax = 50000;

// Тип недвижимости
var OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];

// Количество комнат
var offerRoomsMin = 1;
var offerRoomsMax = 3;

// Время заезда и выезда
var OFFER_TIMES = ['12: 00', '13: 00', '14: 00'];

// Преимущества недвижимости
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

// Описание недвижимости
var OFFER_DESCRIPT = ['Шикарная жилая площадь.', 'Лучше не найдете.', 'Можно жить как дома.'];

var OFFER_PHOTO = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

// Координаты по оси X
var WIDTH_MAP = document.querySelector('.map').clientWidth;
var WIDTH_MARKER = document.querySelector('.map__pin').clientWidth;
var HEIGHT_MARKER = document.querySelector('.map__pin').clientHeight;
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
    var OFFER_ROOMS = getRandomRange(offerRoomsMin, offerRoomsMax);
    randomObj[i] = {
      author: {
        avatar: 'img/avatars/user0' + getRandomRange(1, NUM_OBJ) + '.png',
      },
      offer: {
        title: OFFER_TITLE[getRandomIndex(OFFER_TITLE.length)],
        address: locationX + ', ' + locationY,
        price: getRandomRange(offerPriceMin, offerPriceMax),
        type: OFFER_TYPE[getRandomIndex(OFFER_TYPE.length)],
        rooms: OFFER_ROOMS,
        guests: OFFER_ROOMS * 2,
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
mapSetting.classList.remove('map--faded');

// Куда вставлять метку
var pinContainer = document.querySelector('.map__pins');
// Шаблон разметки для расположения метки
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
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
var fragment = document.createDocumentFragment();
for (var i = 0; i < NUM_OBJ; i++) {
  fragment.appendChild(renderMarker(avatarsMarkers[i]));
}
// Вставляем в разметку
pinContainer.appendChild(fragment);
