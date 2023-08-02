import React from "react";
import { usePopupClose } from "../hooks/usePopupClose";

function PopupWithForm({name, title, isOpen, onClose, children, onSubmit, buttonText}) {
	
	usePopupClose(isOpen, onClose);

	return (      
		 <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}> 
			<div className='popup__container'>
			  <h2 className='popup__title'>{`${title}`}</h2>
			  <form
				 className='popup__form'
				 onSubmit={onSubmit}
				 name={`${name}`}
				 autoComplete='off'>
				 
				 <fieldset className='popup__fieldset'>
					{children}
					<button className='popup__save-button' aria-label='сохранить' type='submit'>
					  {buttonText}
					</button>
				 </fieldset>
			  </form>
			  <button
				 onClick={onClose}
				 className='popup__close-button opacity'
				 aria-label='закрыть'
				 type='button'></button>
			</div>
		 </div>
	);
 }

export default PopupWithForm;
