'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var adFormElement = document.querySelector('.ad-form');
  var avatarChooserElement = adFormElement.querySelector('.ad-form__field input[type=file]');
  var avatarPreviewElement = adFormElement.querySelector('.ad-form-header__preview img');

  avatarChooserElement.addEventListener('change', function () {
    var file = avatarChooserElement.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        avatarPreviewElement.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  });
})();
