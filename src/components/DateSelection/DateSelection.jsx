import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { StyledDatePicker } from './Styles';
import { ReactComponent as Calendar } from './calendar.svg';

// React Datepicker
const DateSelection = ({ startDate, setStartDate }) => {
  const handleClick = event => {
    event.preventDefault();
  };

  const ExampleCustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <button
      className="example-custom-input datePicker"
      onClick={onClick}
      ref={ref}
    >
      <Calendar className="calendarIcon" />
      {value}
    </button>
  ));
  return (
    <StyledDatePicker onClick={handleClick}>
      <DatePicker
        dateFormat="dd.MM.yyyy"
        selected={startDate}
        onChange={date => setStartDate(date)}
        customInput={<ExampleCustomInput />}
      />
    </StyledDatePicker>
  );
};

export default DateSelection;

DateSelection.propTypes = {
  startDate: PropTypes.instanceOf(Date),
  setStartDate: PropTypes.func.isRequired,
};
