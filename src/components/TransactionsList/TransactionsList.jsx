import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as DeleteIcon } from '../../images/deleteIcon.svg';
import { selectAllTransactions } from 'redux/selectors';
import { deleteTransaction } from 'redux/transactions/operations';
import { categoryOrkToEng } from 'hooks/useCategory';
import {
  ItemName,
  ItemNameCont,
  ItemDate,
  ItemDateCont,
  ItemStyled,
  ItemCategory,
  Sum,
  SumCont,
  StyledList,
} from './TransactionsList.styled';

export const TransactionsList = () => {
  // Selectors
  const allTransactions = useSelector(selectAllTransactions);
  // Dispatch
  const dispatch = useDispatch();
  // Sorted transactions
  const sortedTransactions = allTransactions.slice().sort((a, b) => {
    const first = new Date(a.date).getTime();
    const second = new Date(b.date).getTime();
    if (first - second === 0) {
      return first;
    }
    return second - first;
  });
  // Handle delete
  const handleDelete = event => {
    dispatch(deleteTransaction(event.currentTarget.id));
  };

  return (
    // List
    <StyledList className="container">
      {sortedTransactions.slice(0, 15).map(item => {
        const { _id, description, amount, date, category } = item;
        // Check for category, assign color of operation
        let color;
        let minus = false;
        if (category === 'З/П' || category === 'Доп. доход') {
          color = 'green';
        } else {
          color = 'red';
          minus = '-';
        }

        return (
          // List item
          <ItemStyled key={_id}>
            <ItemNameCont>
              {/* Description */}
              <ItemName>{description}</ItemName>
              <ItemDateCont>
                {/* Date */}
                <ItemDate>{date.split('-').reverse().join('.')}</ItemDate>
                {/* Category */}
                <ItemCategory>{categoryOrkToEng(category)}</ItemCategory>
              </ItemDateCont>
            </ItemNameCont>
            <SumCont>
              {/* Value */}
              <Sum style={{ color }} className="sum">
                {minus} {amount}.00 UAH.
              </Sum>
              <span
                id={_id}
                onClick={handleDelete}
                style={{ cursor: 'pointer' }}
              >
                {/* Delete icon */}
                <DeleteIcon />
              </span>
            </SumCont>
          </ItemStyled>
        );
      })}
    </StyledList>
  );
};
