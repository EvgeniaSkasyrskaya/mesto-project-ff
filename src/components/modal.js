export { openModal, listenClick, closeModal }

const openModal = (popup) => {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', listenKeydown);
};
  
const listenClick = (evt, popup) => {
  evt.stopImmediatePropagation();
  const popupCloseButton = popup.querySelector('.popup__close');
  if (evt.target === popup || evt.target === popupCloseButton) {
    closeModal(popup);
  }; 
};
  
const listenKeydown = (evt) =>  {
  evt.stopImmediatePropagation();
  const popupOpened = document.querySelector('.popup_is-opened');
  if (evt.key === 'Escape') {
    closeModal(popupOpened);
  };
};
  
const closeModal = (popup) => {
  document.removeEventListener('keydown', listenKeydown);
  popup.classList.remove('popup_is-opened');
};  
  