const getAllMembers = ({ url }) => fetch(url).then(res => res.json());

export default getAllMembers;
