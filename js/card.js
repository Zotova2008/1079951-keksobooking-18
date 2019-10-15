'use strict';

(function () {
  var OFFER_TYPE_DESCRIPT = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  var pinsNum = 5;
  var cardTemplate = document.querySelector('#card').content.querySelector('.popup');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  // Создаем данные для метки
  var renderMarker = function (data) {
    var marketElement = pinTemplate.cloneNode(true);
    marketElement.style.left = data.location.x + 'px';
    marketElement.style.top = data.location.y + 'px';
    var marketElementImg = marketElement.querySelector('img');
    marketElementImg.src = data.author.avatar;
    marketElementImg.alt = data.offer.title;

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
    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнат ' + ' для ' + card.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    featuresList.innerHTML = '';
    featuresList.appendChild(renderFeatures(card));
    cardElement.querySelector('.popup__description').textContent = card.offer.description;
    for (var i = 0; i < card.offer.photos.length; i++) {
      cardElement.querySelector('.popup__photo').src = card.offer.photos[i];
      cardElement.querySelector('.popup__photos').appendChild(cardElement.querySelector('.popup__photo').cloneNode(true));
    }
    cardElement.querySelectorAll('.popup__photo')[0].remove();
    cardElement.querySelector('.popup__avatar').src = card.author.avatar;

    cardElement.classList.add('hidden');

    return cardElement;
  };
  // Создаем разметку для метки
  var fragmentMarker = document.createDocumentFragment();
  // Создаем разметку для карточки
  var fragmentCard = document.createDocumentFragment();
  var successAvater = function (avatar) {
    for (var i = 0; i < avatar.length && i < pinsNum; i++) {
      fragmentMarker.appendChild(renderMarker(avatar[i]));
      fragmentMarker.childNodes[i].dataset.id = i + 1;
      fragmentCard.appendChild(renderCard(avatar[i]));
      fragmentCard.childNodes[i].setAttribute('id', i + 1);
    }
  };

  window.backend.load(successAvater, window.util.errorHandler);

  window.card = {
    fragmentMarker: fragmentMarker,
    fragmentCard: fragmentCard,
    successAvater: successAvater,
    renderMarker: renderMarker,
    pinsNum: pinsNum,
  };
})();
