import PropTypes from 'prop-types';
import { StyledOrangeButton } from './Buttons.styled';

// Shared button for modal windows
export const OrangeButton = ({
  children,
  dispatch,
  closeModal,
  changeBalance,
}) => {
  const handleClick = () => {
    // Check if user want to logout
    if (children === 'YES') {
      dispatch();
      closeModal();
    }
    // Check if user want to update balance
    if (changeBalance) {
      dispatch();
      closeModal();
    }
  };

  return (
    <StyledOrangeButton onClick={handleClick}>{children}</StyledOrangeButton>
  );
};

OrangeButton.propTypes = {
  children: PropTypes.string.isRequired,
  dispatch: PropTypes.func,
  closeModal: PropTypes.func,
  changeBalance: PropTypes.func,
};
