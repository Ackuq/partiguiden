import { getParties } from '../utils';
import { PartySubject, Subject } from '../types/party';
import { StandpointData } from '../types/standpoints';

const baseUrl = process.env.API_URL || 'http://localhost:3001';

export const getSubjects = (): Promise<Array<StandpointData>> =>
  fetch(`${baseUrl}/subject`).then((res) => res.json());

export const getSubject = (id: string): Promise<StandpointData> =>
  fetch(`${baseUrl}/subject/${id}`).then((res) => res.json());

export const getStandpointData = (tags: Array<string>): Promise<Array<PartySubject | null>> =>
  Promise.all(
    getParties.map((party) =>
      fetch(`${baseUrl}/party/${party.letter}`)
        .then((res) => res.json())
        .then((data) => {
          const temp: Array<Subject> = [];

          Object.keys(data).forEach((id) => {
            if (tags.indexOf(data[id].name) > -1) {
              temp.push(data[id]);
            }
          });

          if (temp.length > 0) {
            return { name: party.name, data: temp };
          }
          return null;
        })
    )
  );
