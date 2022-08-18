export interface Admin {
  id: number;
  username: string;
  firstName: string;
  isSuper: boolean;
}

export interface DishMenuItem {
  name: string;
  description: string;
  img: string;
  price: number;
}
