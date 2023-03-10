import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getReports } from 'redux/reports/operations';
import { monthNames, getMonth, getYear } from './SliderUtils';
import { Calendar } from './Calendar/Calendar';
import { SliderBox, SliderText } from './Slider.styled';
import { ButtonsNextPrev } from './ButtonsNextPrev/ButtonsNextPrev';
import { reportsQueryAction } from 'redux/reportsQuery/reportsQuery.slice';
import { filteredDataAction } from 'redux/reportsQuery/reportsQuery.slice';

// Slider
export const Slider = () => {
  // State
  const [monthNumber, setMonthNumber] = useState(0);
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [modalCalendar, setModalCalendar] = useState(false);
  // Dispatch
  const dispatch = useDispatch();
  // Set date
  useEffect(() => {
    setMonthNumber(getMonth());
    setMonth(monthNames[getMonth()]);
    setYear(getYear());
  }, []);
  // Dispatch data by date
  useEffect(() => {
    setMonth(monthNames[monthNumber]);
    let monthString = '';

    if (monthNumber + 1 < 10) {
      monthString = '0' + (monthNumber + 1);
    } else {
      monthString = monthNumber + 1;
    }
    const query = `${year}-${monthString}`;
    if (query !== '-01') dispatch(getReports(query));
    dispatch(reportsQueryAction(`${year}-${monthString}`));
  }, [monthNumber, year, dispatch]);
  // Fetch data by date change
  const handlerClick = name => {
    switch (name) {
      case 'decrement':
        dispatch(filteredDataAction([]));
        setMonthNumber(monthNumber - 1);
        if (monthNumber === 0) {
          setMonthNumber(11);
          setYear(year - 1);
        }
        break;
      case 'increment':
        dispatch(filteredDataAction([]));
        setMonthNumber(monthNumber + 1);
        if (monthNumber === 11) {
          setMonthNumber(0);
          setYear(year + 1);
        }
        break;
      default:
        return;
    }
  };
  // Show / hide calendar
  const handleModalCalendar = () => {
    setModalCalendar(modalCalendar => !modalCalendar);
  };
  // Handle increment / decrement year
  const handleCalendar = name => {
    switch (name) {
      case 'decrement':
        setYear(year - 1);

        break;
      case 'increment':
        setYear(year + 1);
        break;
      default:
        setMonthNumber(name);
        return;
    }
  };

  return (
    <SliderBox>
      <p>Current period:</p>
      <ButtonsNextPrev onButtonClick={handlerClick}>
        <SliderText onClick={handleModalCalendar}>
          {month} {year}
        </SliderText>
      </ButtonsNextPrev>
      {modalCalendar && (
        <Calendar
          currentYear={year}
          currentMonth={month}
          onChangeDate={handleCalendar}
          onClose={handleModalCalendar}
        />
      )}
    </SliderBox>
  );
};
