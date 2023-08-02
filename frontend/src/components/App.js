import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Login from "./Login";
import Register from "./Register";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ImagePopup from "./ImagePopup";
import PopupConfirm from "./PopupConfirm";
import InfoTooltip from "./InfoTooltip";
import api from "../utils/Api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import ProtectedRoute from "./ProtectedRoute";
import * as Auth from "../utils/Auth";
import ok from "../images/InfoTooltip-ok.svg";
import error from "../images/InfoTooltip-error.svg";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const [isOpenTooltip, setIsOpenTooltip] = React.useState(false);
  const [titleTooltip, setTitleTooltip] = React.useState("");
  const [iconTooltip, setIconTooltip] = React.useState("");

  const [email, setEmail] = React.useState(null);

  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isLoggedIn) return;
    api
      .getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => console.log(err));

    api
      .getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => console.log(err));
  }, [isLoggedIn]);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleInfoTooltip = () => {
    setIsOpenTooltip(true);
  };

  const handleCardLike = (card) => {
    // Проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((id) => id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((error) => {
        console.log("Ошибка при обновлении статуса лайка:", error);
      });
  };

  const handleCardDelete = (card) => {
    // Отправляем запрос в API для удаления карточки
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id));
      })
      .catch((error) => {
        console.log("Ошибка при удалении карточки:", error);
      });
  };

  function handleUpdateUser(data) {
    api
      .setUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(data) {
    api
      .setAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(data) {
    api
      .addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setIsOpenTooltip(false);
  }


  const handleLogin = async (email, password) => {
    try {
      const res = await Auth.login(email, password);
      localStorage.setItem("jwt", res.token);
      setIsLoggedIn(true);
      setEmail(email);
      navigate("/");
    } catch (err) {
      console.log(err);
      handleInfoTooltip();
      setTitleTooltip("Что-то пошло не так! Попробуйте еще раз.");
      setIconTooltip(error);
    }
  };

  const handleRegister = async (email, password) => {
    try {
      await Auth.register(email, password);
      setTitleTooltip("Вы успешно зарегистрировались!");
      setIconTooltip(ok);
      navigate("/sign-in");
    } catch (err) {
      console.log(err);
      setTitleTooltip("Что-то пошло не так! Попробуйте еще раз.");
      setIconTooltip(error);
    } finally {
      handleInfoTooltip();
    }
  };

  React.useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  React.useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("jwt");
      if (token) {
        try {
          const res = await Auth.checkToken(token);
          if (res) {
            setIsLoggedIn(true);
            setEmail(res.email);
          }
        } catch (err) {
          console.log(err);
        }
      }
    };

    checkToken();
  }, [isLoggedIn]);

  const onSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
          <Header isLoggedIn={isLoggedIn} email={email} onSignOut={onSignOut} />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute
                  element={Main}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  cards={cards}
                  isLoggedIn={isLoggedIn}
                />
              }
            />
            <Route
              path="signup"
              element={
                <Register onSubmit={handleRegister} isLoggedIn={isLoggedIn} />
              }
            />
            <Route
              path="signin"
              element={<Login onSubmit={handleLogin} isLoggedIn={isLoggedIn} />}
            />
            <Route
              path="*"
              element={
                isLoggedIn ? <Navigate to="/" /> : <Navigate to="/signin" />
              }
            />
          </Routes>
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <PopupConfirm />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <InfoTooltip
            isOpen={isOpenTooltip}
            title={titleTooltip}
            image={iconTooltip}
            onClose={closeAllPopups}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
