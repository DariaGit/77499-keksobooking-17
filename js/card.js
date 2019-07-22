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
  var offerCard = cardTemplateElement.cloneNode(true);
  var offerTitleElement = offerCard.querySelector('.popup__title');
  var offerAddressElement = offerCard.querySelector('.popup__text--address');
  var offerPriceElement = offerCard.querySelector('.popup__text--price');
  var offerTypeElement = offerCard.querySelector('.popup__type');
  var offerCapacityElement = offerCard.querySelector('.popup__text--capacity');
  var offerTimeElement = offerCard.querySelector('.popup__text--time');
  // var offerFeaturesElement = offerCard.querySelector('.popup__features');
  var offerDescriptionElement = offerCard.querySelector('.popup__description');
  var offerPhotosElement = offerCard.querySelector('.popup__photos');
  var offerPhotoElement = offerPhotosElement.querySelector('img');
  var offerAuthorAvatarElement = offerCard.querySelector('.popup__avatar');

  function fillTextContent(textWhere, textContent) {
    if (textContent) {
      textWhere.textContent = textContent;
    } else {
      textWhere.style.display = 'none';
    }
    return textWhere.textContent;
  }

  function fillAccomodationType(textWhere, textContent) {
    textWhere.textContent = AccomodationTypeMap[fillTextContent(textWhere, textContent)];
  }

  function fillPhoto(pin) {
    var offerPhoto;
    if (pin.offer.photos.length > 0) {
      pin.offer.photos.forEach(function (item, index) {
        if (index === 0) {
          offerPhotoElement.src = item;
        } else {
          offerPhoto = offerPhotoElement.cloneNode(true);
          offerPhoto.src = item;
          offerPhotosElement.appendChild(offerPhoto);
        }
      });
    } else {
      offerPhotoElement.style.display = 'none';
    }
  }

  function render(pin) {
    offerTitleElement.textContent = pin.offer.title;
    offerAddressElement.textContent = pin.offer.address;
    offerPriceElement.textContent = TEXT_PRICE.replace('{price}', pin.offer.price);
    fillAccomodationType(offerTypeElement, pin.offer.type);
    TEXT_CAPACITY = TEXT_CAPACITY.replace('{rooms}', pin.offer.rooms);
    TEXT_CAPACITY = TEXT_CAPACITY.replace('{guests}', pin.offer.guests);
    offerCapacityElement.textContent = TEXT_CAPACITY;
    TEXT_TIME = TEXT_TIME.replace('{checkin}', pin.offer.checkin);
    TEXT_TIME = TEXT_TIME.replace('{checkout}', pin.offer.checkout);
    offerTimeElement.textContent = TEXT_TIME;
    offerDescriptionElement.textContent = pin.offer.description;
    offerAuthorAvatarElement.src = pin.author.avatar;
    fillPhoto(pin);
    mapElement.insertBefore(offerCard, filtersContainerElement);
  }

  window.card = {
    render: render
  };
})();
