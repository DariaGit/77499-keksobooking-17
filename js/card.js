'use strict';

(function () {
  var AccomodationTypeMap = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  function fillTextContent(textWhere, textContent) {
    if (textContent) {
      textWhere.textContent = textContent;
    } else {
      textWhere.style.display = 'none';
    }
    return textWhere.textContent;
  }

  function fillPrice(textWhere, textContent) {
    textWhere.textContent = fillTextContent(textWhere, textContent) + '₽/ночь';
  }

  function fillAccomodationType(textWhere, textContent) {
    textWhere.textContent = AccomodationTypeMap[fillTextContent(textWhere, textContent)];
  }

  function fillCapacity(textWhere, rooms, guests) {
    textWhere.textContent = fillTextContent(textWhere, rooms) + ' комнаты для ' +
    fillTextContent(textWhere, guests) + ' гостей';
  }

  function fillTime(textWhere, checkin, checkout) {
    textWhere.textContent = 'Заезд после ' + fillTextContent(textWhere, checkin) +
    'выезд до ' + fillTextContent(textWhere, checkout);
  }

  function addAuthorAvatar(whereSRC, source) {
    if (source) {
      whereSRC.src = source;
    }
  }

  window.cards = {
    render: function (card) {
      var mapElement = document.querySelector('.map');
      var filtersContainerElement = document.querySelector('.map__filters-container');
      var cardTemplateElement = document.querySelector('#card').content.querySelector('.map__card');
      var offerCard = cardTemplateElement.cloneNode(true);
      var offerTitleElement = offerCard.querySelector('popup__title');
      var offerAddressElement = offerCard.querySelector('.popup__text--address');
      var offerPriceElement = offerCard.querySelector('.popup__text--price');
      var offerTypeElement = offerCard.querySelector('.popup__type');
      var offerCapacityElement = offerCard.querySelector('.popup__text--capacity');
      var offerTimeElement = offerCard.querySelector('.popup__text--time');
      // var offerFeaturesElement = offerCard.querySelector('.popup__features');
      var offerDescriptionElement = offerCard.querySelector('.popup__description');
      // var offerPhotosElement = offerCard.querySelector('.popup__photos');
      var offerAuthorAvatarElement = offerCard.querySelector('.popup__avatar');

      fillTextContent(offerTitleElement, card.offer.title);
      fillTextContent(offerAddressElement, card.offer.address);
      fillPrice(offerPriceElement, card.offer.price);
      fillAccomodationType(offerTypeElement, card.offer.type);
      fillCapacity(offerCapacityElement, card.offer.rooms, card.offer.guests);
      fillTime(offerTimeElement, card.offer.checkin, card.offer.checkout);
      fillTextContent(offerDescriptionElement, card.offer.description);
      addAuthorAvatar(offerAuthorAvatarElement, card.author.avatar);

      mapElement.insertBefore(card, filtersContainerElement);
    }
  };
})();
