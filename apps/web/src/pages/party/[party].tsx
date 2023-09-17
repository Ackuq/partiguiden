import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import Head from "next/head";
import Image from "next/image";

import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";

import { PARTY_LOGOS } from "../../assets/logos";
import type { PartyAbbreviation } from "../../utils/parties";
import { partyAbbreviations } from "../../utils/parties";
import type { PartyData } from "../../types/party";
import { partyController } from "../../api/controllers/parties";
import PageTitle from "../../components/PageTitle";
import Party from "../../containers/Party";
import SocialMediaShare from "../../components/BreadcrumbsSocialMediaShare/SocialMediaShare";
import parties from "../../utils/getParties";

const IconContainer = styled("div")(
  ({ theme }) => `
  margin-left: auto;
  margin-right: auto;
  position: relative;
  height: 75px;
  width: 75px;
  ${theme.breakpoints.up("sm")} {
    width: 90px;
    height: 90px;
  }
  ${theme.breakpoints.up("md")} {
    width: 100px;
    height: 100px;
  }
  ${theme.breakpoints.up("lg")} {
    width: 115px;
    height: 115px;
  }
`,
);

const PartyPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  party,
}) => {
  const PartyLogo: React.FC = () => (
    <IconContainer>
      <Image
        src={PARTY_LOGOS[party.abbrev.toUpperCase() as PartyData["abbrev"]]}
        fill
        alt="Party logo"
      />
    </IconContainer>
  );
  const title = `${party.name} | Parti | Partiguiden`;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content={`Vilka är ${party.name} och vad är deras ideologi? Läs på om dem här!`}
        />
      </Head>
      <PageTitle variant="h3" title={party.name} Icon={PartyLogo} />
      <Container>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
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
    !partyAbbreviations.includes(
      partyAbbrev.toLocaleUpperCase() as PartyAbbreviation,
    )
  ) {
    return { notFound: true };
  }

  const party = await partyController(
    partyAbbrev.toLowerCase() as Lowercase<PartyAbbreviation>,
  );

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
