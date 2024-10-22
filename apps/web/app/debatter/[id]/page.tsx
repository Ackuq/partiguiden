import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ResponsiveAd } from "@components/ads";
import BreadcrumbsSocialMediaShare from "@components/common/breadcrumbs-social-media-share";
import { Card } from "@components/common/card";
import Container from "@components/common/container";
import { Divider } from "@components/common/divider";
import PageTitle from "@components/common/page-title";
import getDebate from "@lib/api/debates/get-debate";
import { routes } from "@lib/navigation";

import Statement from "./statement";

type Params = Promise<{
  id: string;
}>;

interface Props {
  params: Params;
}

export default async function DebatePage({ params }: Props) {
  const { id } = await params;

  const debate = await getDebate(id);

  if (!debate) {
    return notFound();
  }

  return (
    <main>
      <PageTitle>{debate.title}</PageTitle>
      <Container>
        <BreadcrumbsSocialMediaShare
          breadcrumbsProps={{
            links: [{ href: routes.debates, title: "Debatter" }],
            current: debate.id,
          }}
          socialMediaProps={{ title: `Debatt ${debate.id}` }}
        />
        <ResponsiveAd />
        <Card className="my-4 flex flex-col gap-4">
          <iframe
            src={debate.webTVUrl}
            className="mx-auto h-[400px] w-full sm:h-[342px] sm:w-[576px] md:h-[360px] md:w-[640px] 2xl:h-[540px] 2xl:w-[960px]"
            allowFullScreen={true}
            title={`${debate.type} ${debate.date} från Riksdagen om ${debate.title}`}
          />

          {debate.statements.length > 0 && (
            <>
              <Divider />
              <h3 className="text-lg sm:text-xl">Debatt i text</h3>
              <ul className="flex flex-col gap-4">
                {debate.statements.map((statement) => (
                  <Statement
                    key={statement.number}
                    isSender={statement.speakerId === debate.senderId}
                    speaker={debate.speakers[statement.speakerId]}
                    statement={statement}
                  />
                ))}
              </ul>
            </>
          )}
        </Card>
        <ResponsiveAd />
      </Container>
    </main>
  );
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;

  const { id } = params;

  const debate = await getDebate(id);
  if (!debate) {
    return {};
  }

  return {
    title: `${debate.title} | Debatt | Partiguiden`,
    description: `Här kan du ta reda på information om debatt ${debate.id}.`,
  };
}
