import { SearchOutlined } from '@ant-design/icons';
import Button from 'antd/lib/button';
import { Link } from 'react-router-dom';

import { SEARCH_PAGE } from '../../routes/pages';
import { Footer } from '../common/footer';
import { SEARCH_TYPE_RESTAURANTS } from '../search-page/constants';

export const RestaurantsPage = () => (
  <div>
    <Link to={SEARCH_PAGE} state={{ type: SEARCH_TYPE_RESTAURANTS }}>
      <Button icon={<SearchOutlined />} size="large">
        Restaurants
      </Button>
    </Link>
    <Footer />
  </div>
);
