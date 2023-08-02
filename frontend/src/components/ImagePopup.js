import React from "react";
import { usePopupClose } from "../hooks/usePopupClose";

function ImagePopup({ card, onClose }) {
  
  usePopupClose(card?.link, onClose)

  return (
    <div
      className={`popup popup_type_image overlay ${card ? "popup_opened" : ""}`}
    >
      <figure className="popup__figure">
        <button
          onClick={onClose}
          className="popup__close popup__close-button"
          aria-label="закрыть"
          type="button"
        ></button>
        <img
          src={card ? card.link : "#"}
          className="popup__image"
          alt={card ? card.name : ""}
        />
        <figcaption className="popup__title popup__title_type_image">
          {card ? card.name : ""}
        </figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
