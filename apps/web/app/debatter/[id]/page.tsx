import BreadcrumbsSocialMediaShare from "@components/common/breadcrumbs-social-media-share";
import Container from "@components/common/container";
import PageTitle from "@components/common/page-title";
import { routes } from "@lib/navigation";

interface Props {
  params: {
    id: string;
  };
}

export default function DebatePage({ params: { id } }: Props) {
  return (
    <main>
      <PageTitle>Debatt angående {id}</PageTitle>
      <Container>
        <BreadcrumbsSocialMediaShare
          breadcrumbsProps={{
            links: [{ href: routes.debates, title: "Debatter" }],
            current: id,
          }}
          socialMediaProps={{ title: `Debatt ${id}` }}
        />
      </Container>
    </main>
  );
}

export function generateMetadata({ params: { id } }: Props) {
  return {
    title: `${id} | Debatt | Partiguiden`,
    description: `Här kan du ta reda på information om debatt ${id}.`,
  };
}
