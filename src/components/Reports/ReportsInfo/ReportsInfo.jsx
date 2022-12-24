import { ReportsList } from './List/ReportsList';
import { ReportsTable } from './Table/ReportsTable';
import {
  List,
  Item,
  ItemText,
  ItemExpenses,
  ItemIncome,
  Nav,
  NavButton,
  NavText,
  Box,
} from './ReportsInfo.styled';
import reports from '../../../images/reportsFiles/reports.svg';
import { useSelector } from 'react-redux';
import {
  selectExpensesTotal,
  selectIncomeTotal,
  selectReports,
} from 'redux/selectors';

export const ReportsInfo = () => {
  const { reports } = useSelector(selectReports);

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
        <Nav>
          <NavButton>
            <svg width="6" height="12">
              <use href={`${reports}#icon-prev`}></use>
            </svg>
          </NavButton>
          <NavText>${'Expenses'}</NavText>
          <NavButton>
            <svg width="6" height="12">
              <use href={`${reports}#icon-next`}></use>
            </svg>
          </NavButton>
        </Nav>

        <ReportsList></ReportsList>
      </Box>
      <ReportsTable></ReportsTable>
    </div>
  );
};
