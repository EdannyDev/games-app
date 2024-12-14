import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faCogs, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { NavbarContainer, NavLink, LogoContainer, NavLinks, ActionButton, CartBadge } from '../styles/navbar.styles';
import jwt from 'jsonwebtoken';
import { useCart } from '@/context/cartContext';

const Navbar = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [userRole, setUserRole] = useState('');
  const { getCartCount } = useCart();

  useEffect(() => {
    setMounted(true);

    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwt.decode(token);
        setUserRole(decodedToken.role);
      } catch (error) {
        console.error('Error decoding token:', error);
        setUserRole('');
      }
    }
  }, []);

  const navLinks = [
    { text: 'Inicio', path: '/home' },
    { text: 'Registros', path: '/games', roles: ['administrador'] },
    { text: 'Perfil', path: '/profile' },
    { text: 'Tienda', path: '/store' },
    { text: 'Usuarios', path: '/users', roles: ['administrador'] },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  if (!mounted) return null;

  return (
    <NavbarContainer>
      <LogoContainer>
        <span>SmarTech&nbsp;</span>
        <span>|&nbsp;</span>
        <div className="logo">
          <FontAwesomeIcon icon={faCogs} className="icon" />
        </div>
      </LogoContainer>

      <NavLinks>
        {navLinks.map((link, index) => {
          const showLink = !link.roles || link.roles.includes(userRole);
          return (
            showLink && (
              <li key={index}>
                <Link href={link.path} passHref>
                  <NavLink active={router.pathname === link.path}>
                    {link.text}
                  </NavLink>
                </Link>
              </li>
            )
          );
        })}
      </NavLinks>

      <div className="actions">
        <Link href="/cart" passHref>
          <ActionButton className="cart-button">
            <FontAwesomeIcon icon={faShoppingCart} />
            {getCartCount() > 0 && <CartBadge />}
          </ActionButton>
        </Link>
        <ActionButton onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} /> 
          <span> Cerrar Sesión</span>
        </ActionButton>
      </div>
    </NavbarContainer>
  );
};

export default Navbar;