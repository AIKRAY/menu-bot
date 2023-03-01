import { SearchOutlined } from '@ant-design/icons';
import Button from 'antd/lib/button';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import { SEARCH_PAGE } from '../../routes/pages';
import { Footer } from '../common/footer';
import styles from './HomePage.module.css';

const cx = classNames.bind(styles);

// TODO: Create a page Layout component
export const HomePage = () => (
  <>
    <div className={cx('home-page')}>
      <Link to={SEARCH_PAGE} state={{ type: 'cities' }}>
        <Button icon={<SearchOutlined />} size="large">
          Choose City
        </Button>
      </Link>
    </div>
    <Footer />
  </>
);
