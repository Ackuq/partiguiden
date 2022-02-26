import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import Container from '@mui/material/Container';

import SocialMediaShare from '../../components/BreadcrumbsSocialMediaShare/SocialMediaShare';
import { PartyData } from '../../types/party';
import parties from '../../utils/getParties';
import PageTitle from '../../components/PageTitle';
import Party from '../../containers/Party';
import { PARTY_LOGOS } from '../../assets/logos';
import { PartyAbbreviation, partyAbbreviations } from '../../utils/parties';
import { partyController } from '../../api/controllers/parties';

const PartyPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ party }) => {
  const PartyLogo: React.FC = () => (
    <Image
      src={PARTY_LOGOS[party.abbrev.toUpperCase() as PartyData['abbrev']]}
      quality={50}
      width="90%"
      height="90%"
      alt="Party logo"
    />
  );

  return (
    <>
      <Head>
        <title>{party.name} | Parti | Partiguiden</title>
        <meta
          name="description"
          content={`Vilka är ${party.name} och vad är deras ideologi? Läs på om dem här!`}
        />
      </Head>
      <PageTitle variant="h3" title={party.name} Icon={PartyLogo} />
      <Container>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <SocialMediaShare title={party.name} />
        </div>
        <Party party={party} />
      </Container>
    </>
  );
};

export const getStaticProps: GetStaticProps<
  {
    party: PartyData;
  },
  { party: string }
> = async ({ params }) => {
  const partyAbbrev = params?.party;

  if (
    partyAbbrev === undefined ||
    !partyAbbreviations.includes(partyAbbrev.toLocaleUpperCase() as PartyAbbreviation)
  ) {
    return { notFound: true };
  }

  const party = await partyController(partyAbbrev.toLowerCase() as Lowercase<PartyAbbreviation>);

  return {
    props: { party: { ...party, abbrev: partyAbbrev as PartyAbbreviation } },
    revalidate: 518400,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const partyAbbrevs = parties.map((party) => party.letter.toLocaleLowerCase());
  const paths = partyAbbrevs.map((party) => ({ params: { party } }));

  return { paths, fallback: false };
};

export default PartyPage;
