'use strict';
(function () {
  var ADS_NUM = 5;
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

  var checkPrice = function (element) {
    switch (housingPrice.value) {
      case 'any':
        return true;
      case 'low':
        return (element.offer.price < prices.min);
      case 'middle':
        return (element.offer.price > prices.min) && (element.offer.price < prices.max);
      case 'high':
        return (element.offer.price > prices.max);
      default:
        return element === housingPrice.value;
    }
  };

  var excerptAds = function (data) {
    return data
      .filter(function (element) {
        var isTypeMatched = housingType.value === 'any' ? true : element.offer.type === housingType.value;
        var isRoomsMatched = housingRooms.value === 'any' ? true : element.offer.rooms === +housingRooms.value;
        var isGuestMatched = housingGuests.value === 'any' ? true : element.offer.guests === +housingGuests.value;
        var isPriceMatched = checkPrice(element);
        var requiredFeatures = Array.from(housingFeatures.querySelectorAll('input:checked')).map(function (item) {
          return item.value;
        });
        var isFeaturesMatched = requiredFeatures.every(function (feature) {
          return element.offer.features.includes(feature);
        });
        return isTypeMatched && isRoomsMatched && isGuestMatched && isPriceMatched && isFeaturesMatched;
      }).slice(0, ADS_NUM);
  };

  var onFilterChange = window.debounce(function () {
    if (document.querySelector('.map__card')) {
      document.querySelector('.map__card').remove();
    }
    window.card.removePins();
    window.card.renderPin(excerptAds(window.ads));
  });

  mapFilters.addEventListener('change', onFilterChange);

  window.filter = {
    excerptAds: excerptAds,
    mapFilters: mapFilters,
  };
})();
