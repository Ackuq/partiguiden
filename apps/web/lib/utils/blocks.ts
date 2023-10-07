import type { Party } from "@partiguiden/party-data/types";

export const newBlocks = {
  name: "Nya blocken",
  values: [
    {
      name: "Vänsterblocket",
      parties: ["S", "V", "MP", "C"] as Party[],
      color: "#c0392b",
    },
    {
      name: "Högerblocket",
      parties: ["M", "SD", "KD", "L"] as Party[],
      color: "#3a539b",
    },
  ],
} as const;

export const classicBlocks = {
  name: "Klassiska blocken",
  values: [
    {
      name: "Vänsterblocket",
      parties: ["S", "V", "MP"] as Party[],
      color: "#c0392b",
    },
    {
      name: "Sverigedemokraterna",
      parties: ["SD"] as Party[],
      color: "#f4d03f",
    },
    {
      name: "Högerblocket",
      parties: ["M", "C", "KD", "L"] as Party[],
      color: "#3a539b",
    },
  ],
} as const;

export const allBlocks = [newBlocks, classicBlocks];

export type Blocks = typeof classicBlocks | typeof newBlocks;
