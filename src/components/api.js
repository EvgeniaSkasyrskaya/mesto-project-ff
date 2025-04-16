export { getId, getCards, updateProfile, updateAvatar, checkLink, sendNewCard, recallCard, sendLike, recallLike }

const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-36',
    headers: {
      authorization: '82f69582-c9f1-452f-8fc6-80a1e6d1869e',
      'Content-Type': 'application/json'
    }
  };

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
      } else {
    return Promise.reject(`Произошла ошибка: ${res.status}`);
    }
};

const getId = () => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-36/users/me', {
    method: 'GET',
    headers: config.headers
  })
  .then(res => checkResponse(res));
};
   
const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers
  })
  .then(res => checkResponse(res));
};

const updateProfile = (inputProfileName, inputProfileJob) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: inputProfileName.value,
      about: inputProfileJob.value
    })
  })
  .then(res => checkResponse(res));
};

const updateAvatar = (inputAvatarLink) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: inputAvatarLink.value
    })
  })
  .then(res => checkResponse(res));
};
  
//Так как при проверке большинства ссылок на изображения ответ блокируется политикой CORS, 
// то данная функция была реализована таким образом, чтобы не блокировать обновление аватара пользователя 
// в случае невозможности подтверждения того, что это действительно ссылка на изображение
const checkLink = (inputAvatarLink) => {
  return fetch(`${inputAvatarLink.value}`, {
    method: 'HEAD',
  })
  .then(res => {
    if (res.ok) { 
      return res.headers.get('Content-Type'); 
    } else { 
      return Promise.reject(`Ссылка на изображение не подтверждена. Oшибка: ${res.status}`); 
    } 
  }) 
// Здесь изначально и предполагалось, что неподтверждение ссылки не должно препятствовать обновлению аватара,
// так как большая часть ссылок не проходит проверку из-за того, что запрос блокируется политикой CORS 
// (см. комментарий выше). Теперь при блокировании запроса срабатывает catch в index.js, и пользователю 
// возможно не будет понятно в чем именно заключается ошибка
//.catch(err => console.log(`Ссылка на изображение не подтверждена. Ошибка: ${err}`))
};
     
const sendNewCard = (inputNewCardPlace, inputNewCardLink) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: inputNewCardPlace.value,
      link: inputNewCardLink.value
    })
  })
  .then(res => checkResponse(res));
};
  
const recallCard = (idCard) => {
  return fetch(`${config.baseUrl}/cards/${idCard}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(res => checkResponse(res));
};

const sendLike = (idCard) => {
  return fetch(`${config.baseUrl}/cards/likes/${idCard}`, {
    method: 'PUT',
    headers: config.headers,
  })
  .then(res => checkResponse(res));
};

const recallLike =(idCard) => {
  return fetch(`${config.baseUrl}/cards/likes/${idCard}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(res => checkResponse(res));
};