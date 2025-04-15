export { getId, getCards, updateProfile, updateAvatar, checkLink, sendNewCard, recallCard, sendLike, recallLike }
import { closeModal } from "./modal";

const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-36',
    headers: {
      authorization: '82f69582-c9f1-452f-8fc6-80a1e6d1869e',
      'Content-Type': 'application/json'
    }
  };
  
const getId = fetch('https://nomoreparties.co/v1/wff-cohort-36/users/me', {
  method: 'GET',
  headers: config.headers
});
   
const getCards = fetch(`${config.baseUrl}/cards`, {
  method: 'GET',
  headers: config.headers
});

const updateProfile = (inputProfileName, inputProfileJob) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: inputProfileName.value,
      about: inputProfileJob.value
    })
  })  
};

const updateAvatar = (inputAvatarLink) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: inputAvatarLink.value
    })
  })
};
  
//Так как при проверке большинства ссылок на изображения ответ блокируется политикой CORS, 
// то данная функция была реализована таким образом, чтобы не блокировать обновление аватара пользователя 
// в случае невозможности подтверждения того, что это действительно ссылка на изображение
const checkLink = (inputAvatarLink) => {
  fetch(`${inputAvatarLink.value}`, {
    method: 'HEAD',
  })
  .then(res => {
    if (res.ok) {
      return res.headers.get('Content-Type');
    } else {
      return Promise.reject(`Ссылка на изображение не подтверждена. Oшибка: ${res.status}`);
    }
  })
  .then (res => {
    const regex = /image\//;
    if (res.match(regex)) {
      console.log('Ссылка на изображение подтверждена')
    } else {
      console.log('Ссылка не является ссылкой на изображение')
    }
  })
  .catch(err => console.log(`Ссылка на изображение не подтверждена. Ошибка: ${err}`))
};
     
const sendNewCard = (inputNewCardPlace, inputNewCardLink) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: inputNewCardPlace.value,
      link: inputNewCardLink.value
    })
  });
};
  
const recallCard = (idCard) => {
  return fetch(`${config.baseUrl}/cards/${idCard}`, {
    method: 'DELETE',
    headers: config.headers
  })
};

const sendLike = (idCard) => {
  return fetch(`${config.baseUrl}/cards/likes/${idCard}`, {
    method: 'PUT',
    headers: config.headers,
  })
};

const recallLike =(idCard) => {
  return fetch(`${config.baseUrl}/cards/likes/${idCard}`, {
    method: 'DELETE',
    headers: config.headers,
  })
}