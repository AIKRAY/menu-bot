import { Context, Middleware } from 'telegraf';
import { Message } from 'telegraf/typings/core/types/typegram';
import { Admins } from './constants';
import { DishMenuItem } from './types';

export let isReadyForNewAdmin = false;

export function isSuperAdmin(id: number) {
  return Admins.some((admin) => admin.isSuper && admin.id === id);
}

export function getMenuItem(item: DishMenuItem) {
  return `<b>${item.name}</b>
<i>${item.description}</i>
${item.price} GEL`;
}

export function newAdminMiddleware(): Middleware<Context> {
  return (ctx, next) => {
    if (
      isReadyForNewAdmin &&
      !(ctx.message as Message.CommonMessage)?.forward_from
    ) {
      readyForNewAdmin(false);
    }
    next();
  };
}

export function readyForNewAdmin(isReady: boolean) {
  isReadyForNewAdmin = isReady;
}
