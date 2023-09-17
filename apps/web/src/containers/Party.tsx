import { PartyData } from '../types/party';
import { ResponsiveAd } from '../components/Ad';

import InformationCard from '../components/Party/InformationCard';
import Leaders from '../components/Party/Leaders';

interface Props {
  party: PartyData;
}

const Party: React.FC<Props> = ({ party }) => {
  return (
    <>
      <InformationCard party={party} />
      <Leaders party={party} />
      <ResponsiveAd />
    </>
  );
};

export default Party;
