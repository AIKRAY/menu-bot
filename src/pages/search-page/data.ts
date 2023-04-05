const MINSK = 'minsk';
const TBILISI = 'tbilisi';
const MOSCOW = 'moscow';
const TASHKENT = 'tashkent';

export const supportedCities = [MINSK, TBILISI, MOSCOW, TASHKENT];

export const restaurantsByCities: { [name: string]: string[] } = {
  [MINSK]: ['Vasilki', 'The View'],
  [TBILISI]: ['Tiflis', 'Mimino'],
  [MOSCOW]: ['Russkiy', 'Stolovaya'],
  [TASHKENT]: ['Chaikhana', 'Plov!'],
};
