import './pages/index.css';
// import { initialCards } from './components/cards';
import { createCard, deleteCard, likeCard } from './components/card';
import { openModal, listenClick, closeModal } from './components/modal';
import { enableValidation, clearValdation } from './components/validation';
import { getId, getCards, updateProfile, updateAvatar, checkLink, sendNewCard } from './components/api';
export { myId, popupConfirmDeletion, formConfirmDeletion };

//объявление переменных для поиска DOM-элементов
const placesList = document.querySelector('.places__list');

const popupViewImage = document.querySelector('.popup_type_image');
const popupImage = popupViewImage.querySelector('.popup__image');  
const popupImageCaption = popupViewImage.querySelector('.popup__caption');

const buttonEditInfo = document.querySelector('.profile__edit-button_info');
const popupEditInfo = document.querySelector('.popup_type_edit');
const formEditProfile = popupEditInfo.querySelector('.popup__form');
const inputProfileName = formEditProfile.querySelector('.popup__input_type_name');
const inputProfileJob = formEditProfile.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

const buttonAddCard = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const formNewCard = popupNewCard.querySelector('.popup__form');
const inputNewCardPlace = formNewCard.querySelector('.popup__input_type_card-name');
const inputNewCardLink = formNewCard.querySelector('.popup__input_type_url');

const buttonEditAvatar = document.querySelector('.profile__edit-button_avatar');
const popupEditAvatar = document.querySelector('.popup_type_edit-avatar');
const formEditAvatar = popupEditAvatar.querySelector('.popup__form');
const inputAvatarLink = formEditAvatar.querySelector('.popup__input_type_url');

const popupConfirmDeletion = document.querySelector('.popup_type_confirm-deletion-card');
const formConfirmDeletion = popupConfirmDeletion.querySelector('.popup__form');

const configValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

let myId = '';

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

const handleEditFormSubmit = (newName, newJob) => {
  profileName.textContent = newName;
  profileJob.textContent = newJob;
};
  
const handleNewCardFormSubmit = (idOwner, newPlaceName, newPlaceImage, likesCardList, idCard) => {
  placesList.prepend(createCard(idOwner, newPlaceImage, newPlaceName, likesCardList, idCard, deleteCard, likeCard, viewCardImage));
};

const handleEditAvatarFormSubmit = (newAvatar) => {
  profileImage.style.backgroundImage = `url('${newAvatar}')`;
};

const renderLoading = (isLoading) => {
  const popupOpened = document.querySelector('.popup_is-opened');
  const buttonSubmitPopupOpened = popupOpened.querySelector('.popup__button');
  if (isLoading === true) {
  buttonSubmitPopupOpened.textContent = 'Сохранение...';
  } else {
  buttonSubmitPopupOpened.textContent = 'Сохранить';
  }
};

//вызов функций и методов, добавление обработчиков
Promise.all([getId, getCards])
.then((responses) => {
  if (responses[0].status === 200 && responses[1].status === 200) {
    responses[0].json()
    .then(resultGetId => {
      profileName.textContent = resultGetId.name;
      profileJob.textContent = resultGetId.about;
      profileImage.style.backgroundImage = `url('${resultGetId.avatar}')`;
      myId = resultGetId._id;
    })
    responses[1].json()
    .then(resultGetCards => {
      resultGetCards.forEach(element => {placesList.append(createCard(element.owner._id, element.link, element.name, element.likes, element._id, deleteCard, likeCard, viewCardImage))});
    })
  } else {
    return Promise.reject(`Произошла ошибка: ${res.status}`)
  }
})
.catch(err => {alert(`Запрос не может быть корректно обработан. Ошибка: ${err}`)});  
    
popupViewImage.addEventListener('click', (evt) => listenClick(evt, popupViewImage));

buttonEditInfo.addEventListener('click', () => {
  openModal(popupEditInfo);
  fillFieldsFormEditProfile();
  clearValdation(configValidation, popupEditInfo);
});
popupEditInfo.addEventListener('click', (evt) => listenClick(evt, popupEditInfo));
formEditProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();
  renderLoading(true);
  updateProfile(inputProfileName, inputProfileJob)
  .then(res => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Произошла ошибка: ${res.status}`);
    }
  })
  .then(res => handleEditFormSubmit(res.name, res.about))
  .catch(err => alert(`Запрос не может быть корректно обработан. Ошибка: ${err}`))
  .finally(() => {
    renderLoading(false);
    closeModal(popupEditInfo);
  });
});

buttonAddCard.addEventListener('click', () => {
  formNewCard.reset();
  openModal(popupNewCard);
  clearValdation(configValidation, popupNewCard);
});
popupNewCard.addEventListener('click', (evt) => listenClick(evt, popupNewCard));
formNewCard.addEventListener('submit', (evt) => {
  evt.preventDefault();
  renderLoading(true);
  sendNewCard(inputNewCardPlace, inputNewCardLink)
  .then(res => {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(`Произошла ошибка: ${res.status}`)
    }
  })
  .then(res => handleNewCardFormSubmit(res.owner._id, res.name, res.link, res.likes, res._id))
  .catch(err => {alert(`Запрос не может быть корректно обработан. Ошибка: ${err}`)})
  .finally(() => {
    renderLoading(false);
    closeModal(popupNewCard);
    // formNewCard.reset();
  });
});

popupConfirmDeletion.addEventListener('click', (evt) => listenClick(evt, popupConfirmDeletion));

buttonEditAvatar.addEventListener('click', () => {
  openModal(popupEditAvatar);
  formEditAvatar.reset();
  clearValdation(configValidation, popupEditAvatar);
});
popupEditAvatar.addEventListener('click', (evt) => listenClick(evt, popupEditAvatar));
formEditAvatar.addEventListener('submit', (evt) => {
  evt.preventDefault();
  renderLoading(true);
  checkLink(inputAvatarLink);
  updateAvatar(inputAvatarLink)
  .then(res => {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(`Произошла ошибка: ${res.status}`)
    }
  })
  .then(res => handleEditAvatarFormSubmit(res.avatar))
  .catch(err => {alert(`Запрос не может быть корректно обработан. Ошибка: ${err}`)})
  .finally(() => {
    renderLoading(false);
    closeModal(popupEditAvatar);
    // formEditAvatar.reset();
  });
});

enableValidation(configValidation);