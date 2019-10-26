'use strict';
(function () {
  var adsNum = 5;
  var mapFilters = document.querySelector('.map__filters');
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelector('#housing-features');

  var prices = {
    min: 10000,
    max: 50000
  };

  var getFilterByType = function (ads) {
    if (housingType.value === 'any') {
      return true;
    }
    return ads.offer.type === housingType.value;
  };

  var getFilterByFeatures = function (element) {
    var requiredFeatures = Array.from(housingFeatures.querySelectorAll('input:checked')).map(function (item) {
      return item.value;
    });
    return requiredFeatures.every(function (feature) {
      return element.offer.features.includes(feature);
    });
  };

  var getFilterByRooms = function (element) {
    if (housingRooms.value === 'any') {
      return true;
    }
    return element.offer.rooms === +housingRooms.value;
  };

  var getFilterByGuests = function (element) {
    if (housingGuests.value === 'any') {
      return true;
    }
    return element.offer.guests === +housingGuests.value;
  };

  var getFilterByPrice = function (element) {
    var isChoicePrice;
    switch (housingPrice.value) {
      case 'middle':
        isChoicePrice = (element > prices.min) && (element < prices.max);
        break;
      case 'low':
        isChoicePrice = (element < prices.min);
        break;
      case 'high':
        isChoicePrice = (element > prices.max);
        break;
      default:
        isChoicePrice = true;
    }
    return isChoicePrice;
  };

  var filterAds = function (data) {
    return data
      .filter(function (element) {
        return (
          getFilterByType(element) &&
          getFilterByFeatures(element) &&
          getFilterByRooms(element) &&
          getFilterByGuests(element) &&
          getFilterByPrice(element.offer.price)
        );
      })
      .slice(0, adsNum);
  };

  var onFilterChange = window.debounce(function () {
    if (document.querySelector('.map__card')) {
      document.querySelector('.map__card').remove();
    }
    window.card.removePins();
    window.card.renderPin(filterAds(window.ads));
  });

  mapFilters.addEventListener('change', onFilterChange);

  window.filter = {
    filterAds: filterAds,
    mapFilters: mapFilters,
  };
})();
