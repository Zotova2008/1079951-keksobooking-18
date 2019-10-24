'use strict';

(function () {
  var OFFER_TYPE_DESCRIPT = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  var mapPins = document.querySelector('.map__pins');
  var cardTemplate = document.querySelector('#card').content.querySelector('.popup');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var cardFilters = document.querySelector('.map__filters-container');

  var removePins = function () {
    var mapPin = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < mapPin.length; i++) {
      mapPin[i].remove();
    }
  };

  var removePopup = function () {
    var popup = document.querySelector('.popup');
    if (popup) {
      popup.remove();
    }
    document.removeEventListener('keydown', onActionClosePopup);
    document.removeEventListener('click', onActionClosePopup);
  };

  var refreshPopup = function (ad) {
    removePopup();
    document.removeEventListener('click', onPinClick);
    document.removeEventListener('keydown', onPinKeydown);
    renderAd(ad);
  };

  var onPinClick = function (pin, ad) {
    pin.addEventListener('click', function () {
      refreshPopup(ad);
      document.addEventListener('click', onActionClosePopup);
    });
  };

  var onPinKeydown = function (pin, ad) {
    pin.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.ENTER) {
        refreshPopup(ad);
      }
      document.addEventListener('keydown', onActionClosePopup);
    });
  };

  var onActionClosePopup = function (evt) {
    if (evt.keyCode === window.util.ESC || window.util.ENTER && evt.target.matches('.popup__close')) {
      removePopup();
    }
    if (evt.target.matches('.popup__close')) {
      removePopup();
    }
  };

  var renderFilterPins = function (ads) {
    window.ads = ads;
    var filteredAds = window.filter.filterAds(ads);
    renderPin(filteredAds);
  };

  // Создаем данные для метки
  var renderPin = function (data) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
      var ad = data[i];
      var pinElement = pinTemplate.cloneNode(true);
      pinElement.style.left = ad.location.x + 'px';
      pinElement.style.top = ad.location.y + 'px';
      var pinElementImg = pinElement.querySelector('img');
      pinElementImg.src = ad.author.avatar;
      pinElementImg.alt = ad.offer.title;
      onPinClick(pinElement, ad);
      onPinKeydown(pinElement, ad);
      fragment.appendChild(pinElement);
    }
    mapPins.appendChild(fragment);
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
  var renderAd = function (card) {
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

    document.querySelector('.map').insertBefore(cardElement, cardFilters);
  };

  window.card = {
    cardFilters: cardFilters,
    renderFilterPins: renderFilterPins,
    removePins: removePins,
    removePopup: removePopup,
    renderPin: renderPin,
  };
})();
