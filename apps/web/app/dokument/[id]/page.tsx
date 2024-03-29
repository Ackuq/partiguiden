import { twMerge } from "tailwind-merge";

import Container from "@components/common/container";
import PageTitle from "@components/common/page-title";
import SocialMediaShare from "@components/common/social-media-share";
import getDocumentHtml from "@lib/api/documents/get-document-html";

interface Props {
  params: {
    id: string;
  };
}

export default async function Document({ params: { id } }: Props) {
  const document = await getDocumentHtml(id);

  return (
    <main>
      <PageTitle>Dokument {id}</PageTitle>
      <Container>
        <SocialMediaShare title={`Dokument ${id}`} />
        <div
          dangerouslySetInnerHTML={{ __html: document }}
          className={twMerge(
            "dark:[&_*]:!border-slate-50 dark:[&_*]:!text-slate-50",
          )}
        />
      </Container>
    </main>
  );
}

export const runtime = "edge";

export function generateMetadata({ params: { id } }: Props) {
  return {
    title: `${id} | Dokument | Partiguiden`,
  };
}
