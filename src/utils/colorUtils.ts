/**
 * Add opacity to a color
 * @param color The current color string
 * @param opacity The opacity in decimal form
 * @returns CSS color string with added opacity
 */
export const addOpacity = (color: string, opacity: number): string => {
  if (color.match(/^rgb\(.*\)$/)) {
    return color.replace(/rgb/, 'rgba').replace(/\)/, `, ${opacity})`);
  }
  return color + Math.round(Math.min(Math.max(opacity, 0), 1) * 255).toString(16);
};
