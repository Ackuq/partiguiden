import Container from "@components/common/container";
import PageTitle from "@components/common/page-title";

interface Props {
  params: {
    id: string;
    bet: string;
  };
}

export function generateMetadata({ params: { id, bet } }: Props) {
  return {
    title: `${id} ${bet} | Votering | Partiguiden`,
    description: `Hur har partiernat röstat i voteringen ${id}`,
  };
}

export default function Vote() {
  // TODO: Implement
  return (
    <main>
      <PageTitle></PageTitle>
      <Container></Container>
    </main>
  );
}
