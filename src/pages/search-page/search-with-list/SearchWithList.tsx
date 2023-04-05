import { Input } from 'antd';
import classNames from 'classnames/bind';
import { ChangeEvent } from 'react';
import { Link } from 'react-router-dom';

import styles from './SearchWithList.module.css';

const cx = classNames.bind(styles);

const { Search } = Input;

interface SearchWithListProps {
  entities?: string[];
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onEntityClick?: (entityName: string) => void;
  entityLinkTarget: string;
}

export const SearchWithList = ({
  entities = [],
  onChange,
  onEntityClick = () => {},
  entityLinkTarget,
}: SearchWithListProps) => (
  <div className={cx('search-with-list')}>
    <Search
      placeholder="Input search text"
      allowClear
      onChange={onChange}
      style={{ width: '100%' }}
    />
    {entities.map(entityName => (
      <Link
        to={entityLinkTarget}
        key={entityName}
        onClick={() => onEntityClick(entityName)}
        className={cx('entity-item')}
      >
        {entityName}
      </Link>
    ))}
  </div>
);
