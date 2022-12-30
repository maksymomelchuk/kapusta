import styled from 'styled-components';
import { HandySvg } from 'handy-svg';
import bgDesk from '../../images/bgDeskKapusta.png';
import bgTabl from '../../images/kapustaTab.svg';

export const StyledHomePage = styled.div`
  padding: 46px 0px 0px 0px;
  margin: 0 auto;

  @media screen and (min-width: 768px) {
    padding: 40px 32px 60px 32px;
    background-image: url(${bgTabl});
    background-position: bottom 60px right 88px;
    background-repeat: no-repeat;
  }
  @media screen and (min-width: 1280px) {
    padding: 40px 91px 83px 91px;
    background-image: url(${bgDesk});
    background-position: bottom;
  }

  .flexWrapper {
    @media screen and (min-width: 768px) {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      margin-bottom: 60px;
    }
    @media screen and (min-width: 1280px) {
      position: relative;
      margin-bottom: 8px;
    }
  }

  .datePickerMobWrap {
    width: 90px;
    margin: 0 auto 70px;
  }
`;

export const KapustaTab = styled(HandySvg)`
  margin-left: 497px;
  margin-top: -160px;
`;

export const KapustaDesk = styled.img`
  position: absolute;
  bottom: 30px;
  left: 0px;
  z-index: -1;
`;
