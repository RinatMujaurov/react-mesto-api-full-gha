import React from "react";
import PopupWithForm from "./PopupWithForm";

function PopupConfirm(props) {
  return (
    <PopupWithForm
      name="delete-card"
      title={props.title}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={props.onSubmit}
    >
    </PopupWithForm>
  );
}

export default PopupConfirm;
