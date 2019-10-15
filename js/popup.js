'use strict';

(function () {

  window.popup = function () {
    var popup = document.querySelectorAll('.popup');
    var mapPin = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    var closeButton = document.querySelectorAll('.popup__close');

    mapPin.forEach(function (item) {
      var popupHidden = document.querySelectorAll('.popup.hidden');
      item.addEventListener('click', function (evt) {
        evt.preventDefault();
        var modalId = item.getAttribute('data-id');
        var modalElem = document.querySelector('.popup[id="' + modalId + '"]');
        for (var a = 0; a < popup.length; a++) {
          if (popupHidden) {
            popup[a].classList.add('hidden');
          }
        }
        window.util.openPopup(modalElem);
      });

      item.addEventListener('keydown', function (evt) {
        var modalId = evt.target.getAttribute('data-id');
        var modalElem = document.querySelector('.popup[id="' + modalId + '"]');
        if (evt.keyCode === window.util.ENTER) {
          evt.preventDefault();

          for (var a = 0; a < popup.length; a++) {
            if (popupHidden) {
              popup[a].classList.add('hidden');
            }
          }
          window.util.openPopup(modalElem);
        }

        if (evt.keyCode === window.util.ESC) {
          modalElem.classList.add('hidden');
        }
      });

      for (var b = 0; b < closeButton.length; b++) {
        closeButton[b].addEventListener('click', function (evt) {
          evt.target.parentNode.classList.add('hidden');
        });
      }
    });
  };
})();
