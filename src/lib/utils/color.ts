import Color from 'color';

export type RGBA = {
  r: number;
  g: number;
  b: number;
  a: number;
  isDark: boolean;
};

export function parseColor(color: string): RGBA {
  const parsed = Color(color);
  const isDark = parsed.isDark();

  return {
    r: parsed.red(),
    g: parsed.green(),
    b: parsed.blue(),
    a: parsed.alpha(),
    isDark,
  };
}
