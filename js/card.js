'use strict';

(function () {
  var NUM_OBJ = 8;
  var OFFER_TITLE = ['Уютное гнездышко для молодоженов', 'Маленькая квартирка рядом с парком', 'Небольшая лавочка в парке', 'Маленькая квартирка на чердаке'];
  var offerPriceMin = 0;
  var offerPriceMax = 50000;
  var OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];
  var OFFER_TYPE_DESCRIPT = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };
  var OFFER_ROOMS = ['1 комната', '2 комнаты', '3 комнаты', '100 комнат'];
  var OFFER_QUESTS = ['для 1 гостя', 'для 2 гостей', 'для 3 гостей', 'не для гостей'];
  var OFFER_TIMES = ['12: 00', '13: 00', '14: 00'];
  var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var OFFER_DESCRIPT = ['Шикарная жилая площадь.', 'Лучше не найдете.', 'Можно жить как дома.'];

  var OFFER_PHOTO = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  var WIDTH_MAP = document.querySelector('.map').clientWidth;
  var WIDTH_MARKER = 65;
  var HEIGHT_MARKER = 87;
  var LOCATION_Y_MIN = 130;
  var LOCATION_Y_MAX = 630;

  var cardTemplate = document.querySelector('#card').content.querySelector('.popup');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  // Массив для настроек объекта (предложения)
  var getSittingObj = function () {
    var randomObj = [];
    for (var i = 0; i < NUM_OBJ; i++) {
      var locationX = window.util.getRandomIndex(WIDTH_MAP - WIDTH_MARKER / 2);
      var locationY = window.util.getRandomRange(LOCATION_Y_MIN, LOCATION_Y_MAX - HEIGHT_MARKER);
      randomObj[i] = {
        author: {
          avatar: 'img/avatars/user0' + window.util.getRandomRange(1, NUM_OBJ) + '.png',
        },
        offer: {
          title: OFFER_TITLE[window.util.getRandomIndex(OFFER_TITLE.length)],
          address: locationX + ', ' + locationY,
          price: window.util.getRandomRange(offerPriceMin, offerPriceMax),
          type: OFFER_TYPE[window.util.getRandomIndex(OFFER_TYPE.length)],
          rooms: OFFER_ROOMS[window.util.getRandomIndex(OFFER_ROOMS.length)],
          guests: OFFER_QUESTS[window.util.getRandomIndex(OFFER_QUESTS.length)],
          checkin: OFFER_TIMES[window.util.getRandomIndex(OFFER_TIMES.length)],
          checkout: OFFER_TIMES[window.util.getRandomIndex(OFFER_TIMES.length)],
          features: window.util.getRandomArray(OFFER_FEATURES),
          description: OFFER_DESCRIPT[window.util.getRandomIndex(OFFER_DESCRIPT.length)],
          photos: OFFER_PHOTO[window.util.getRandomIndex(OFFER_PHOTO.length)],
        },
        location: {
          x: locationX,
          y: locationY,
        }
      };
    }
    return randomObj;
  };

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

  window.card = {
    widthMap: WIDTH_MAP,
    locationYMin: LOCATION_Y_MIN,
    locationYMax: LOCATION_Y_MAX,
    widthMarker: WIDTH_MARKER,
    heightMarket: HEIGHT_MARKER,
    fragmentMarker: fragmentMarker,
    fragmentCard: fragmentCard,
  };
})();
