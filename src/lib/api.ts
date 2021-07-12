import { PopularSubjects, Subject, SubjectList } from '../types/subjects';

const baseUrl = process.env.API_URL || 'http://localhost:8000';

export const getSubjects = (): Promise<SubjectList> =>
  fetch(`${baseUrl}/subjects/`).then((res) => res.json());

export const getSubject = (id: number): Promise<Subject> =>
  fetch(`${baseUrl}/subjects/${id}/`).then((res) => res.json());

export const getPopular = (): Promise<PopularSubjects> =>
  fetch(`${baseUrl}/analytics/popular/`).then((res) => res.json());

/* Searching */

export const searchSubjects = (searchText: string): Promise<SubjectList> =>
  fetch(`${baseUrl}/subjects/?search=${searchText}`).then((res) => res.json());
