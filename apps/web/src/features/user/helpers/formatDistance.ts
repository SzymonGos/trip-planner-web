export const formatDistance = (num: number): string => {
  if (num >= 1000) {
    // Round to 1 decimal place and add 'k'
    return (Math.round(num / 100) / 10).toFixed(1).replace(/\.0$/, '') + 'k';
  }
  return num.toFixed(1).replace(/\.0$/, '');
};
