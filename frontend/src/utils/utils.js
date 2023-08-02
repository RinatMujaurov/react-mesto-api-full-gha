export const options = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

export const apiBaseUrl = "https://mesto.nomoreparties.co/v1/cohort-63";
export const apiToken = "cab53664-e4e9-4b11-babc-f697c128a306";

// переменные
export const selector = ".elements";
export const profileOpenButton = document.querySelector(
  ".profile__edit-button"
);
export const formElementProfile = document.forms["profile-info"];
export const popupOpenAddButtonElement = document.querySelector(
  ".profile__add-button"
);
export const popupOpenEditAvatar = document.querySelector(
  ".profile__avatar-block"
);
export const formElementCard = document.forms["element"];
export const popupImage = ".popup_type_image";
export const popupAddCardSelector = ".popup_type_element";
export const popupEditProfileSelector = ".popup_type_profile";
export const popupEditAvatarSelector = ".popup_type_avatar";
export const nameSelector = ".profile__name";
export const aboutSelector = ".profile__about";
export const avatarSelector = ".profile__avatar";
export const popupTypeDeleteCard = ".popup_type_delete-card";

export const popupDeleteButton = document.querySelector(
  ".popup__delete-button"
);
