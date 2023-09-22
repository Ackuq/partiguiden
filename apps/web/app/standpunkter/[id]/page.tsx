import { notFound } from "next/navigation";
import type { Party } from "@partiguiden/party-data/types";
import {
  getStandpointsForSubject,
  getSubject,
} from "@partiguiden/party-data/reader";
import { ERROR_404_TITLE } from "@lib/constants";
import PageTitle from "@components/page-title";
import PartyStandpoints from "./party-standpoints";

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
      <div className="container">
        <div className="grid gap-4">
          {Object.entries(standpoints).map(([party, standpoints]) => (
            <PartyStandpoints
              key={party}
              party={party as Party}
              standpoints={standpoints}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
