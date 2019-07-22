'use strict';

(function () {
  var TEXT_CAPACITY = '{rooms} комнаты для {guests} гостей';
  var TEXT_TIME = 'Заезд после {checkin}, выезд до {checkout}';
  var TEXT_PRICE = '{price}₽/ночь';

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
  // var offerFeaturesElement = offerCardElement.querySelector('.popup__features');
  var offerDescriptionElement = offerCardElement.querySelector('.popup__description');
  var offerPhotosElement = offerCardElement.querySelector('.popup__photos');
  var offerPhotoElement = offerPhotosElement.querySelector('img');
  var offerPhotoElementTemplate = offerPhotoElement.cloneNode(true);
  var offerAuthorAvatarElement = offerCardElement.querySelector('.popup__avatar');

  function renderPhotos(photos) {
    offerPhotosElement.innerHTML = '';
    photos.forEach(function (photo) {
      offerPhotoElement = offerPhotoElementTemplate.cloneNode(true);
      offerPhotoElement.src = photo;
      offerPhotosElement.appendChild(offerPhotoElement);
    });
  }

  function render(pin) {
    var accormodationType = AccomodationTypeMap[pin.offer.type];

    offerTitleElement.textContent = pin.offer.title;
    offerAddressElement.textContent = pin.offer.address;
    offerPriceElement.textContent = TEXT_PRICE.replace('{price}', pin.offer.price);
    offerTypeElement.textContent = accormodationType;
    offerTypeElement.style.display = accormodationType ? 'block' : 'none';
    offerCapacityElement.textContent = TEXT_CAPACITY.replace('{rooms}', pin.offer.rooms).replace('{guests}', pin.offer.guests);
    offerTimeElement.textContent = TEXT_TIME.replace('{checkin}', pin.offer.checkin).replace('{checkout}', pin.offer.checkout);
    offerDescriptionElement.textContent = pin.offer.description;
    offerAuthorAvatarElement.src = pin.author.avatar;
    renderPhotos(pin.offer.photos);
    mapElement.insertBefore(offerCardElement, filtersContainerElement);
  }

  window.card = {
    render: render
  };
})();
