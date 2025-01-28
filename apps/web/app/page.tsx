import Link from "next/link";
import { twMerge } from "tailwind-merge";

import { ResponsiveAd } from "@components/ads";
import { Card } from "@components/common/card";
import Container from "@components/common/container";
import PageTitle from "@components/common/page-title";
import Typed from "@components/common/typed";
import getPopularStandpoints from "@lib/api/analytics/get-popular-standpoints";
import { routes } from "@lib/navigation";

export const metadata = {
  title: "Partiguiden | Rösta rätt",
  description:
    "Vad tar Sveriges partier för ståndpunkter i sakfrågor? På Partiguiden kan du hitta och jämföra vad partierns åsikter för att hitta det parti du sympatiserar mest med.",
};

export default async function IndexPage() {
  const popular = await getPopularStandpoints();

  return (
    <main>
      <PageTitle>
        Hur vill Sveriges partier förbättra
        <br />
        <Typed
          strings={["miljön?", "jämlikheten?", "vården?", "Sverige?"]}
          typeSpeed={100}
          backSpeed={50}
          showCursor={false}
        />
        &nbsp;
      </PageTitle>
      <Container className="flex flex-col gap-4">
        <Card className="w-full">
          <h2 className="pb-4 text-center text-2xl sm:text-3xl">
            Vilket parti ska man rösta på?
          </h2>
          <p>
            Vilket parti ska man rösta på? Och vad tycker partierna egentligen?
            På Partiguiden kan du läsa om vad partierna tycker enligt sina
            partiprogram och samt se hur de röstar i riksdagsvoteringar.
          </p>
        </Card>
        <Card>
          <h3 className="pb-4 text-center text-2xl sm:text-3xl">
            Mest besökta ämnen de senaste 30 dagarna
          </h3>
          <div className="grid gap-3 text-center sm:grid-cols-2 sm:gap-6">
            {popular?.map((subject) => (
              <Link
                key={subject.id}
                href={routes.standpoint(subject.id)}
                className={twMerge(
                  "rounded-sm bg-slate-100 py-3 shadow-md transition-opacity hover:opacity-70",
                  "dark:bg-slate-700 dark:shadow-slate-900",
                )}
              >
                {subject.name}
              </Link>
            ))}
          </div>
        </Card>
        <ResponsiveAd />
      </Container>
    </main>
  );
}
