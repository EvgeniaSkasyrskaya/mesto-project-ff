export { createCard, deleteCard, likeCard };
import { openModal, listenClick, closeModal } from "./modal";
import { recallCard, sendLike, recallLike } from "./api";
import { myId, formConfirmDeletion, popupConfirmDeletion } from "..";

const createCard = (idOwner, imageCard, nameCard, likesCardList, idCard, deleteCard, likeCard, viewCardImage) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  cardElement.querySelector('.card__image').src = imageCard;
  cardElement.querySelector('.card__image').alt = 'пейзаж';
  cardElement.querySelector('.card__title').textContent = nameCard;
  cardElement.querySelector('.card__like-number').textContent = likesCardList.length;
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  if (idOwner !== myId) {
    cardDeleteButton.classList.add('card__delete-button_invisible');
    cardDeleteButton.disabled = true;
  };
  cardDeleteButton.addEventListener('click', () => deleteCard(cardElement, idCard));
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  hasMyLike(likesCardList);
  if (hasMyLike(likesCardList)) {
    cardLikeButton.classList.add('card__like-button_is-active');
  };
  cardLikeButton.addEventListener('click', () => likeCard(cardLikeButton, idCard));
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.addEventListener('click', () => viewCardImage(cardImage));
  return cardElement;
};  

const hasMyLike = (likesCardList) => {
  const idLikesCardList = (Array.from(likesCardList)).map(element => element._id);
  return (idLikesCardList.includes(myId));
};

const likeCard = (cardElement, idCard) => {
  cardElement.classList.toggle('card__like-button_is-active');
  if (Array.from(cardElement.classList).includes('card__like-button_is-active')) {
    sendLike(idCard)
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        return Promise.reject(`Произошла ошибка: ${res.status}`)
      }
    })
    .then(res => cardElement.closest('.card__like-wrapper').querySelector('.card__like-number').textContent = res.likes.length)
    .catch(err => {alert(`Запрос не может быть корректно обработан. Ошибка: ${err}`)})
  } else {
    recallLike(idCard)
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Произошла ошибка: ${res.status}`);
      }
    })
    .then(res => cardElement.closest('.card__like-wrapper').querySelector('.card__like-number').textContent = res.likes.length)
    .catch(err => {alert(`Запрос не может быть корректно обработан. Ошибка: ${err}`)})
  }
};

const deleteCard = (cardElement, idCard) => {
  const handleConfirmDeletionFormSubmit = (evt) => {
    evt.preventDefault();
    recallCard(idCard)
    .then (res => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Произошла ошибка: ${res.status}`);
      }
    })
    .then(res => {
      cardElement.remove();  
      console.log(`Карточка с id ${idCard} удалена`);
      closeModal(popupConfirmDeletion);
    })
    .catch(res => alert(`Запрос не может быть корректно обработан. Ошибка: ${res}`))
    .finally(() => {
      formConfirmDeletion.removeEventListener('submit', handleConfirmDeletionFormSubmit);
    });
  };
  openModal(popupConfirmDeletion);  
  formConfirmDeletion.addEventListener('submit', handleConfirmDeletionFormSubmit);
};