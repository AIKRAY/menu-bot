import classNames from 'classnames/bind';

import { Footer } from '../common/footer';
import styles from './ProfilePage.module.css';

const cx = classNames.bind(styles);

export const ProfilePage = () => (
  <div className={cx('profile-page')}>
    <Footer />
  </div>
);
