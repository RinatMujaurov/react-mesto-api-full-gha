import React from "react";
import PopupWithForm from "./PopupWithForm";
import useFormAndValidation from "../hooks/useFormAndValidation";

function EditAvatarPopup(props) {
  
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  React.useEffect(() => {
    if (!props.isOpen) {
      resetForm();
    }
  }, [props.isOpen, resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isValid) {
      props.onUpdateAvatar({
        avatar: values.avatar,
      });
    }
  };

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
    >
      <label className="popup__fieldset">
        <input
          className="popup__input popup__input_data_link"
          type="url"
          id="link-avatar-input"
          name="avatar"
          placeholder="Ссылка на аватар"
          required
          onChange={handleChange}
          value={values.avatar || ""}
        />
        <span className="popup__input-error link-input-error">
          {errors.avatar}
        </span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
