import { notFound } from "next/navigation";

import { ResponsiveAd } from "@components/ads";
import { Card } from "@components/common/card";
import Container from "@components/common/container";
import { Divider } from "@components/common/divider";
import ExternalLink from "@components/common/external-link";
import PageTitle from "@components/common/page-title";
import SocialMediaShare from "@components/common/social-media-share";
import PartyIcon from "@components/party/icon";
import { getParty } from "@lib/api/party/get-party";
import { ERROR_404_TITLE } from "@lib/constants";
import { Party } from "@partiguiden/party-data/types";
import { partyNames } from "@partiguiden/party-data/utils";

import Leader from "./leader";

type Params = Promise<{
  party: Lowercase<Party>;
}>;

interface PageProps {
  params: Params;
}

export default async function PartyPage({ params }: PageProps) {
  const { party: partyAbbreviationLowercase } = await params;

  const partyAbbreviation =
    partyAbbreviationLowercase.toLocaleUpperCase() as Party;
  if (!Object.values(Party).includes(partyAbbreviation)) {
    return notFound();
  }
  const party = await getParty(partyAbbreviation);

  return (
    <main>
      <PageTitle
        Icon={() => (
          <PartyIcon
            className="mx-auto mb-2 h-12 w-12 sm:h-16 sm:w-16"
            sizes="(min-width: 640px) 64px, 48px"
            party={partyAbbreviation}
          />
        )}
      >
        {party.name}
      </PageTitle>
      <Container className="flex flex-col gap-4">
        <SocialMediaShare title={party.name} />
        <Card className="flex flex-col gap-3">
          {party.website && (
            <>
              <div>
                <h2 className="text-xl">Hemsida</h2>
                <ExternalLink href={party.website}>
                  {party.website}
                </ExternalLink>
              </div>
              <Divider />
            </>
          )}
          <div>
            <h2 className="text-xl">Ideologi</h2>
            <p>{party.ideology.join(", ")}</p>
            <span className="text-xs">
              Källa{" "}
              <ExternalLink href="https://www.wikipedia.org/">
                https://www.wikipedia.org/
              </ExternalLink>
            </span>
          </div>
          <Divider />
          <div>
            <h2 className="text-xl">Biografi</h2>
            <div
              className="[&>p]:my-2"
              dangerouslySetInnerHTML={{ __html: party.abstract }}
            />
            <span className="text-xs">
              Källa:{" "}
              <ExternalLink href="https://www.wikipedia.org/">
                https://www.wikipedia.org/
              </ExternalLink>
            </span>
          </div>
        </Card>
        <ResponsiveAd />
        <Card>
          <h3 className="mb-4 text-center text-2xl">Ledning</h3>
          <div
            className={`grid grid-cols-2 gap-2 sm:grid-cols-3 ${
              party.leaders.length > 3 ? "md:grid-cols-4" : ""
            }`}
          >
            {party.leaders.map((leader) => (
              <Leader key={leader.id} leader={leader} />
            ))}
          </div>
        </Card>
        <ResponsiveAd />
      </Container>
    </main>
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { party: partyAbbreviation } = await params;

  const party = partyAbbreviation.toUpperCase() as Party;

  if (!Object.values(Party).includes(party)) {
    return { title: ERROR_404_TITLE };
  }

  const partyName = partyNames[party];

  return {
    title: `${partyName} | Party | Partiguiden`,
    description: `Vilka är ${partyName} och vad är deras ideologi? Läs på om dem här!`,
  };
}

export const dynamicParams = false;

export function generateStaticParams() {
  const parties = Object.values(Party);

  return parties.map((party) => ({
    party: party.toLocaleLowerCase(),
  }));
}
