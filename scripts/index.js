const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

const createCard = (imageCard, nameCard, deleteCard) => {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  cardElement.querySelector('.card__image').src = imageCard;
  cardElement.querySelector('.card__image').alt = 'пейзаж';
  cardElement.querySelector('.card__title').textContent = nameCard;
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  cardDeleteButton.addEventListener('click', () => deleteCard(cardElement));  
  return cardElement;
};  

const deleteCard = function(cardElement) {
    cardElement.remove();
};
 
initialCards.forEach(element => {placesList.append(createCard(element.link, element.name, deleteCard))});