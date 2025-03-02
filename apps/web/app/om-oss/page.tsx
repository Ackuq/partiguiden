import { InformationCircleIcon } from "@heroicons/react/24/solid";

import { ResponsiveAd } from "@components/ads";
import { Card } from "@components/common/card";
import Container from "@components/common/container";
import ExternalLink from "@components/common/external-link";
import PageTitle from "@components/common/page-title";
import { githubFrontend, githubProfile, linkedIn } from "@lib/socials";

export const metadata = {
  title: "Om oss | Partiguiden",
  description:
    "Partiguiden erbjuder en platform där du kan jämföra vad olika partier tycker i sakfrågor för att det ska bli lättare att hitta det parti du sympatiserar med mest.",
};

export default function AboutUs() {
  return (
    <main>
      <PageTitle Icon={InformationCircleIcon}>Om oss</PageTitle>
      <Container>
        <Card className="mb-4 flex flex-col gap-3">
          <h2 className="text-2xl">Om Partiguiden</h2>
          <p>
            Denna tjänst är skapad och underhålls av Axel Pettersson (
            <ExternalLink href={linkedIn}>LinkedIn</ExternalLink>,{" "}
            <ExternalLink href={githubProfile}>GitHub</ExternalLink>
            ).
          </p>
          <p>
            Partiguiden skapades med syftet av att kunna erbjuda en plattform
            där man lätt kan kolla upp partiernas ståndpunkter i olika ämnen och
            sakfrågor. Under utvecklingen av hemsidan togs det hänsyn till
            begriplighet och användarvänlighet för att kunna erbjuda den bästa
            möjliga användarupplevensen.
          </p>
          <p>
            Utvecklingen av sidan påbörjades som ett fritidsprojekt år 2017 för
            att utveckla kunskaper inom webbutveckling.
          </p>
          <h3 className="text-xl">Datakällor</h3>
          <p>
            Informationen som presenteras på sidan är information från
            partiernas egna hemsidor samt information från{" "}
            <ExternalLink href="https://data.riksdagen.se/">
              Riksdagens öppna API
            </ExternalLink>
            . Viss data om partierna är tagen från{" "}
            <ExternalLink href="https://wikipedia.se/">Wikipedia</ExternalLink>.
            Dataunderlaget för opinionsundersökningar hämtas genom ett dataset
            som underhålls av Måns Magnusson och finns publikt på{" "}
            <ExternalLink href="https://github.com/MansMeg/SwedishPolls">
              GitHub
            </ExternalLink>
            .
          </p>
          <h3 className="text-xl">Annonser</h3>
          <p>
            I dagsläget är detta projekt finansierat av de annonser som visas på
            diverse delsidor. Annonserna hanteras av Google via deras
            annonssystem{" "}
            <ExternalLink href="https://www.google.com/adsense/start/">
              AdSense
            </ExternalLink>
            .
          </p>
          <h3 className="text-xl">Open source</h3>
          <p>
            För att kunna uppnå en god nivå av förtrående och transparans så är
            alla delar av detta projekt open source på GitHub, som du kan hitta
            på{" "}
            <ExternalLink href={githubFrontend}>{githubFrontend}</ExternalLink>.
          </p>
        </Card>
        <ResponsiveAd />
      </Container>
    </main>
  );
}
