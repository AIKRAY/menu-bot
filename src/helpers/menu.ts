import fetch from 'node-fetch';
import { Telegraf, Context } from 'telegraf';
import { InlineKeyboardMarkup } from 'telegraf/typings/core/types/typegram';
import { DishMenu, NewDish } from '../constants';
import { s3ServiceInstance } from '../services';
import { Dish } from '../types';

export let dishForEdit: Dish | undefined = undefined;

export function setDishForEdit(dish?: Dish) {
  dishForEdit = dish;
}

export function getDishText(dish: Dish) {
  return `<b>${dish.name}</b>
  <i>${dish.description}</i>
  ${dish.price}`;
}

export async function replyWithMenu(bot: Telegraf, ctx: Context) {
  for (const dish of DishMenu.filter((dish) => !dish.hidden)) {
    const savedImg = await s3ServiceInstance.getImage(dish.img);

    await bot.telegram.sendPhoto(
      ctx.chat!.id,
      { source: savedImg as Buffer },
      {
        parse_mode: 'HTML',
        caption: getDishText(dish),
      }
    );
  }
}

export function getMenuControls(dish: Dish) {
  return {
    inline_keyboard: [
      [
        { text: 'Edit', callback_data: `edit-dish ${dish.id}` },
        { text: 'Delete', callback_data: `delete-dish ${dish.id}` },
        {
          text: dish.hidden ? 'Show' : 'Hide',
          callback_data: `toggle-dish ${dish.id}`,
        },
      ],
    ],
  };
}

export function getMenuControlsForNewDish(dish: Dish) {
  return {
    inline_keyboard: [
      ...getMenuControls(dish).inline_keyboard,
      [{ text: 'Add more', callback_data: `add-dish` }],
    ],
  };
}

export function getDishById(id: number) {
  return DishMenu.find((dish) => dish.id === id);
}

export function addDishName(name: string) {
  NewDish.name = name;
}

export function addDishDescription(description: string) {
  NewDish.description = description;
}

export async function addDishPhoto(fileLink: URL) {
  NewDish.img = await uploadImage(fileLink);
}

export function addDishPrice(price: string) {
  NewDish.price = price;
}

export function addDishToDishMenu() {
  NewDish.id = DishMenu.length;
  DishMenu.push(NewDish as Dish);
}

export function editDishName(dish: Dish, name: string) {
  dish.name = name;
}

export function editDishDescription(dish: Dish, description: string) {
  dish.description = description;
}

export async function editDishPhoto(dish: Dish, fileLink: URL) {
  dish.img = await uploadImage(fileLink);
}

export function editDishPrice(dish: Dish, price: string) {
  dish.price = price;
}

async function uploadImage(fileLink: URL) {
  const res = await fetch(fileLink.href);
  const buffer = await res.buffer();
  const name = `${DishMenu.length}.png`;
  await s3ServiceInstance.uploadImage(buffer, name);
  return name;
}

export async function replyWithDish(
  ctx: Context,
  dish: Dish,
  controls: InlineKeyboardMarkup
) {
  const savedImg = await s3ServiceInstance.getImage(dish.img);

  await ctx.telegram.sendPhoto(
    ctx.chat!.id,
    { source: savedImg as Buffer },
    {
      parse_mode: 'HTML',
      caption: getDishText(dish),
      reply_markup: controls,
    }
  );
}
