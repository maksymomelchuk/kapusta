import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  StyledModalWindow,
  StyledBackdrop,
  StyledModalText,
  StyledModalTitle,
} from './ModalWindow.styled';

const modalRoot = document.querySelector('#modal-root');
const body = document.querySelector('body');

// Blue modal window, appear when 0 ballance
export default function ModalWindow() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  // Handle close
  const handleModalClose = () => {
    setIsModalOpen(false);
    body.classList.remove('no-scroll');
  };
  // Close on backdrop click
  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      handleModalClose();
    }
  };
  // Add / Remove no-scroll class on body
  useEffect(() => {
    body.classList.add('no-scroll');
    return () => body.classList.remove('no-scroll');
  }, []);

  return createPortal(
    isModalOpen && (
      <StyledBackdrop onClick={handleBackdropClick}>
        <StyledModalWindow>
          <StyledModalTitle>
            Hello! To get started, enter the current balance of your account!
          </StyledModalTitle>
          <StyledModalText>
            You can't spend money until you have it
          </StyledModalText>
        </StyledModalWindow>
      </StyledBackdrop>
    ),
    modalRoot
  );
}
