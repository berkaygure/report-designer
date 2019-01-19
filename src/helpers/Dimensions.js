// @flow
export const PER_PIXEL: number = 32;

export const convertToCm = (px: number): string => (px / PER_PIXEL).toFixed(2);

export const convertToPx = (cm: number): number => cm * PER_PIXEL;
