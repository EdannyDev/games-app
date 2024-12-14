import styled from '@emotion/styled';

export const NavbarContainer = styled.nav`
  background-color: #0f1626; 
  padding: 10px 20px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;

  .logo {
    display: flex;
    align-items: center;
    margin-right: 10px;
  }

  .logo span {
    font-weight: bold;
    font-size: 18px;
  }

  .logo .icon {
    margin-right: 5px;
  }
`;

export const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    margin-right: 20px;
    position: relative;
  }
`;

export const NavLink = styled.span`
  color: #fff;
  text-decoration: none;
  padding: 10px;
  margin: 0 5px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.7;
  }

  ${({ active }) =>
    active &&
    `
    opacity: 0.7;
    &::after {
      content: '';
      display: block;
      width: 100%;
      height: 2px;
      background-color: white;
      position: absolute;
      bottom: -5px;
      left: 0;
    }
  `}
`;

export const ActionButton = styled.button`
  position: relative; /* Permite al badge posicionarse dentro del botón */
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.7;
  }

  /* Estilo para el botón del carrito */
  &.cart-button {
    margin-right: 20px; /* Ajusta el margen para separar el carrito del botón de cerrar sesión */
  }
`;

export const CartBadge = styled.span`
  position: absolute;
  top: 0px; /* Ajustado para posicionar el círculo en la esquina superior del ícono */
  right: -4px; /* Ajustado para posicionar el círculo en la esquina derecha del ícono */
  width: 9px; /* Tamaño del círculo */
  height: 9px; /* Tamaño del círculo */
  background-color: red;
  color: white;
  border-radius: 50%; /* Hace que el badge sea un círculo perfecto */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0; /* Oculta el texto del badge si lo hubiera */
`;