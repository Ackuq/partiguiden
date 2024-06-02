export interface Riksmoten {
  riksmoten: {
    "@systemdatum": string;
    riksmote: RiksmoteItem[];
  };
}

export interface RiksmoteItem {
  riksmote: string;
  id: string;
  start: string;
  slut: string;
  mandatperiod: string;
}
