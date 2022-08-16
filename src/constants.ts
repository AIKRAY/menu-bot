import { InlineKeyboardButton } from 'telegraf/typings/core/types/typegram';

export const BotMenu = [
  { command: 'menu', description: 'Show Menu' },
  { command: 'language', description: 'Choose Language' },
  { command: 'help', description: 'Help Information' },
  { command: 'about', description: 'About This Bot' },
];

export const AdminBotMenu = [
  ...BotMenu,
  { command: 'admin', description: 'Admin Options' },
];

export const BotMenuKeyboard: InlineKeyboardButton[][] = [
  [{ text: 'Menu', callback_data: 'btn-menu' }],
  [{ text: 'Language', callback_data: 'btn-language' }],
  [
    { text: 'Help', callback_data: 'btn-help' },
    { text: 'About', callback_data: 'btn-about' },
  ],
];

export const AdminBotMenuKeyboard: InlineKeyboardButton[][] = [
  ...BotMenuKeyboard,
  [{ text: 'Admin', callback_data: 'btn-admin' }],
];

export const DishMenu = [
  {
    name: 'Chashushuli',
    description: 'Traditional Georgian Soup',
    img: 'https://georgianjournal.ge/media/_thumb/images/georgianews/2016/October/Cuisine/cane.jpg',
    price: 6,
  },
  {
    name: 'Tolma',
    description: 'Grape leaf roll',
    img: 'https://aif-s3.aif.ru/images/015/673/7ccde42ab56c82cc9634cd20e3727bf7.jpg',
    price: 8,
  },
  {
    name: 'Kebab',
    description: 'Meat sausage on a skewer',
    img: 'https://www.thespruceeats.com/thmb/S_8TXaL0crgFJ76Zj0BAj7EIKms=/1000x1000/smart/filters:no_upscale()/seekh-kabab-kebabs-on-skewers-1957575-hero-01-cd05e3002fc047dbb2dedb69c66a03e1.jpg',
    price: 10,
  },
];

export const LanguageKeyboard: InlineKeyboardButton[][] = [
  [{ text: 'English', callback_data: 'language-en' }],
  [{ text: 'ქართული', callback_data: 'language-ka' }],
  [{ text: 'Русский', callback_data: 'language-ru' }],
];
