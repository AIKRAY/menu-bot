import Button from 'antd/lib/button';
import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';

import { PROFILE_PAGE, RESTAURANTS_PAGE } from '../../../routes/pages';
import styles from './Footer.module.css';

const cx = classNames.bind(styles);

interface FooterProps {}

export const Footer = (_: FooterProps) => (
  <footer className={cx('footer')}>
    <NavLink to={RESTAURANTS_PAGE} className={cx('page-link')}>
      {({ isActive }) => (
        <Button type={isActive ? 'primary' : 'default'} size="large" block>
          Restaurants
        </Button>
      )}
    </NavLink>
    <NavLink to={PROFILE_PAGE} className={cx('page-link')}>
      {({ isActive }) => (
        <Button type={isActive ? 'primary' : 'default'} size="large" block>
          Search
        </Button>
      )}
    </NavLink>
  </footer>
);
