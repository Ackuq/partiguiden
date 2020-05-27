import { getParties } from '../utils';

const baseUrl = process.env.API_URL || 'http://localhost:3001';

export const getMembers = () => fetch(`${baseUrl}/members`).then((res) => res.json());

export const getMember = (id: string) => fetch(`${baseUrl}/member/${id}`).then((res) => res.json());

export const getSubjects = () => fetch(`${baseUrl}/subject`).then((res) => res.json());

export const getSubject = (id: string) =>
  fetch(`${baseUrl}/subject/${id}`).then((res) => res.json());

export const getStandpointData = (tags: Array<string>) =>
  Promise.all(
    getParties.map((party) =>
      fetch(`${baseUrl}/party/${party.letter}`)
        .then((res) => res.json())
        .then((data) => {
          const temp = [] as Array<any>;

          Object.keys(data).forEach((id) => {
            if (tags.indexOf(data[id].name) > -1) temp.push(data[id]);
          });
          if (temp.length > 0) {
            return { name: party.name, data: temp };
          }
          return null;
        })
    )
  );
