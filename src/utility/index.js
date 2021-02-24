import format from 'date-fns/format';

export const formatProductDate = (date) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
};

export const formatOrderDate = (date) => format(date, 'yyyy MMM d, eee kk:mm');
