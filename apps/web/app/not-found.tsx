import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

import { Card } from "@components/common/card";
import Container from "@components/common/container";
import PageTitle from "@components/common/page-title";

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
        <Card>
          <p className="text-center text-lg">
            Sidan du letade har kanske blivit borttagen, eller skrev du in en
            felaktig URL.
          </p>
        </Card>
      </Container>
    </main>
  );
}
