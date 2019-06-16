const getAllMembers = () =>
  fetch('https://data.riksdagen.se/personlista/?utformat=json').then(res => res.json());

export default getAllMembers;
