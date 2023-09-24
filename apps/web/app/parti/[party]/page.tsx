import { BaseCard } from "@components/card";
import Container from "@components/common/container";
import { Divider } from "@components/common/divider";
import ExternalLink from "@components/common/external-link";
import PageTitle from "@components/common/page-title";
import SocialMediaShare from "@components/common/social-media-share";
import PartyIcon from "@components/party/icon";
import { partyController } from "@lib/api/controllers/party";
import { ERROR_404_TITLE } from "@lib/constants";
import { Party } from "@partiguiden/party-data/types";
import { getPartyName } from "@partiguiden/party-data/utils";
import { notFound } from "next/navigation";
import Leader from "./leader";

interface PageProps {
  params: {
    party: Party;
  };
}

export async function generateMetadata({ params: { party } }: PageProps) {
  if (!Object.values(Party).includes(party)) {
    return { title: ERROR_404_TITLE };
  }

  const partyName = getPartyName(party);

  return {
    title: `${partyName} | Party | Partiguiden`,
    description: `Vilka är ${partyName} och vad är deras ideologi? Läs på om dem här!`,
  };
}

export default async function PartyPage({
  params: { party: partyAbbreviation },
}: PageProps) {
  if (!Object.values(Party).includes(partyAbbreviation)) {
    return notFound();
  }
  const party = await partyController(partyAbbreviation);

  return (
    <main>
      <PageTitle
        Icon={() => (
          <PartyIcon className="mx-auto" size={50} party={partyAbbreviation} />
        )}
      >
        {party.name}
      </PageTitle>
      <Container className="grid gap-4">
        <SocialMediaShare title={party.name} />
        <BaseCard className="grid gap-3">
          {party.website && (
            <>
              <div>
                <h5 className="text-xl">Hemsida</h5>
                <ExternalLink href={party.website}>
                  {party.website}
                </ExternalLink>
              </div>
              <Divider />
            </>
          )}
          <div>
            <h5 className="text-xl">Ideologi</h5>
            <p>{party.ideology.join(", ")}</p>
            <span className="text-xs">
              Källa{" "}
              <ExternalLink href="https://www.wikipedia.org/">
                Wikipedia
              </ExternalLink>
            </span>
          </div>
          <Divider />
          <div>
            <h5 className="text-xl">Biografi</h5>
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
        </BaseCard>
        <BaseCard>
          <h4 className="mb-4 text-center text-2xl">Ledning</h4>
          <div
            className={`grid grid-cols-2 gap-2 sm:grid-cols-3 ${
              party.leaders.length > 3 ? "md:grid-cols-4" : ""
            }`}
          >
            {party.leaders.map((leader) => (
              <Leader key={leader.id} leader={leader} />
            ))}
          </div>
        </BaseCard>
      </Container>
    </main>
  );
}
