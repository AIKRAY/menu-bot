import fetch from 'node-fetch';
import { Telegraf, Context } from 'telegraf';
import { DishMenu, NewDish } from '../constants';
import { s3ServiceInstance } from '../services';
import { DishMenuItem } from '../types';

export function getMenuItem(item: DishMenuItem) {
  return `<b>${item.name}</b>
  <i>${item.description}</i>
  ${item.price}`;
}

export async function replyWithMenu(bot: Telegraf, ctx: Context) {
  for (const item of DishMenu.filter((item) => !item.hidden)) {
    const savedImg = await s3ServiceInstance.getImage(item.img);

    await bot.telegram.sendPhoto(
      ctx.chat!.id,
      { source: savedImg as Buffer },
      {
        parse_mode: 'HTML',
        caption: getMenuItem(item),
      }
    );
  }
}

export function getMenuControls(item: DishMenuItem) {
  return {
    inline_keyboard: [
      [
        { text: 'Edit', callback_data: `edit-menu-item ${item.id}` },
        { text: 'Delete', callback_data: `delete-menu-item ${item.id}` },
        {
          text: item.hidden ? 'Show' : 'Hide',
          callback_data: `toggle-menu-item ${item.id}`,
        },
      ],
    ],
  };
}

export function getMenuControlsForNewItem(item: DishMenuItem) {
  return {
    inline_keyboard: [
      ...getMenuControls(item).inline_keyboard,
      [{ text: 'Add more', callback_data: `add-menu-item` }],
    ],
  };
}

export function addDishName(name: string) {
  NewDish.name = name;
}

export function addDishDescription(description: string) {
  NewDish.description = description;
}

export async function addDishPhoto(fileLink: URL) {
  const res = await fetch(fileLink.href);
  const buffer = await res.buffer();
  const name = `${DishMenu.length}.png`;
  await s3ServiceInstance.uploadImage(buffer, name);
  NewDish.img = name;
}

export function addDishPrice(price: string) {
  NewDish.price = price;
}

export function addDishToDishMenu() {
  NewDish.id = DishMenu.length;
  DishMenu.push(NewDish as DishMenuItem);
}
