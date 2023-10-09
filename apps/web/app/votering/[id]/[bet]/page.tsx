import BreadcrumbsSocialMediaShare from "@components/common/breadcrumbs-social-media-share";
import { Card } from "@components/common/card";
import Container from "@components/common/container";
import { Divider } from "@components/common/divider";
import PageTitle from "@components/common/page-title";
import getVote from "@lib/api/vote/get-vote";
import { routes } from "@lib/navigation";
import { notFound } from "next/navigation";
import TotalVote from "./total-vote";
import Link from "next/link";
import type { ProcessedDocument, VoteAppendixItem } from "@lib/api/vote/types";
import Accordion from "@components/common/accordion";
import VoteDistribution from "./vote-distribution";
import dynamic from "next/dynamic";

const ResponsiveAd = dynamic(() => import("@components/ads/responsive-ad"), {
  ssr: false,
});

interface Props {
  params: {
    id: string;
    bet: string;
  };
}

export function generateMetadata({ params: { id, bet } }: Props) {
  return {
    title: `${id} förslagpunkt ${bet} | Votering | Partiguiden`,
    description: `Hur har partiernat röstat i voteringen ${id} förslagspunkt ${bet}`,
  };
}

export default async function Vote({ params: { id, bet } }: Props) {
  const betNumber = parseInt(bet);
  if (Number.isNaN(betNumber)) {
    return notFound();
  }
  const vote = await getVote(id, betNumber);

  if (!vote) {
    return notFound();
  }

  return (
    <main>
      <PageTitle>
        {vote.title} förslagspunkt {betNumber}
      </PageTitle>
      <Container>
        <BreadcrumbsSocialMediaShare
          breadcrumbsProps={{
            current: `${id} förslagspunk ${betNumber}`,
            links: [{ href: routes.votes, title: "Voteringar" }],
          }}
          socialMediaProps={{
            title: `${id} förslagspunkt ${betNumber}`,
          }}
        />
        <ResponsiveAd className="mb-4" />
        <Card className="flex flex-col gap-2">
          <TotalVote voting={vote.voting.total} />
          <h4 className="text-xl sm:text-2xl">Utskottets förslag</h4>
          <p>{vote.propositionText}</p>
          <Divider />
          {vote.processedDocuments.length > 0 && (
            <>
              <Documents documents={vote.processedDocuments} />
              <Divider />
            </>
          )}
          <Accordion title="Röstfördelning">
            <VoteDistribution voting={vote.voting} />
          </Accordion>
          <Divider />
          <h4 className="text-xl sm:text-2xl">Beslut</h4>
          <p>{vote.decision}</p>
          <Divider />
          <h4 className="text-xl sm:text-2xl">Beslut i korthet</h4>
          <div
            dangerouslySetInnerHTML={{ __html: vote.description }}
            className="[&>p:not(:last-child)]:mb-4"
          />
          {vote.appendix && (
            <>
              <Divider />
              <Appendix documents={vote.appendix} />
            </>
          )}
        </Card>
        <ResponsiveAd className="mt-4" />
      </Container>
    </main>
  );
}

function Documents({ documents }: { documents: ProcessedDocument[] }) {
  return (
    <Accordion title="Behandlade dokument">
      <ul>
        {documents.map((document, index) => (
          <li key={document.id}>
            <Link
              href={routes.document(document.id)}
              className="text-primary-dark dark:text-primary-light ml-4"
            >
              [{index}] {document.label}
            </Link>
          </li>
        ))}
      </ul>
    </Accordion>
  );
}

function Appendix({ documents }: { documents: VoteAppendixItem[] }) {
  return (
    <>
      <h4 className="text-xl sm:text-2xl">Bilagor</h4>
      <div>
        {documents.map((document) => (
          <a
            className="text-primary-dark dark:text-primary-light"
            href={document.fil_url}
            key={document.fil_url}
            target="_blank"
            rel="noopener"
          >
            {document.titel} {document.dok_id}
          </a>
        ))}
      </div>
    </>
  );
}
