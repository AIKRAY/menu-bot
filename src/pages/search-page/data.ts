const MINSK = 'Minsk';
const TBILISI = 'Tbilisi';
const MOSCOW = 'Moscow';
const TASHKENT = 'Tashkent';

export const supportedCities = [MINSK, TBILISI, MOSCOW, TASHKENT];

export const restaurantsByCities: { [name: string]: string[] } = {
  [MINSK]: ['Vasilki', 'The View'],
  [TBILISI]: ['Tiflis', 'Mimino'],
  [MOSCOW]: ['Russkiy', 'Stolovaya'],
  [TASHKENT]: ['Chaikhana', 'Plov!'],
};
