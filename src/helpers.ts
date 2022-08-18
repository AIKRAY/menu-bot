import { Admins } from './constants';
import { DishMenuItem } from './types';

export function isSuperAdmin(id: number) {
  return Admins.some((admin) => admin.isSuper && admin.id === id);
}

export function getMenuItem(item: DishMenuItem) {
  return `<b>${item.name}</b>
<i>${item.description}</i>
${item.price} GEL`;
}
