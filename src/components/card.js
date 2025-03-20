export { createCard, deleteCard, likeCard };

const createCard = (imageCard, nameCard, deleteCard, likeCard, viewCardImage) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  cardElement.querySelector('.card__image').src = imageCard;
  cardElement.querySelector('.card__image').alt = 'пейзаж';
  cardElement.querySelector('.card__title').textContent = nameCard;
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  cardDeleteButton.addEventListener('click', () => deleteCard(cardElement));
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  cardLikeButton.addEventListener('click', () => likeCard(cardLikeButton));
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.addEventListener('click', () => viewCardImage(cardImage));
  return cardElement;
};  

const deleteCard = (cardElement) => {
    cardElement.remove();
};

const likeCard = (cardElement) => {
    cardElement.classList.toggle('card__like-button_is-active');
};