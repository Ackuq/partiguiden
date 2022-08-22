import { PopularSubjects, Subject, SubjectList } from '../types/subjects';

const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const getSubjects = (signal?: AbortSignal): Promise<SubjectList> =>
  fetch(`${baseUrl}/subjects/`, { signal }).then((res) => res.json());

export const getSubject = (id: number, signal?: AbortSignal): Promise<Subject> =>
  fetch(`${baseUrl}/subjects/${id}/`, { signal }).then((res) => res.json());

export const getPopular = (signal?: AbortSignal): Promise<PopularSubjects> =>
  fetch(`${baseUrl}/analytics/popular/`, { signal }).then((res) => res.json());

/* Searching */

export const searchSubjects = (searchText: string, signal?: AbortSignal): Promise<SubjectList> =>
  fetch(`${baseUrl}/subjects/?search=${searchText}`, { signal }).then((res) => res.json());
