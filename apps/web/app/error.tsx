"use client";

import { PrimaryButton } from "@components/button";
import { Card } from "@components/card";
import Container from "@components/common/container";
import PageTitle from "@components/common/page-title";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

export default function Error500({ reset }: { reset: () => void }) {
  return (
    <main>
      <PageTitle Icon={ExclamationCircleIcon}>500 - Något gick snett</PageTitle>
      <Container className="flex flex-col items-center gap-6">
        <Card>
          <p className="text-center text-lg">
            Något gick snett med denna förfrågan, men oroa dig inte, vi kollar
            på problemet och försöker få det löst så snabbt som möjligt!
          </p>
        </Card>
        <PrimaryButton className="max-w-[20rem]" onClick={() => reset()}>
          Försök förfrågan igen
        </PrimaryButton>
      </Container>
    </main>
  );
}
