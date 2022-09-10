import { Admins } from '../constants';

export let isReadyForNewAdmin = false;
export let isReadyForDishName = false;
export let isReadyForDishDescription = false;
export let isReadyForDishImage = false;
export let isReadyForDishPrice = false;

export function isAdmin(id: number) {
  return Admins.some((admin) => admin.id === id);
}

export function readyForNewAdmin(isReady: boolean) {
  isReadyForNewAdmin = isReady;
}

export function readyForDishName(isReady: boolean) {
  isReadyForDishName = isReady;
}

export function readyForDishDescription(isReady: boolean) {
  isReadyForDishDescription = isReady;
}

export function readyForDishImage(isReady: boolean) {
  isReadyForDishImage = isReady;
}

export function readyForDishPrice(isReady: boolean) {
  isReadyForDishPrice = isReady;
}
