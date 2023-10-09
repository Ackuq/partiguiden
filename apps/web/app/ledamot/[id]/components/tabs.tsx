"use client";

import { Card } from "@components/common/card";
import type { MemberDocuments } from "@lib/api/member/types";
import { useState } from "react";
import Documents from "./documents";
import type { TwitterResult } from "@lib/api/wikidata/types";
import TwitterFeed from "./twitter-feed";

enum Tab {
  Document = "document-tab",
  Twitter = "twitter-tab",
}

interface Props {
  memberId: string;
  initialDocuments: MemberDocuments;
  twitterFeed?: TwitterResult;
}

export default function Tabs({
  memberId,
  initialDocuments,
  twitterFeed,
}: Props) {
  const [activeTab, setActiveTab] = useState(Tab.Document);

  function setTab(event: React.MouseEvent) {
    if ("id" in event.target) {
      setActiveTab(event.target.id as Tab);
    }
  }

  return (
    <Card className="overflow-visible p-0">
      <div className="flex" role="tablist">
        <button
          role="tab"
          aria-selected={activeTab === Tab.Document}
          id={Tab.Document}
          onClick={setTab}
          className="border-primary flex-1 py-4 aria-selected:border-b-2"
        >
          Dokument
        </button>
        <button
          role="tab"
          aria-selected={activeTab === Tab.Twitter}
          id={Tab.Twitter}
          onClick={setTab}
          className="border-primary flex-1 py-4 aria-selected:border-b-2"
        >
          Twitter-flöde
        </button>
      </div>
      {activeTab === Tab.Document && (
        <Documents initialDocuments={initialDocuments} memberId={memberId} />
      )}
      {activeTab === Tab.Twitter && <TwitterFeed twitterFeed={twitterFeed} />}
    </Card>
  );
}
