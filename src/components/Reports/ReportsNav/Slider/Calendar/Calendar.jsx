import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { monthNames } from '../SliderUtils';
import { ButtonsNextPrev } from '../ButtonsNextPrev/ButtonsNextPrev';
import { Month, Year, CalendarBox, Backdrop } from './Calendar.styled';

// Calendar
export const Calendar = ({
  onClose,
  currentMonth,
  currentYear,
  onChangeDate,
}) => {
  // Year handler
  const handleYear = name => {
    onChangeDate(name);
  };
  // Month handler
  const handleMonth = event => {
    const choosedMonth = event.currentTarget.textContent;
    const name = monthNames.indexOf(choosedMonth);
    onChangeDate(name);
  };
  // Add / remove event listeners
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });
  // On backdrop close
  const handleBackdrop = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  // On Esc close
  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      onClose();
    }
  };

  return (
    <Backdrop onClick={handleBackdrop}>
      <CalendarBox>
        <ButtonsNextPrev onButtonClick={handleYear}>
          {' '}
          <Year>{currentYear}</Year>
        </ButtonsNextPrev>

        <ul>
          {monthNames.map(el => {
            return (
              <Month
                className={el === currentMonth ? 'active' : ''}
                onClick={handleMonth}
                key={el}
              >
                {el}
              </Month>
            );
          })}
        </ul>
      </CalendarBox>
    </Backdrop>
  );
};

Calendar.propTypes = {
  onClose: PropTypes.func.isRequired,
  currentMonth: PropTypes.string.isRequired,
  currentYear: PropTypes.number.isRequired,
  onChangeDate: PropTypes.func.isRequired,
};
