const dateNow = new Date();

export const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const getMonth = () => dateNow.getMonth();
export const getYear = () => dateNow.getFullYear();
