import { notFound } from "next/navigation";
import type { Party } from "@partiguiden/party-data/types";
import {
  getStandpointsForSubject,
  getSubject,
} from "@partiguiden/party-data/reader";
import { ERROR_404_TITLE } from "@lib/constants";
import PageTitle from "@components/page-title";
import PartyStandpoints from "./party-standpoints";
import { Divider } from "@components/common/divider";
import Link from "next/link";
import { routes } from "@lib/navigation";

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params: { id } }: PageProps) {
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

export default function Standpoints({ params: { id } }: PageProps) {
  const subject = getSubject(id);
  if (!subject) {
    return notFound();
  }

  const standpoints = getStandpointsForSubject(subject.id);

  return (
    <main>
      <PageTitle>{subject.name}</PageTitle>
      <div className="container mb-6 grid gap-4">
        {Object.entries(standpoints).map(([party, standpoints]) => (
          <PartyStandpoints
            key={party}
            party={party as Party}
            standpoints={standpoints}
          />
        ))}
        {subject.relatedSubjects.length > 0 && (
          <>
            <Divider />
            <div>
              <p className="text-primary mb-2 text-xl ">
                Relaterade sakområden
              </p>
              <ul className="text-primary list-inside list-disc">
                {subject.relatedSubjects.map((related) => (
                  <li key={related}>
                    <Link href={routes.standpoint(related)}>
                      {getSubject(related)?.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
