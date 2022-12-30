import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { selectIsLoading } from 'redux/selectors';
import { categoryOrkToEng } from 'hooks/useCategory';
import { deleteTransaction } from 'redux/transactions/operations';
import { TransactionTable } from './TransactionListDesk.styled';
import { ReactComponent as DeleteIcon } from '../../images/deleteIcon.svg';

export const TransactionListDesk = ({ children }) => {
  // Dispatch
  const dispatch = useDispatch();
  // Selectors
  const isLoading = useSelector(selectIsLoading);
  // Green if income and red if expenses
  const color = children[1];
  let minus = '-';

  if (color === 'green') {
    minus = false;
  }
  // Handle delete transaction
  const handleDelete = event => {
    dispatch(deleteTransaction(event.currentTarget.id));
  };
  // Sorted transactions
  const sortedTransactions = children[0].slice().sort((a, b) => {
    const first = new Date(a.date).getTime();
    const second = new Date(b.date).getTime();
    if (first - second === 0) {
      return first;
    }
    return second - first;
  });

  return (
    !isLoading && (
      <TransactionTable className="container">
        <thead>
          <tr>
            <th>DATE</th>
            <th>DESCRIPTION</th>
            <th>CATEGORY</th>
            <th>SUM</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {sortedTransactions.slice(0, 20).map(el => {
            const { _id, description, amount, date, category } = el;
            return (
              <tr key={_id} style={{ height: 40 }}>
                <td>{date.split('-').reverse().join('.')}</td>
                <td>{description}</td>
                <td>{categoryOrkToEng(category)}</td>
                <td style={{ color }}>
                  {minus} {amount}.00 UAH
                </td>
                <td>
                  <span
                    id={_id}
                    onClick={handleDelete}
                    style={{ cursor: 'pointer' }}
                  >
                    <DeleteIcon />
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </TransactionTable>
    )
  );
};

TransactionListDesk.propTypes = {
  children: PropTypes.array.isRequired,
};
