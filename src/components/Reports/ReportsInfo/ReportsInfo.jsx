import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectReports } from 'redux/selectors';
import { ReportsList } from './List/ReportsList';
import { ReportsTable } from './Table/ReportsTable';
import { filteredDataAction } from 'redux/reportsQuery/reportsQuery.slice';
import {
  List,
  Item,
  ItemText,
  ItemExpenses,
  ItemIncome,
  Nav,
  NavText,
  Box,
} from './ReportsInfo.styled';
import { ButtonsNextPrev } from '../ReportsNav/Slider/ButtonsNextPrev/ButtonsNextPrev';

// Reports Info
export const ReportsInfo = () => {
  // State
  const [budget, setBudget] = useState('expenses');
  // Selectors
  const { reports } = useSelector(selectReports);
  // Dispatch
  const dispatch = useDispatch();
  // Handle click
  const handleClick = () => {
    if (budget === 'expenses') {
      setBudget('income');
      dispatch(filteredDataAction([]));
      return;
    }
    setBudget('expenses');
    dispatch(filteredDataAction([]));
  };
  return (
    <div>
      <List>
        <Item>
          <ItemText>Expenses:</ItemText>
          <ItemExpenses>{reports?.expenses?.expenseTotal ?? 0}.00</ItemExpenses>
        </Item>
        <Item>
          <ItemText>Income:</ItemText>
          <ItemIncome>{reports?.incomes?.incomeTotal ?? 0}.00</ItemIncome>
        </Item>
      </List>

      <Box>
        <Nav className="Privet">
          <ButtonsNextPrev onButtonClick={handleClick}>
            <NavText>{budget}</NavText>
          </ButtonsNextPrev>
        </Nav>

        <ReportsList onChange={budget}></ReportsList>
      </Box>
      <ReportsTable onChange={budget}></ReportsTable>
    </div>
  );
};
