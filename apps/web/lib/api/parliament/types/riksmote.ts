export interface Riksmoten {
  riksmoten: {
    "@systemdatum": string;
    riksmote: RiksmoteItem[];
  };
}

interface RiksmoteItem {
  riksmote: string;
  id: string;
  start: string;
  slut: string;
  mandatperiod: string;
}
