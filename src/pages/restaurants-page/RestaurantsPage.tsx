import { SearchOutlined } from '@ant-design/icons';
import Button from 'antd/lib/button';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import { SEARCH_PAGE } from '../../routes/pages';
import { Footer } from '../common/footer';
import {
  LOCAL_STORAGE_SAVED_CITY_KEY,
  SEARCH_TYPE_CITIES,
  SEARCH_TYPE_RESTAURANTS,
} from '../search-page/constants';
import styles from './RestaurantsPage.module.css';

const cx = classNames.bind(styles);

export const RestaurantsPage = () => {
  // TODO: Use city from Telegram. Move it upper to retrieve on app start
  const currentCity: string = localStorage.getItem(
    LOCAL_STORAGE_SAVED_CITY_KEY
  ) as string;

  return (
    <div className={cx('restaurants-page')}>
      {currentCity ? (
        <>
          <span className={cx('current-city')}>{currentCity}</span>
          <Link to={SEARCH_PAGE} state={{ type: SEARCH_TYPE_RESTAURANTS }}>
            <Button icon={<SearchOutlined />} size="large">
              Restaurants
            </Button>
          </Link>
        </>
      ) : (
        <div className={cx('no-city-block')}>
          <Link to={SEARCH_PAGE} state={{ type: SEARCH_TYPE_CITIES }}>
            <Button icon={<SearchOutlined />} size="large">
              Choose City
            </Button>
          </Link>
        </div>
      )}
      <Footer />
    </div>
  );
};
