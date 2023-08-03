import React from "react";
import PopupWithForm from "./PopupWithForm";
import useFormAndValidation from "../hooks/useFormAndValidation";

function AddPlacePopup(props) {
  const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation();

  function handleSubmit(e) {
    e.preventDefault();

    if (isValid) {
      props.onAddPlace({
        name: values.name,
        link: values.link,
      });
      resetForm();
    }
  }

  return (
    <PopupWithForm
      name="element"
      title="Новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText="Создать"
    >
      <input
        type="text"
        required
        className="popup__input popup__input_data_title"
        placeholder="Название"
        name="name"
        id="title-input"
        minLength="2"
        maxLength="30"
        onChange={handleChange}
        value={values.name || ""}
      />
      <span className="popup__input-error title-input-error">
        {errors.name}
      </span>
      <input
        type="url"
        required
        className="popup__input popup__input_data_photo"
        placeholder="Ссылка на картинку"
        name="link"
        id="url-input"
        onChange={handleChange}
        value={values.link || ""}
      />
      <span className="popup__input-error url-input-error">
        {errors.link}
      </span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;

