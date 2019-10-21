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

  var filterByType = function (ads) {
    if (housingType.value === 'any') {
      return true;
    }
    return ads.offer.type === housingType.value;
  };

  var filterByFeatures = function (element) {
    var requiredFeatures = Array.from(housingFeatures.querySelectorAll('input:checked')).map(function (item) {
      return item.value;
    });
    return requiredFeatures.every(function (feature) {
      return element.offer.features.includes(feature);
    });
  };

  var filterByRooms = function (element) {
    if (housingRooms.value === 'any') {
      return true;
    }
    return element.offer.rooms === +housingRooms.value;
  };

  var filterByGuests = function (element) {
    if (housingGuests.value === 'any') {
      return true;
    }
    return element.offer.guests === +housingGuests.value;
  };

  var filterByPrice = function (element) {
    var isСhoosePrice;
    switch (housingPrice.value) {
      case 'middle':
        isСhoosePrice = (element > prices.min) && (element < prices.max);
        break;
      case 'low':
        isСhoosePrice = (element < prices.min);
        break;
      case 'high':
        isСhoosePrice = (element > prices.max);
        break;
      default:
        isСhoosePrice = true;
    }
    return isСhoosePrice;
  };

  var filterAds = function (data) {
    return data
      .filter(function (element) {
        return (
          filterByType(element) && filterByFeatures(element) && filterByRooms(element) && filterByGuests(element) && filterByPrice(element.offer.price)
        );
      })
      .slice(0, adsNum);
  };

  var onChangeFilter = window.debounce(function () {
    if (document.querySelector('.map__card')) {
      document.querySelector('.map__card').remove();
    }
    window.card.removePins();
    window.card.renderPin(filterAds(window.ads));
  });

  mapFilters.addEventListener('change', onChangeFilter);

  window.filterAds = filterAds;
})();
