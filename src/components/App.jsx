import { Navigate, Route, Routes } from 'react-router-dom';
import { SharedLayouts } from './SharedLayouts/SharedLayouts';
// import { LightModalWindow } from './LightModalWindow/LightModalWindow';
// import { Summary } from './Summary/Summary';
// import { Form } from './TestForm/Form';
import { useEffect, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAccessToken } from 'redux/auth/auth.slice';
import { setAuthHeader } from 'services/apiAuth';
import { refreshUser } from 'redux/auth/operations';
import { selectIsFetcingCurrentUser } from 'redux/selectors';
import { PrivateRoute } from './PrivateRoute/PrivateRoute';
import { PublicRoute } from './PublicRoute/PublicRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useMatchMedia } from 'hooks/use-match-media';

const ExpensesPage = lazy(() => import('../pages/ExpensesPage/ExpensesPage'));
const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const IncomePage = lazy(() => import('../pages/IncomePage/IncomePage'));
const LoginPage = lazy(() => import('../pages/LoginPage/LoginPage'));
const RegiserPage = lazy(() => import('../pages/RegisterPage/RegisterPage'));
const ReportsPage = lazy(() => import('../pages/ReportsPage/ReportsPage'));
const ThereIsNoSuchPage = lazy(() =>
  import('../pages/ThereIsNoSuchPage/ThereIsNoSuchPage')
);

export const App = () => {
  const dispatch = useDispatch();
  const token = JSON.parse(
    localStorage.getItem('persist:auth')
  ).token.replaceAll('"', '');

  const isFetchingUser = useSelector(selectIsFetcingCurrentUser);
  const { isMobile } = useMatchMedia();
  useEffect(() => {
    // if (!token || token === 'null') {
    //   return;
    // }
    setAuthHeader(token);
    dispatch(addAccessToken(token));
    dispatch(refreshUser());
  }, [dispatch, token]);

  return (
    !isFetchingUser && (
      <>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<SharedLayouts />}>
            <Route path="/" element={<PrivateRoute />}>
              <Route index element={<Navigate to="/home" />} />
              {!isMobile && (
                <>
                  <Route path="/home" element={<HomePage />}>
                    <Route index element={<Navigate to="/home/expenses" />} />
                    <Route path="income" element={<IncomePage />} />
                    <Route path="expenses" element={<ExpensesPage />} />
                  </Route>
                </>
              )}
              {isMobile && (
                <>
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/income" element={<IncomePage />} />
                  <Route path="/expenses" element={<ExpensesPage />} />
                  <Route path="*" element={<Navigate to="/home" />} />
                </>
              )}
              <Route path="/reports" element={<ReportsPage />} />
            </Route>
            <Route path="/" element={<PublicRoute />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegiserPage />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Route>

            <Route path="*" element={<ThereIsNoSuchPage />} />
          </Route>
        </Routes>
        {/* <LightModalWindow>Are you sure?</LightModalWindow> */}
        {/* <Summary /> */}
        {/* <Form /> */}
        {/* <TransactionsList /> */}
      </>
    )
  );
};
