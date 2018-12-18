export const PER_PIXEL = 32;

export const convertToCm = px => {
  return (px / PER_PIXEL).toFixed(2);
};

export const convertToPx = cm => {
  return cm * PER_PIXEL;
};
