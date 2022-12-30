import { Link } from 'react-router-dom';
import { AuthNav } from 'components/AuthNav/AuthNav';
import logo from '../../images/logo.svg';
import { StyledHeader } from './AppBar.styled';

// AppBar
export const AppBar = () => {
  return (
    // Header
    <StyledHeader>
      {/* Logo */}
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>
      {/* Authorization bar */}
      <AuthNav />
    </StyledHeader>
  );
};
