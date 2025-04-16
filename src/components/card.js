export { createCard, likeCard };
import { sendLike, recallLike } from "./api";


const createCard = (myId, idOwner, imageCard, nameCard, likesCardList, idCard, deleteCard, likeCard, viewCardImage) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  cardElement.querySelector('.card__image').src = imageCard;
  cardElement.querySelector('.card__image').alt = nameCard;
  cardElement.querySelector('.card__title').textContent = nameCard;
  const cardLikeCounter = cardElement.querySelector('.card__like-number');
  cardLikeCounter.textContent = likesCardList.length;
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  if (idOwner !== myId) {
    cardDeleteButton.classList.add('card__delete-button_invisible');
    cardDeleteButton.disabled = true;
  };
  cardDeleteButton.addEventListener('click', () => deleteCard(cardElement, idCard));
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  hasMyLike(likesCardList, myId);
  if (hasMyLike(likesCardList, myId)) {
    cardLikeButton.classList.add('card__like-button_is-active');
  };
  cardLikeButton.addEventListener('click', () => likeCard(cardLikeButton, cardLikeCounter, idCard));
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.addEventListener('click', () => viewCardImage(cardImage));
  return cardElement;
};  

const hasMyLike = (likesCardList, myId) => {
  const idLikesCardList = (Array.from(likesCardList)).map(element => element._id);
  return (idLikesCardList.includes(myId));
};

const likeCard = (cardElement, cardLikeCounter, idCard) => {
  if (Array.from(cardElement.classList).includes('card__like-button_is-active')) {
    recallLike(idCard)
    .then(res => {
      cardLikeCounter.textContent = res.likes.length;
      cardElement.classList.toggle('card__like-button_is-active');
    })
    .catch(err => {alert(`Запрос не может быть корректно обработан. Ошибка: ${err}`)})
  } else {
    sendLike(idCard)
    .then(res => {
      cardLikeCounter.textContent = res.likes.length;
      cardElement.classList.toggle('card__like-button_is-active');
    })
    .catch(err => {alert(`Запрос не может быть корректно обработан. Ошибка: ${err}`)})
  }
};