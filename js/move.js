'use strict';

(function () {

  var LOCATION_Y = {
    MIN: 130,
    MAX: 630,
  };

  var WIDTH_MAP = document.querySelector('.map').clientWidth;

  window.move = function () {
    window.map.mapPinMain.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      var target = evt.currentTarget;

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      function onMouseMove(moveEvt) {
        moveEvt.preventDefault();
        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        window.map.mapPinMain.style.top = window.map.mapPinMain.offsetTop - shift.y + 'px';
        window.map.mapPinMain.style.left = window.map.mapPinMain.offsetLeft - shift.x + 'px';

        if (parseInt(target.style.left, 10) < 0) {
          target.style.left = '0px';
        } else if (parseInt(target.style.left, 10) > WIDTH_MAP - window.map.WIDTH_MARKER) {
          target.style.left = WIDTH_MAP - window.map.WIDTH_MARKER + 'px';
        }

        if (parseInt(target.style.top, 10) < LOCATION_Y.MIN) {
          target.style.top = LOCATION_Y.MIN + 'px';
        } else if (parseInt(target.style.top, 10) > LOCATION_Y.MAX) {
          target.style.top = LOCATION_Y.MAX + 'px';
        }

        window.map.mapPinMainActive(parseInt(target.style.left, 10), parseInt(target.style.top, 10));
      }

      function onMouseUp(upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      }

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  };
})();
