import Link from "next/link";
import { notFound } from "next/navigation";

import { ResponsiveAd } from "@components/ads";
import BreadcrumbsSocialMediaShare from "@components/common/breadcrumbs-social-media-share";
import Container from "@components/common/container";
import { Divider } from "@components/common/divider";
import PageTitle from "@components/common/page-title";
import { ERROR_404_TITLE } from "@lib/constants";
import { routes } from "@lib/navigation";
import {
  getStandpointsForSubject,
  getSubject,
  getSubjects,
} from "@partiguiden/party-data/reader";
import type { Party } from "@partiguiden/party-data/types";

import PartyStandpoints from "./party-standpoints";

type Params = Promise<{
  id: string;
}>;

interface PageProps {
  params: Params;
}

export default async function Standpoints({ params }: PageProps) {
  const { id } = await params;

  const subject = getSubject(id);
  if (!subject) {
    return notFound();
  }

  const standpoints = getStandpointsForSubject(subject.id);

  return (
    <main>
      <PageTitle>{subject.name}</PageTitle>
      <Container className="flex flex-col gap-4">
        <BreadcrumbsSocialMediaShare
          breadcrumbsProps={{
            links: [{ href: routes.standpoints, title: "Ståndpunkter" }],
            current: subject.name,
          }}
          socialMediaProps={{
            title: subject.name,
          }}
        />
        {Object.entries(standpoints).map(([party, standpoints]) => (
          <PartyStandpoints
            key={party}
            party={party as Party}
            standpoints={standpoints}
          />
        ))}
        <ResponsiveAd />
        {subject.relatedSubjects.length > 0 && (
          <>
            <Divider />
            <div>
              <p className="text-teal-700 dark:text-teal-200 mb-2 text-xl">
                Relaterade sakområden
              </p>
              <ul className="text-teal-700 dark:text-teal-200 list-inside list-disc">
                {subject.relatedSubjects.map((related) => (
                  <li key={related}>
                    <Link
                      href={routes.standpoint(related)}
                      className="hover:underline"
                    >
                      {getSubject(related)?.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </Container>
    </main>
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;

  const subject = getSubject(id);

  if (!subject) {
    return {
      title: ERROR_404_TITLE,
    };
  }

  return {
    title: `${subject.name} | Ämne | Partiguiden`,
    description: `Vad tar Sveriges partier för ståndpunkter inom sakområdet ${subject.name}? Här hittar du informationen du behöver för att kunna jämföra och hitta det parti du sympatiserar med mest!`,
  };
}

export const dynamicParams = false;

export function generateStaticParams() {
  const subjects = getSubjects();

  return subjects.map((subject) => ({
    id: subject.id,
  }));
}
