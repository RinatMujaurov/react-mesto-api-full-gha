import React from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";
import useFormAndValidation from "../hooks/useFormAndValidation";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation();

  React.useEffect(() => {
    if (currentUser) {
      setValues({
        name: currentUser.name,
        about: currentUser.about,
      });
    }
  }, [currentUser, setValues]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isValid) {
      onUpdateUser({
        name: values.name,
        about: values.about,
      });
    }
  };

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
    >
      <fieldset className="popup__fieldset">
        <input
          id="input-name"
          type="text"
          className="popup__input popup__input_data_name"
          name="name"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          required
          onChange={handleChange}
          value={values.name || ""}
        />
        <span className="popup__input-error name-input-error">
          {errors.name}
        </span>
      </fieldset>
      <fieldset className="popup__fieldset">
        <input
          id="input-job"
          type="text"
          className="popup__input popup__input_data_about"
          name="about"
          placeholder="О себе"
          minLength="2"
          maxLength="200"
          required
          onChange={handleChange}
          value={values.about || ""}
        />
        <span className="popup__input-error about-input-error">
          {errors.about}
        </span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
