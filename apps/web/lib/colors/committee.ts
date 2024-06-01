import { Committee } from "../committees";

export const committeeColors: Record<
  Committee,
  { DEFAULT: string; dark: string }
> = {
  [Committee.AU]: { DEFAULT: "#3498db", dark: "#236a95" },
  [Committee.CU]: { DEFAULT: "#f39c12", dark: "#9f650d" },
  [Committee.FiU]: { DEFAULT: "#1abc9c", dark: "#126f65" },
  [Committee.FöU]: { DEFAULT: "#2980b9", dark: "#1a597d" },
  [Committee.JuU]: { DEFAULT: "#34495e", dark: "#232f40" },
  [Committee.KU]: { DEFAULT: "#d35400", dark: "#8a3500" },
  [Committee.KrU]: { DEFAULT: "#8e44ad", dark: "#602274" },
  [Committee.MJU]: { DEFAULT: "#27ae60", dark: "#1a723a" },
  [Committee.NU]: { DEFAULT: "#f1c40f", dark: "#9d870b" },
  [Committee.SkU]: { DEFAULT: "#575fcf", dark: "#39399a" },
  [Committee.SfU]: { DEFAULT: "#ef5777", dark: "#a33257" },
  [Committee.SoU]: { DEFAULT: "#ff5e57", dark: "#d03a3a" },
  [Committee.TU]: { DEFAULT: "#3c40c6", dark: "#27238b" },
  [Committee.UbU]: { DEFAULT: "#808e9b", dark: "#535860" },
  [Committee.UU]: { DEFAULT: "#f53b57", dark: "#d01739" },
  [Committee.UFöU]: { DEFAULT: "#ffa801", dark: "#b07300" },
};
