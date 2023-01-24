import './rdp.scss';

import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Header } from 'components/header/header';
import { RESTAURANTS_MOCKED } from 'data/mocks';
import { RestaurantData } from 'data/types';
import { useParams } from 'react-router-dom';

export const Rdp = (): JSX.Element => {
  let { title } = useParams();
  const pageData: RestaurantData | undefined = RESTAURANTS_MOCKED.find(
    data => data.title === title
  );

  return (
    <>
      <Header></Header>
      <main className="rdp">
        {pageData?.menu ? (
          <>
            <section className="heading">
              <img
                src={`${pageData.image}`}
                alt={pageData.title}
                loading="lazy"
              />
              <article>
                <Typography variant="h3" component="h1">
                  {pageData.title}
                </Typography>
                <Typography variant="body1" component="p">
                  {pageData.description}
                </Typography>
              </article>
            </section>
            <section className="menu">
              <h2>Menu:</h2>
              <ul className="menu-list">
                {pageData.menu.map(dish => (
                  <li className="dish" key={dish.title}>
                    <img
                      src={`${dish.image}`}
                      alt={dish.title}
                      loading="lazy"
                    />
                    <p className="dish-text">
                      <Typography variant="h4" component="h2">
                        {dish.title}
                      </Typography>
                      <Typography variant="body1" component="p">
                        {dish.description}
                      </Typography>
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          </>
        ) : null}
      </main>
    </>
  );
};
