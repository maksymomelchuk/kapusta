import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from 'redux/auth/operations';
import logoutImg from '../../images/logout.svg';
import { selectIsLoggedIn, selectUser } from 'redux/selectors';
import {
  StyledAuthNav,
  StyledLoginLabel,
  StyledLoginName,
  StyledLogoutImg,
  StyledVerticalLine,
  StyledExitButton,
} from './AuthNav.styled';
import { LightModalWindow } from 'components/LightModalWindow/LightModalWindow';

// Authorization bar
export const AuthNav = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userEmail = useSelector(selectUser);
  const dispatch = useDispatch();

  // Logout
  const handleClick = () => {
    dispatch(logOut());
  };
  // Open modal window
  const handleModalOpen = () => {
    setModalOpen(true);
  };
  // Close modal window
  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    isLoggedIn && (
      <>
        <StyledAuthNav>
          {/* Round label with first letter of users email */}
          <StyledLoginLabel>{userEmail[0].toUpperCase()}</StyledLoginLabel>
          {/* Users email */}
          <StyledLoginName>{userEmail}</StyledLoginName>
          {/* Logout image. For mobile version only */}
          <StyledLogoutImg
            src={logoutImg}
            alt="logout"
            onClick={handleModalOpen}
          />
          {/* Span with vertical line decoration */}
          <StyledVerticalLine></StyledVerticalLine>
          {/* Logout button for tablet and desktop version */}
          <StyledExitButton type="button" onClick={handleModalOpen}>
            Exit
          </StyledExitButton>
        </StyledAuthNav>
        {/* Modal window */}
        {modalOpen && (
          <LightModalWindow
            closeModal={handleModalClose}
            dispatch={handleClick}
          >
            Do you really want to leave?
          </LightModalWindow>
        )}
      </>
    )
  );
};
