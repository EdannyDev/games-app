import styled from '@emotion/styled';

export const FooterContainer = styled.footer`
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background-color: #0d253f;
  color: #fff;
  border-top: 1px solid #888;
  flex-wrap: wrap;
`;

export const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const RightSection = styled.div`
  text-align: right;
`;

export const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 10px;

  a {
    color: #fff;
    transition: color 0.3s;

    &:hover {
      color: #1da1f2;
    }
  }
`;

export const Copyright = styled.div`
  font-size: 0.9rem;
`;

export const ContactInfo = styled.div`
  p {
    margin: 5px 0;
    font-size: 1.1rem;
  }
`;