export type RestaurantData = {
  title: string;
  description: string;
  image?: string;
  menu?: { title: string; description: string; image?: string }[];
};
