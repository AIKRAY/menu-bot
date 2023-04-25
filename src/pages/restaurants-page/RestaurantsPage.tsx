import { SearchOutlined } from '@ant-design/icons';
import Button from 'antd/lib/button';
import classNames from 'classnames/bind';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { StoreContext } from '../../providers/store-provider';
import { SEARCH_PAGE } from '../../routes/pages';
import { Footer } from '../common/footer';
import {
  SEARCH_TYPE_CITIES,
  SEARCH_TYPE_RESTAURANTS,
} from '../search-page/constants';
import { NoCityBlock } from './no-city-block';
import styles from './RestaurantsPage.module.css';

const cx = classNames.bind(styles);

export const RestaurantsPage = () => {
  const { selectedCity } = useContext(StoreContext);

  return (
    <div className={cx('restaurants-page')}>
      {selectedCity ? (
        <>
          <span className={cx('current-city')}>
            <Link to={SEARCH_PAGE} state={{ type: SEARCH_TYPE_CITIES }}>
              {selectedCity}
            </Link>
          </span>
          <Link to={SEARCH_PAGE} state={{ type: SEARCH_TYPE_RESTAURANTS }}>
            <Button icon={<SearchOutlined />} size="large">
              Restaurants
            </Button>
          </Link>
          {/* TODO: Restaurants list will be here */}
        </>
      ) : (
        <NoCityBlock />
      )}
      <Footer />
    </div>
  );
};
