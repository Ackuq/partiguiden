"use client";

import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

import { PrimaryButton } from "@components/common/button";
import { Card } from "@components/common/card";
import Container from "@components/common/container";
import PageTitle from "@components/common/page-title";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to Sentry
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="sv">
      <body>
        <main>
          <PageTitle Icon={ExclamationCircleIcon}>
            500 - Något gick snett
          </PageTitle>
          <Container className="flex flex-col items-center gap-6">
            <Card>
              <p className="text-center text-lg">
                Något gick snett med denna förfrågan, men oroa dig inte, vi
                kollar på problemet och försöker få det löst så snabbt som
                möjligt!
              </p>
            </Card>
            <PrimaryButton className="max-w-[20rem]" onClick={() => reset()}>
              Försök förfrågan igen
            </PrimaryButton>
          </Container>
        </main>
      </body>
    </html>
  );
}
