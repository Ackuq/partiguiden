import dynamic from 'next/dynamic';

export default dynamic(() => import('./FilterContainer'));
export const FilterSearch = dynamic(() => import('./FilterSearch'));
export const FilterList = dynamic(() => import('./FilterList'));
