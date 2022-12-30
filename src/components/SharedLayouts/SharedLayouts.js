import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { AppBar } from '../AppBar/AppBar';
import { StyledContainerDiv } from './SharedLayouts.styled';

export const SharedLayouts = () => {
  return (
    <StyledContainerDiv>
      <AppBar />
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </StyledContainerDiv>
  );
};
