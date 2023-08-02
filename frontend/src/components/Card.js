import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

  function Card({ card, link, name, likes, onCardClick, onCardLike, onCardDelete }) {
 
  const currentUser = React.useContext(CurrentUserContext);


  function handleClick() {
    onCardClick({link, name});
  }  

  const handleLikeClick = () => {
    onCardLike(card);
  };

  const handleDeleteClick = () => {
    onCardDelete(card);
  };

  const isOwn = card.owner === currentUser._id;
  const isLiked = likes.some(id => id === currentUser._id);
  const cardLikeButtonClassName = `element__like ${
    isLiked ? "element__like_active" : ""
  }`;

  return (
    <li className="element">
      <img
        className="element__image"
        src={link}
        alt={name}
        onClick={handleClick}
      />
      {isOwn && 
        <button className="element__delete-button" type="button" onClick={handleDeleteClick}></button>
      }
      <div className="element__block">
        <h2 className="element__title">{name}</h2>
        <div className="element__like-block">
          <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
          <p className="element__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
