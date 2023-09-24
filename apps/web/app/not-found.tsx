import { BaseCard } from "@components/card";
import Container from "@components/common/container";
import PageTitle from "@components/common/page-title";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

export const metadata = {
  title: "404 | Sidan hittades inte | Partiguiden",
};

export default function Error404() {
  return (
    <main>
      <PageTitle Icon={ExclamationCircleIcon}>
        404 - Sidan hittades inte
      </PageTitle>
      <Container>
        <BaseCard>
          <p className="text-center text-lg">
            Sidan du letade har kanske blivit borttagen, eller skrev du in en
            felaktig URL.
          </p>
        </BaseCard>
      </Container>
    </main>
  );
}
