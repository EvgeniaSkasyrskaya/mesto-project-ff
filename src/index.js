import './pages/index.css';
import { initialCards } from './components/cards';
import { createCard, deleteCard, likeCard } from './components/card';
import { openModal, listenClick, closeModal } from './components/modal';

//объявление переменных для поиска DOM-элементов
const placesList = document.querySelector('.places__list');

const popupViewImage = document.querySelector('.popup_type_image');
const popupImage = popupViewImage.querySelector('.popup__image');  
const popupImageCaption = popupViewImage.querySelector('.popup__caption');

const buttonEdit = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const formEditProfile = popupEdit.querySelector('.popup__form');
const inputProfileName = formEditProfile.querySelector('.popup__input_type_name');
const inputProfileJob = formEditProfile.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

const buttonAddCard = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const formNewCard = popupNewCard.querySelector('.popup__form');
const inputNewCardPlace = formNewCard.querySelector('.popup__input_type_card-name');
const inputNewCardLink = formNewCard.querySelector('.popup__input_type_url');

//объявление функций
const viewCardImage = (cardImage) => {
  popupImage.src = cardImage.src;
  popupImage.alt = "пейзаж";
  popupImageCaption.textContent = cardImage.closest('.card').querySelector('.card__title').textContent;
  openModal(popupViewImage);
};

const fillFieldsFormEditProfile  = () => {
  inputProfileName.value = profileName.textContent;
  inputProfileJob.value = profileJob.textContent;
};

const handleEditFormSubmit = (evt) => {
  evt.preventDefault(); 
  profileName.textContent = inputProfileName.value;;
  profileJob.textContent = inputProfileJob.value;
  closeModal(popupEdit);
};
  
const handleNewCardFormSubmit = (evt) => {
  evt.preventDefault();
  const placeName = inputNewCardPlace.value;
  const placeImage = inputNewCardLink.value;
  placesList.prepend(createCard(placeImage, placeName, deleteCard, likeCard, viewCardImage));
  closeModal(popupNewCard);
  formNewCard.reset();
};

buttonAddCard.addEventListener('click', () => {
  openModal(popupNewCard);
  formNewCard.reset();
});
popupNewCard.addEventListener('click', (evt) => listenClick(evt, popupNewCard));
formNewCard.addEventListener('submit', handleNewCardFormSubmit);

//вызов функций и методов, добавление обработчиков
initialCards.forEach(element => {placesList.append(createCard(element.link, element.name, deleteCard, likeCard, viewCardImage))});

popupViewImage.addEventListener('click', (evt) => listenClick(evt, popupViewImage));

buttonEdit.addEventListener('click', () => {
  openModal(popupEdit);
  fillFieldsFormEditProfile();
});
popupEdit.addEventListener('click', (evt) => listenClick(evt, popupEdit));
formEditProfile.addEventListener('submit', handleEditFormSubmit);

buttonAddCard.addEventListener('click', () => {
  openModal(popupNewCard);
  formNewCard.reset();
});
popupNewCard.addEventListener('click', (evt) => listenClick(evt, popupNewCard));
formNewCard.addEventListener('submit', handleNewCardFormSubmit);