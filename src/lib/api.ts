import { PopularSubjects, Subject, SubjectListEntry } from '../types/subjects';

const baseUrl = process.env.API_URL || 'http://localhost:8000';

export const getSubjects = (): Promise<Array<SubjectListEntry>> =>
  fetch(`${baseUrl}/subjects/`).then((res) => res.json());

export const getSubject = (id: number): Promise<Subject> =>
  fetch(`${baseUrl}/subjects/${id}/`).then((res) => res.json());

export const getPopular = (): Promise<PopularSubjects> =>
  fetch(`${baseUrl}/analytics/popular/`).then((res) => res.json());
