import React from "react";
import Card from "./Card";
import addCardButton from "../images/Vector.svg";
import editAvatar from "../images/profile-avatar-edit.svg";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) {
  const currentUser = React.useContext(CurrentUserContext);


  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-block" onClick={onEditAvatar}>
          <img
            className="profile__avatar-edit"
            src={editAvatar}
            alt="edit avatar"
          />
          <img src={currentUser.avatar} alt="аватар пользователя" className="profile__avatar" />
        </div>
        <div className="profile__info">
          <div className="profile__block">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="profile__edit-button"
              type="button"
              onClick={onEditProfile}
            ></button>
          </div>
          <p className="profile__about">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={onAddPlace}
        >
          <img
            src={addCardButton}
            alt="кнопка добавления изображений"
            className="profile__button-img"
          />
        </button>
      </section>
      <ul className="elements">
        {cards.map((card) => {
          return (
            <Card
            onCardClick={onCardClick}
            link={card.link}
            name={card.name}
            likes={[...card.likes]}
            card={card}
            key={card._id}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
            />
          );
        })}
      </ul>
    </main>
  );
}

export default Main;
