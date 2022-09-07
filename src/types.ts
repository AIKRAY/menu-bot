export interface Admin {
  id: number;
  username: string;
  firstName: string;
  isSuper: boolean;
}

export interface DishMenuItem {
  id: number;
  name: string;
  description: string;
  img: string;
  price: string;
  hidden: boolean;
}
