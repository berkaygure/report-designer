// eslint-disable-next-line import/prefer-default-export
export const capitalize: string = (s: string) => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};
