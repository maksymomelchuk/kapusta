import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useMatchMedia } from '../../hooks/use-match-media';
import GrayBg from '../../components/GrayBg';
import ReportsBtn from '../../components/Buttons/ReportsBtn';
import ChangeBalance from '../../components/ChangeBalance';
import DateSelection from '../../components/DateSelection';
import { StyledHomePage, KapustaTab, KapustaDesk } from './Styles';
import { TransactionsList } from 'components/TransactionsList/TransactionsList';
import {
  TransactionTabsMobile,
  TransactionTabsDesktop,
} from '../../components/TransactionTabs/TransactionTabs';
import kapusta from '../../images/kapustaTab.svg';

export default function HomePage() {
  const { isMobile, isTablet, isDesktop } = useMatchMedia();
  const [startDate, setStartDate] = useState(new Date());
  const location = useLocation();

  return (
    <>
      <GrayBg />
      <StyledHomePage>
        <div className="flexWrapper">
          {isMobile && <ReportsBtn to="/reports" state={{ from: location }} />}
          <ChangeBalance />
          {!isMobile && <ReportsBtn to="/reports" state={{ from: location }} />}
        </div>
        {isMobile && (
          <div className="datePickerMobWrap">
            <DateSelection startDate={startDate} setStartDate={setStartDate} />
          </div>
        )}
        {isMobile && <TransactionTabsMobile />}
        {!isMobile && <TransactionTabsDesktop />}
        {!isMobile && <Outlet />}
        {isMobile && <TransactionsList />}
      </StyledHomePage>
    </>
  );
}
