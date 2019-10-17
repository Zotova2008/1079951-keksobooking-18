'use strict';
(function () {
  var housingType = document.querySelector('#housing-type');

  var filterAds = function (ads) {
    return filterByType(ads).slice(0, 5);
  };

  var filterByType = function (ads) {
    return ads.filter(function (ad) {
      if (housingType.value === 'any') {
        return true;
      }
      return ad.offer.type === housingType.value;
    });
  };

  // function filterTypes(element) {
  //   if (housingType.value === 'any') {
  //     return true;
  //   }
  //   return element.offer.type === housingType.value;
  // }

  document.addEventListener('change', function () {
    if (document.querySelector('.map__card')) {
      document.querySelector('.map__card').remove();
    }
    window.card.removePins();
    window.card.renderPin(filterAds(window.ads));
  });

  window.filterAds = filterAds;
})();
