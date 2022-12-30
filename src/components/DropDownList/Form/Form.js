import { useRef, useState } from 'react';
import { useLocation } from 'react-router';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useMatchMedia } from '../../../hooks/use-match-media';
import DateSelection from '../../DateSelection/DateSelection';
import SelectCategory from '../SelectCategory/SelectCategory';
import CalculatorInput from '../CalculatorInput/CalculatorInput';
import { OrangeButton } from 'components/Buttons/OrangeButton';
import {
  FormWrap,
  StyledForm,
  ButtonWrap,
  InputProduct,
  StyledAllInputsDiv,
  StyledWhiteButton,
} from './Form.styled';
import { addExpense, addIncome } from 'redux/transactions/operations';
import { categoryEngToOrk } from 'hooks/useCategory';

// Form to add incomes or expenses
export default function Form() {
  // State
  const [elementCategory, setElementCategory] = useState('Category');
  const [startDate, setStartDate] = useState(new Date());
  // Location
  const location = useLocation();
  // Refs
  const form = useRef(null);
  // Dispatch
  const dispatch = useDispatch();
  // Check for device
  const { isMobile } = useMatchMedia();

  let categoryArray;
  let functionToDispatch;
  // Check location for submit incomes or expenses
  if (location.pathname === '/home/income' || location.pathname === '/income') {
    categoryArray = ['Salary', 'Additional income'];
    functionToDispatch = addIncome;
  }
  if (
    location.pathname === '/home/expenses' ||
    location.pathname === '/expenses'
  ) {
    categoryArray = [
      'Products',
      'ЗСУ',
      'Entertainment',
      'Health',
      'Transport',
      'Housing',
      'Technics',
      'Communal and communication',
      'Sport and hobby',
      'Education',
      'Other',
    ];
    functionToDispatch = addExpense;
  }
  // Handle Submit
  const handleSubmit = event => {
    event.preventDefault();
    const { descr, sum } = event.target.elements;
    let transValue = sum.value;
    // Checks for empty values
    if (descr.value.trim() === '') {
      toast('Please enter a description');
      return;
    }
    if (elementCategory === 'Category') {
      toast('Please enter a category');
      return;
    }
    if (transValue.trim() === '') {
      toast('Please enter an amount');
      return;
    }
    if (transValue < 0) transValue = transValue * -1;

    // Prepare data for dispatch
    const dataToDispatch = {
      description: descr.value,
      amount: Number(transValue),
      date: startDate.toISOString().split('T')[0],
      category: categoryEngToOrk(elementCategory),
    };
    // dispatch
    dispatch(functionToDispatch(dataToDispatch));
    event.target.reset();
    setElementCategory('Category');
  };
  // Reset Form
  const handleReset = () => {
    form.current.reset();
  };

  return (
    <>
      <FormWrap>
        {!isMobile && (
          <div className="tabletDatepicker">
            <DateSelection startDate={startDate} setStartDate={setStartDate} />
          </div>
        )}
        {/* Form */}
        <StyledForm onSubmit={handleSubmit} ref={form}>
          {/* Div with inputs */}
          <StyledAllInputsDiv>
            {/* Product input */}
            <InputProduct placeholder="Product description" name="descr" />
            {/* Category input */}
            <SelectCategory
              categoryArray={categoryArray}
              elementCategory={elementCategory}
              setElementCategory={setElementCategory}
            />
            {/* Value input */}
            <CalculatorInput name="sum" />
          </StyledAllInputsDiv>
          {/* Div with buttons */}
          <ButtonWrap>
            <OrangeButton type="submit">INPUT</OrangeButton>
            <StyledWhiteButton type="button" onClick={handleReset}>
              CLEAR
            </StyledWhiteButton>
          </ButtonWrap>
        </StyledForm>
      </FormWrap>
    </>
  );
}
