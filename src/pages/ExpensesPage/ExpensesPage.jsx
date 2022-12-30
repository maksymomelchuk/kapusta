import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'components/DropDownList/Form/Form';
import { Summary } from 'components/Summary/Summary';
import { TransactionListDesk } from 'components/TransactionListDesk/TransactionListDesk';
import {
  selectBalance,
  selectExpenseTransactions,
  selectIsLoggedIn,
} from 'redux/selectors';
import { getExpenses } from 'redux/transactions/operations';
import {
  StyledBg,
  StyledFrame,
  StyledTableAndSummaryDiv,
} from './ExpensePage.styled';
import { useMatchMedia } from '../../hooks/use-match-media';
import { BackButton } from 'components/Buttons/BackButton';

// Expenses page
export default function ExpensesPage() {
  // Dispatch
  const dispatch = useDispatch();
  // Hook
  const { isMobile, isTablet, isDesktop } = useMatchMedia();
  // Selectors
  const allExpenses = useSelector(selectExpenseTransactions);
  const user = useSelector(selectIsLoggedIn);
  const balance = useSelector(selectBalance);
  const color = 'red';
  // Get expenses data
  useEffect(() => {
    if (user) {
      dispatch(getExpenses());
    }
  }, [dispatch, user, balance]);

  return (
    <>
      {isMobile && (
        <>
          <StyledBg />
          <BackButton />
        </>
      )}
      <StyledFrame>
        <Form />
        <StyledTableAndSummaryDiv>
          <TransactionListDesk>
            {allExpenses}
            {color}
          </TransactionListDesk>
          {isDesktop && <Summary />}
        </StyledTableAndSummaryDiv>
      </StyledFrame>
      {isTablet && <Summary />}
    </>
  );
}
