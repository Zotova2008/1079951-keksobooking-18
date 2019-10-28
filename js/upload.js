'use strict';
(function () {
  var AVATAR_START = 'img/muffin-grey.svg';
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var fileChooserAvatar = document.querySelector('.ad-form-header__upload input[type=file]');
  var previewAvatar = document.querySelector('.ad-form-header__preview img');
  var fileChooserImage = document.querySelector('.ad-form__upload input[type=file]');
  var photoContainer = document.querySelector('.ad-form__photo-container');
  var formPhoto = document.querySelector('.ad-form__photo');

  var onFileChange = function (fileChooser, preview) {
    var file = fileChooser.files[0];

    if (file) {
      var fileName = file.name.toLowerCase();
      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });
    }

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }

    return matches;
  };

  fileChooserAvatar.addEventListener('change', function () {
    onFileChange(fileChooserAvatar, previewAvatar);
  });

  fileChooserImage.addEventListener('change', function () {
    var image = formPhoto.querySelector('img');
    if (!image) {
      image = document.createElement('img');
      if (onFileChange(fileChooserImage, image)) {
        formPhoto.appendChild(image);
      }
    } else {
      var newFormPhoto = formPhoto.cloneNode(true);
      if (onFileChange(fileChooserImage, newFormPhoto.querySelector('img'))) {
        photoContainer.appendChild(newFormPhoto);
      }
    }
  });

  window.resetFormImage = function () {
    previewAvatar.src = AVATAR_START;
    var allPhotos = photoContainer.querySelectorAll('.ad-form__photo');
    allPhotos[0].innerHTML = '';
    Array.from(allPhotos).slice(1).forEach(function (el) {
      el.remove();
    });
  };
})();
