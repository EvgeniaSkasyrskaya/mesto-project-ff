export { enableValidation, clearValdation }

const showInputError = (config, inputElement) => {
  inputElement.classList.add(config.inputErrorClass);
  const errorElement = inputElement.closest(config.formSelector).querySelector(`.${inputElement.id}-error`);
  errorElement.classList.add(config.errorClass);
  errorElement.textContent = inputElement.validationMessage;
};
  
const hideInputError = (config, inputElement) => {
  inputElement.classList.remove(config.inputErrorClass);
  const errorElement = inputElement.closest(config.formSelector).querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = '';
  errorElement.classList.remove(config.errorClass);
};
  
const isValid = (config, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
    inputElement.setCustomValidity('');
  };
  if (!inputElement.validity.valid) {
    showInputError(config, inputElement);
    } else {
    hideInputError(config, inputElement);
  };
};

const hasInvalidInput = (config, formElement) => {
  const formElementInputs = Array.from(formElement.querySelectorAll(config.inputSelector));
  return formElementInputs.some(input => !input.validity.valid);
};

const toggleButtonSubmit = (config, formElement) => {
  const buttonSubmit = formElement.querySelector(config.submitButtonSelector);
  if (hasInvalidInput(config, formElement)) {
    buttonSubmit.classList.add(config.inactiveButtonClass);
    buttonSubmit.disabled = true;
    } else {
    buttonSubmit.classList.remove(config.inactiveButtonClass);
    buttonSubmit.disabled = false;
  };
};

const clearValdation = (config, formElement) => {
  const formElementInputs = Array.from(formElement.querySelectorAll(config.inputSelector));                       
  const buttonSubmit = formElement.querySelector(config.submitButtonSelector);                        
  formElementInputs.forEach(inputElement => hideInputError(config, inputElement));
  buttonSubmit.classList.add(config.inactiveButtonClass);
  buttonSubmit.disabled = true;
};

const setEventListeners = (config, formElement) => {
  const formElementInputs = Array.from(formElement.querySelectorAll(config.inputSelector));                         
  formElementInputs.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      isValid(config, inputElement);
      toggleButtonSubmit(config, formElement);
    });
  });
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach(formElement => setEventListeners(config, formElement));
};
