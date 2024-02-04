/**
 * for responsiveness
 *  */

const vw = Math.max(
  document.documentElement.clientWidth || 0,
  window.innerWidth || 0
);
export const view = { lg: vw > 1024, md: vw > 600 && vw <= 1024, sm: vw < 600 };

export const vh = Math.max(
  document.documentElement.clientHeight || 0,
  window.innerHeight || 0
);

export const capitalizeFirstCharacter = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1, string.length);
