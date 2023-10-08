export type Riksmoten = {
  riksmoten: {
    "@systemdatum": string;
    riksmote: RiksmoteItem[];
  };
};

export type RiksmoteItem = {
  riksmote: string;
  id: string;
  start: string;
  slut: string;
  mandatperiod: string;
};
