import { PartyData } from '../types/party';
import { ResponsiveAd } from '../components/Ad';

import dynamic from 'next/dynamic';

const InformationCard = dynamic(() => import('../components/Party/InformationCard'));
const Leaders = dynamic(() => import('../components/Party/Leaders'));

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
