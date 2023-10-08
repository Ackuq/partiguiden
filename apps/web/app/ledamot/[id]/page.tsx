import getMember from "@lib/api/member/get-member";
// import getMembers from "@lib/api/member/get-members";
import { ERROR_404_TITLE } from "@lib/constants";
import { notFound } from "next/navigation";
import Profile from "./profile";
import BreadcrumbsSocialMediaShare from "@components/common/breadcrumbs-social-media-share";
import { routes } from "@lib/navigation";
import Container from "@components/common/container";
import Statistics from "./statistics";
import getMemberWithAbsence from "@lib/api/member/get-member-with-absence";
import getMemberDocuments from "@lib/api/documents/get-member-documents";
import Biography from "./biography";
import Tabs from "./tabs";
import getMemberTwitterFeed from "@lib/api/wikidata/get-member-twitter-feed";
import ResponsiveAd from "@components/ads/responsive-ad";

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params: { id } }: PageProps) {
  const member = await getMember(id);

  if (!member) {
    return {
      title: ERROR_404_TITLE,
    };
  }
  const memberName = `${member?.firstName ?? ""} ${
    member?.lastName ?? ""
  }`.trim();
  return {
    title: `${!!memberName ? `${memberName} |` : ""} Ledamot | Partiguiden`,
    description: `Här kan du ta reda på information om ledamot${
      !!memberName ? ` ${memberName}` : ""
    }. Se vilka dokument som hen har varit med och skapat och samt voteringsnärvaro.`,
  };
}

export default async function MemberPage({ params: { id } }: PageProps) {
  const memberPromise = getMemberWithAbsence(id);
  const memberDocumentsPromise = getMemberDocuments({ id, page: 1 });
  const memberTwitterPromise = getMemberTwitterFeed(id);
  const [member, memberDocuments, memberTwitter] = await Promise.all([
    memberPromise,
    memberDocumentsPromise,
    memberTwitterPromise,
  ]);

  if (!member) {
    return notFound();
  }

  return (
    <main>
      <Profile member={member} />
      <Container className="grid gap-4">
        <BreadcrumbsSocialMediaShare
          breadcrumbsProps={{
            current: `${member.firstName} ${member.lastName}`,
            links: [{ title: "Ledamöter", href: routes.members }],
          }}
          socialMediaProps={{
            title: `${member.firstName} ${member.lastName}`,
          }}
        />
        <Statistics
          absence={member.absence}
          documentCount={memberDocuments.count}
        />
        <Biography memberInformation={member.information} />
        <ResponsiveAd />
        <Tabs
          memberId={member.id}
          initialDocuments={memberDocuments}
          twitterFeed={memberTwitter.results.bindings[0]}
        />
      </Container>
    </main>
  );
}
