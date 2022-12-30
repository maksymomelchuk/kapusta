import React from 'react';
import { RegistrationForm } from 'components/RegistrationForm/RegistrationForm';

import { useMatchMedia } from '../../hooks/use-match-media';
import {
  StyledRegisterPage,
  Image,
  Background,
  KapustaMobBottom,
  KapustaTabBotLeft,
  KapustaTabBotRight,
  ShadowTabBotLeft,
  TextWrap,
  ShadowTabBotRight,
  Text,
  KapustaMobTop,
  GroupTablet,
  GroupDesktop,
} from './RegisterPage.styled';
import Name from '../../images/union.svg';
import imageMobBg from '../../images/reportsFiles/backgroundMobile.png';
import imageTabBg from '../../images/reportsFiles/backgroundTablet.png';
import imageDeskBg from '../../images/reportsFiles/backgroundDesktop.png';
import kapusta from '../../images/kapusta.svg';
import tabShadow from '../../images/tabEllipse.svg';
import groupTablet from '../../images/groupTablet.png';
import groupDesktop from '../../images/groupDesktop.png';
import halfKapusta from '../../images/half.png';

// Register page
export default function RegisterPage() {
  // Hook
  const { isMobile, isTablet, isDesktop } = useMatchMedia();

  return (
    <StyledRegisterPage>
      <Background
        imgMobUrl={imageMobBg}
        imgTabUrl={imageTabBg}
        imgDeskUrl={imageDeskBg}
      >
        {/* For mobile */}
        {isMobile && (
          <>
            <KapustaMobTop src={halfKapusta} alt="bg" />
            <KapustaMobBottom src={kapusta} width="83" height="89" />
          </>
        )}
        {/* For tablet */}
        {isTablet && (
          <>
            <GroupTablet src={groupTablet} alt="bg" />

            <KapustaTabBotLeft src={kapusta} width="83" height="89" />
            <ShadowTabBotLeft src={tabShadow} width="83" height="89" />
            <KapustaTabBotRight src={kapusta} width="83" height="89" />
            <ShadowTabBotRight src={tabShadow} width="83" height="89" />
          </>
        )}
        {/* For desktop */}
        {isDesktop && (
          <>
            <GroupDesktop src={groupDesktop} alt="bg" />

            <KapustaTabBotLeft src={kapusta} width="83" height="89" />
            <ShadowTabBotLeft src={tabShadow} width="83" height="89" />
            <KapustaTabBotRight src={kapusta} width="83" height="89" />
            <ShadowTabBotRight src={tabShadow} width="83" height="89" />
          </>
        )}
        <TextWrap>
          <Image src={Name} alt="Kapusta" />
          <Text>Smart Finance</Text>
        </TextWrap>
        <RegistrationForm />
      </Background>
    </StyledRegisterPage>
  );
}
