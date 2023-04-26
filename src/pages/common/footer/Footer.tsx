import { ShopOutlined, UserOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';

import { PROFILE_PAGE, RESTAURANTS_PAGE } from '../../../routes/pages';
import styles from './Footer.module.css';

const cx = classNames.bind(styles);

interface FooterProps {}

const navItems = [
  {
    id: 'restaurants',
    to: RESTAURANTS_PAGE,
    icon: ShopOutlined,
  },
  {
    id: 'profile',
    to: PROFILE_PAGE,
    icon: UserOutlined,
  },
];

export const Footer = (_: FooterProps) => (
  <footer className={cx('footer')}>
    <nav className={cx('navigation')}>
      {navItems.map(({ id, to, icon: Icon }) => (
        <NavLink key={id} to={to}>
          {({ isActive }) => (
            <Icon className={cx('nav-icon', isActive ? 'active' : '')} />
          )}
        </NavLink>
      ))}
    </nav>
  </footer>
);
