import { Card } from "@components/common/card";
import Typed from "@components/common/typed";
import Link from "next/link";
import { routes } from "@lib/navigation";
import PageTitle from "@components/common/page-title";
import Container from "@components/common/container";
import { twMerge } from "tailwind-merge";
import ResponsiveAd from "@components/ads/responsive-ad";

export const metadata = {
  title: "Partiguiden | Rösta rätt",
  description:
    "Vad tar Sveriges partier för ståndpunkter i sakfrågor? På Partiguiden kan du hitta och jämföra vad partierns åsikter för att hitta det parti du sympatiserar mest med.",
};

// TODO: Fetch this from google
const featured = [
  { id: "ekonomi-och-skatter", name: "Ekonomi och Skatter" },
  { id: "lag-och-ratt", name: "Lag och rätt" },
  { id: "migration-och-integration", name: "Migration och Integration" },
  { id: "miljo-och-klimat", name: "Miljö och klimat" },
];

export default function IndexPage() {
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
      <Container className="grid gap-4">
        <Card className="w-full">
          <h3 className="pb-4 text-center text-2xl sm:text-3xl">
            Vilket parti ska man rösta på?
          </h3>
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
            {featured.map((subject) => (
              <Link
                key={subject.id}
                href={routes.standpoint(subject.id)}
                className={twMerge(
                  "bg-background-elevated-light rounded py-3 shadow-md transition-opacity hover:opacity-70",
                  "dark:bg-background-elevated-dark-200 dark:shadow-slate-900",
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
