import { BaseCard } from "@components/card";
import Container from "@components/common/container";
import PageTitle from "@components/common/page-title";
import { CodeBracketIcon } from "@heroicons/react/24/solid";

export const metadata = {
  title: "Cookie-policy | Partiguiden",
  description:
    "Partiguiden erbjuder en platform där du kan jämföra vad olika partier tycker i sakfrågor för att det ska bli lättare att hitta det parti du sympatiserar med mest.",
};

export default function CookiePolicy() {
  return (
    <>
      <PageTitle Icon={CodeBracketIcon}>Cookie-policy</PageTitle>
      <Container>
        <BaseCard className="grid gap-2">
          <p>
            Partiguiden använder webbkakor från Google för att kunna analysera
            användares interaktion med hemsidan i syftet att kunna
            vidareutveckla sidan.
          </p>
          <p>
            Informationen som delas är krypterad och helt anonym, vi kan alltså
            inte identifera användare.
          </p>
        </BaseCard>
      </Container>
    </>
  );
}
