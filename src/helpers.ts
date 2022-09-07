import { Context, Middleware } from 'telegraf';
import { Message } from 'telegraf/typings/core/types/typegram';
import { Admins, DishMenu, NewDish } from './constants';
import { DishMenuItem } from './types';
import fetch from 'node-fetch';
import { s3ServiceInstance } from './services';

export let isReadyForNewAdmin = false;
export let isReadyForDishName = false;
export let isReadyForDishDescription = false;
export let isReadyForDishImage = false;
export let isReadyForDishPrice = false;

export function isSuperAdmin(id: number) {
  return Admins.some((admin) => admin.isSuper && admin.id === id);
}

export function getMenuItem(item: DishMenuItem) {
  return `<b>${item.name}</b>
<i>${item.description}</i>
${item.price}`;
}

export function newAdminMiddleware(): Middleware<Context> {
  return async (ctx, next) => {
    if (
      isReadyForNewAdmin &&
      !(ctx.message as Message.CommonMessage)?.forward_from
    ) {
      await replyWithInvalidMessageWarningText(ctx, 'adding an admin');
      readyForNewAdmin(false);
    }
    next();
  };
}

export function dishNameMiddleware(): Middleware<Context> {
  return async (ctx, next) => {
    if (isReadyForDishName && !(ctx.message as Message.TextMessage).text) {
      await replyWithInvalidMessageWarningText(ctx, 'adding a dish name');
      readyForDishName(false);
    }
    next();
  };
}

export function dishDescriptionMiddleware(): Middleware<Context> {
  return async (ctx, next) => {
    if (
      isReadyForDishDescription &&
      !(ctx.message as Message.TextMessage).text
    ) {
      await replyWithInvalidMessageWarningText(
        ctx,
        'adding a dish description'
      );
      readyForDishDescription(false);
    }
    next();
  };
}

export function dishImageMiddleware(): Middleware<Context> {
  return async (ctx, next) => {
    if (isReadyForDishImage && !(ctx.message as Message.PhotoMessage).photo) {
      await replyWithInvalidMessageWarningText(ctx, 'adding a dish image');
      readyForDishImage(false);
    }
    next();
  };
}

export function dishPriceMiddleware(): Middleware<Context> {
  return async (ctx, next) => {
    if (isReadyForDishPrice && !(ctx.message as Message.TextMessage).text) {
      await replyWithInvalidMessageWarningText(ctx, 'adding a dish price');
      readyForDishPrice(false);
    }
    next();
  };
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

async function replyWithInvalidMessageWarningText(
  ctx: Context,
  processName: string
) {
  await ctx.reply(
    `An invalid message was received. The process of ${processName} has been aborted.`
  );
}
