import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import {
  StyledModalWindow,
  StyledContentDiv,
  StyledText,
  StyledDivWithButtons,
  StyledCloseButton,
  StyledModalBackdrop,
} from './LightModalWindow.styled';
import { OrangeButton } from 'components/Buttons/OrangeButton';
import { WhiteButton } from 'components/Buttons/WhiteButton';
import close from '../../images/close.svg';

// Query selectors
const modalRoot = document.getElementById('modal-root');
const body = document.querySelector('body');

// Modal window
export const LightModalWindow = ({
  children,
  closeModal,
  dispatch,
  changeBalance,
  text,
}) => {
  // Close on Esc button
  const handleEscapeClose = event => {
    if (event.code === 'Escape') {
      closeModal();
    }
  };
  // Close on backdrop click
  const handleBackdropClose = event => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };
  // No scroll of body when modal window is open
  useEffect(() => {
    window.addEventListener('keydown', handleEscapeClose);

    return () => {
      window.removeEventListener('keydown', handleEscapeClose);
      body.classList.toggle('no-scroll');
    };
  });

  return createPortal(
    // Backdrop
    <StyledModalBackdrop
      className="modal-backdrop"
      onClick={handleBackdropClose}
    >
      {/* Modal window */}
      <StyledModalWindow>
        {/* Close button img X */}
        <StyledCloseButton onClick={closeModal}>
          <img src={close} alt="close" />
        </StyledCloseButton>
        <StyledContentDiv>
          <StyledText>{children}</StyledText>
          <StyledDivWithButtons>
            <OrangeButton
              dispatch={dispatch}
              closeModal={closeModal}
              changeBalance={changeBalance}
            >
              {text ? text : 'YES'}
            </OrangeButton>
            <WhiteButton closeModal={closeModal}>NO</WhiteButton>
          </StyledDivWithButtons>
        </StyledContentDiv>
      </StyledModalWindow>
    </StyledModalBackdrop>,
    modalRoot
  );
};

LightModalWindow.propTypes = {
  children: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  changeBalance: PropTypes.func,
  text: PropTypes.string,
};
