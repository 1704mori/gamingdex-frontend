export const dark = {
  gray: {
    100: "#3d3d3d",
    200: "#2c2c2c",
    300: "#191a1c",
  },
};

export const light = {
  gray: {
    100: "#f7fafc",
    200: "#edf2f7",
    300: "#e2e8f0",
  },
};

export const colors = {
  primary: {
    100: "#69c0ff",
    200: "#40a9ff",
    300: "#1890ff",
  },
  light,
  dark,
};

export function hexToRGB(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return [r, g, b];
}

export function hexToHSL(hex: string) {
  const rgb = hexToRGB(hex);

  const r = rgb[0] / 255;
  const g = rgb[1] / 255;
  const b = rgb[2] / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  return [h, s, l];
}

const theme = {
  colors,
  hexToRGB,
  hexToHSL,
};

export default theme;
