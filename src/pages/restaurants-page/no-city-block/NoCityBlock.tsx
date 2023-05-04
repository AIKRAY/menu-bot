import { SearchOutlined } from '@ant-design/icons';
import Button from 'antd/lib/button';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import { SEARCH_PAGE } from '../../../routes/pages';
import { SEARCH_TYPE_CITIES } from '../../search-page/constants';
import styles from './NoCityBlock.module.css';

const cx = classNames.bind(styles);

export const NoCityBlock = () => (
  <div className={cx('no-city-block')}>
    <Link to={SEARCH_PAGE} state={{ type: SEARCH_TYPE_CITIES }}>
      <Button icon={<SearchOutlined />} size="large">
        Choose City
      </Button>
    </Link>
  </div>
);
