import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import {
  FooterContainer,
  LeftSection,
  RightSection,
  SocialLinks,
  Copyright,
  ContactInfo,
} from '../styles/footer.styles';

const Footer = () => {
  return (
    <FooterContainer>
      <LeftSection>
        <SocialLinks>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebook} size="2x" />
          </a>
          <a href="https://www.x.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faXTwitter} size="2x" />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </a>
        </SocialLinks>
        <Copyright>
          <p style={{ fontSize: "20px", marginTop: "15px" }}>© 2024 SmarTech. Todos los derechos reservados.</p>
        </Copyright>
      </LeftSection>
      <RightSection>
        <ContactInfo>
          <p>Dirección: 65 Av. Sur por Calle 35 Sur, Cozumel, México</p>
          <p>Teléfono: +52 1 9871065744</p>
          <p>Email: info@smartech.com.mx</p>
        </ContactInfo>
      </RightSection>
    </FooterContainer>
  );
};

export default Footer;