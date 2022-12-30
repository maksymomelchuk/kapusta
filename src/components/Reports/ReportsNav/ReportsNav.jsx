import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { Slider } from './Slider/Slider';
import { selectBalance } from 'redux/selectors';
import reports from '../../../images/reportsFiles/reports.svg';
import {
  Balance,
  ButtonBack,
  ButtonBackText,
  BalanceText,
  BalanceAmounth,
  Box,
  PreBox,
  ButtonConfirm,
} from './ReportsNav.styled';

export const ReportsNav = () => {
  // Selectors
  const balance = useSelector(selectBalance);
  // Location
  const location = useLocation();
  const backLinkHref = location.state?.from ?? '/';

  return (
    <PreBox>
      {/* Back button */}
      <ButtonBack to={backLinkHref}>
        <svg width="24" height="24">
          <use href={`${reports}#icon-back`}></use>
        </svg>
        <ButtonBackText>Go back</ButtonBackText>
      </ButtonBack>
      {/* Div */}
      <Box>
        {/* Calendar slider */}
        <Slider />
        {/* Balance block */}
        <Balance>
          <BalanceText>Balance:</BalanceText>
          <BalanceAmounth>{balance ?? 0}.00 UAH</BalanceAmounth>
          <ButtonConfirm type="button">Confirm</ButtonConfirm>
        </Balance>
      </Box>
    </PreBox>
  );
};
