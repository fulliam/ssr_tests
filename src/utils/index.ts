export const isPromise = (obj: any) => {
  !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
};

export const lighten = (hexColor: string, percent: number) => {
  let rgb = hexColor.substr(1).match(/.{2}/g);
  if (!rgb) throw new Error(`${hexColor} is not a valid color`);

  let [r, g, b] = rgb.map(hex => parseInt(hex, 16));
  const amt = Math.round(2.55 * percent);

  r = (r + amt > 255) ? 255 : r + amt;
  g = (g + amt > 255) ? 255 : g + amt;
  b = (b + amt > 255) ? 255 : b + amt;

  return '#' + (r | 1 << 8).toString(16).slice(1) + (g | 1 << 8).toString(16).slice(1) + (b | 1 << 8).toString(16).slice(1);
};

