const getPartyColor = char => {
  switch (char) {
    case 'Socialdemokraterna':
      return '#c0392b';
    case 'Moderaterna':
      return '#3a539b';
    case 'Sverigedemokraterna':
      return '#f4d03f';
    case 'Miljöpartiet':
      return '#26a65b';
    case 'Centerpartiet':
      return '#1e824c';
    case 'Liberalerna':
      return '#5c97bf';
    case 'Kristdemokraterna':
      return '#22a7f0';
    case 'Vänsterpartiet':
      return '#cf000f';
    default:
      return '';
  }
};

export default getPartyColor;
