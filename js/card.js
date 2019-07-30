'use strict';

(function () {
  var TEXT_CAPACITY = '{rooms} комнаты для {guests} гостей';
  var TEXT_TIME = 'Заезд после {checkin}, выезд до {checkout}';
  var TEXT_PRICE = '{price}₽/ночь';

  var KEY_CODE_ESC = 27;
  var KEY_CODE_ENTER = 13;

  var AccomodationTypeMap = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  var mapElement = document.querySelector('.map');
  var filtersContainerElement = document.querySelector('.map__filters-container');
  var cardTemplateElement = document.querySelector('#card').content.querySelector('.map__card');
  var offerCardElement = cardTemplateElement.cloneNode(true);
  var offerTitleElement = offerCardElement.querySelector('.popup__title');
  var offerAddressElement = offerCardElement.querySelector('.popup__text--address');
  var offerPriceElement = offerCardElement.querySelector('.popup__text--price');
  var offerTypeElement = offerCardElement.querySelector('.popup__type');
  var offerCapacityElement = offerCardElement.querySelector('.popup__text--capacity');
  var offerTimeElement = offerCardElement.querySelector('.popup__text--time');
  var offerFeaturesElement = offerCardElement.querySelector('.popup__features');
  var offerDescriptionElement = offerCardElement.querySelector('.popup__description');
  var offerPhotosElement = offerCardElement.querySelector('.popup__photos');
  var offerPhotoElement = offerPhotosElement.querySelector('img');
  var offerPhotoElementTemplate = offerPhotoElement.cloneNode(true);
  var offerAuthorAvatarElement = offerCardElement.querySelector('.popup__avatar');
  var popupCloseElement = offerCardElement.querySelector('.popup__close');

  function renderPhotos(photos) {
    offerPhotosElement.innerHTML = '';
    photos.forEach(function (photo) {
      offerPhotoElement = offerPhotoElementTemplate.cloneNode(true);
      offerPhotoElement.src = photo;
      offerPhotosElement.appendChild(offerPhotoElement);
    });
  }

  function renderFeatures(features) {
    var hasFeatures = Boolean(features && features.length);
    var fragment;

    offerFeaturesElement.innerHTML = '';
    offerFeaturesElement.style.display = hasFeatures ? 'block' : 'none';

    if (hasFeatures) {
      fragment = document.createDocumentFragment();
      features.forEach(function (feature) {
        var element = document.createElement('li');
        element.classList.add('popup__feature');
        element.classList.add('popup__feature--' + feature);
        fragment.appendChild(element);
      });
      offerFeaturesElement.appendChild(fragment);
    }
  }

  function render(pin) {
    var accormodationType = AccomodationTypeMap[pin.offer.type];

    offerAuthorAvatarElement.src = pin.author.avatar;
    offerAddressElement.textContent = pin.offer.address;
    offerTitleElement.textContent = pin.offer.title;
    offerTypeElement.textContent = accormodationType;
    offerTypeElement.style.display = accormodationType ? 'block' : 'none';
    offerDescriptionElement.textContent = pin.offer.description;

    offerCapacityElement.textContent = TEXT_CAPACITY
      .replace('{rooms}', pin.offer.rooms)
      .replace('{guests}', pin.offer.guests);

    offerTimeElement.textContent = TEXT_TIME
      .replace('{checkin}', pin.offer.checkin)
      .replace('{checkout}', pin.offer.checkout);

    offerPriceElement.textContent = TEXT_PRICE
      .replace('{price}', pin.offer.price);

    offerCapacityElement.style.display = pin.offer.rooms || pin.offer.guests
      ? 'block'
      : 'none';

    offerTimeElement.style.display = pin.offer.checkin !== '0:00' || pin.offer.checkout !== '0:00'
      ? 'block'
      : 'none';

    renderPhotos(pin.offer.photos);
    renderFeatures(pin.offer.features);

    mapElement.insertBefore(offerCardElement, filtersContainerElement);
  }

  function onPopupCloseElementClick() {
    destroy();
  }

  function onPopupCloseElementKeydown(evt) {
    if (evt.keyCode === KEY_CODE_ENTER) {
      destroy();
    }
  }

  function onDocumentKeydown(evt) {
    if (evt.keyCode === KEY_CODE_ESC) {
      destroy();
    }
  }

  function createListeners() {
    popupCloseElement.addEventListener('click', onPopupCloseElementClick);
    popupCloseElement.addEventListener('keydown', onPopupCloseElementKeydown);
    document.addEventListener('keydown', onDocumentKeydown);
  }

  function unrender() {
    if (mapElement.contains(offerCardElement)) {
      mapElement.removeChild(offerCardElement);
    }
  }

  function destroyListeners() {
    popupCloseElement.removeEventListener('click', onPopupCloseElementClick);
    popupCloseElement.removeEventListener('keydown', onPopupCloseElementKeydown);
    document.removeEventListener('keydown', onDocumentKeydown);
  }

  function destroy() {
    unrender();
    destroyListeners();
  }

  window.card = {
    create: function (pin) {
      if (mapElement.contains(offerCardElement)) {
        destroy();
      }
      render(pin);
      createListeners();
    },
    destroy: destroy
  };
})();
