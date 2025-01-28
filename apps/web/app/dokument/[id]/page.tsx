import { twMerge } from "tailwind-merge";

import Container from "@components/common/container";
import PageTitle from "@components/common/page-title";
import SocialMediaShare from "@components/common/social-media-share";
import getDocumentHtml from "@lib/api/documents/get-document-html";
import { getDocumentJson } from "@lib/api/documents/get-document-json";

type Params = Promise<{
  id: string;
}>;

interface Props {
  params: Params;
}

export default async function Document({ params }: Props) {
  const { id } = await params;

  const [html, data] = await Promise.all([
    getDocumentHtml(id),
    getDocumentJson(id),
  ]);

  return (
    <main>
      <PageTitle>
        {data.id}: {data.title}
      </PageTitle>
      <Container>
        <SocialMediaShare title={`${data.id}: ${data.title}`} />
        <div
          dangerouslySetInnerHTML={{ __html: html }}
          className={twMerge("dark:**:border-slate-50! dark:**:text-slate-50!")}
        />
      </Container>
    </main>
  );
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;

  const data = await getDocumentJson(id);
  return {
    title: `${data.id}: ${data.title} | Dokument | Partiguiden`,
  };
}
