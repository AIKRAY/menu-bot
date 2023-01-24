import './home.scss';

import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Header } from 'components/header/header';
import { RESTAURANTS_MOCKED } from 'data/mocks';
import { Link } from 'react-router-dom';

export const Home = (): JSX.Element => {
  const items = RESTAURANTS_MOCKED.map(item => (
    <Link className="card" to={item.title} key={item.title}>
      <Card>
        <CardMedia sx={{ height: 300 }} image={item.image} title={item.title} />
        <CardContent>
          <Typography variant="h4" component="h2">
            {item.title}
          </Typography>
          <Typography variant="body1" component="p">
            {item.description}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  ));

  return (
    <>
      <Header></Header>
      <main className="home">
        <section className="cards-layout">{items}</section>
      </main>
    </>
  );
};
