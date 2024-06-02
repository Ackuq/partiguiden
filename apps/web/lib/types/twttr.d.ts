type TwttrTimelineSource =
  | {
      sourceType: "profile";
      screenName: string;
    }
  | {
      sourceType: "profile";
      userId: string;
    }
  | {
      sourceType: "list";
      ownerScreenName: string;
      slug: string;
    }
  | {
      sourceType: "list";
      id: string;
    }
  | {
      sourceType: "url";
      url: string;
    };

interface TwttrTimelineOptions {
  conversation?: "none" | "all";
  cards?: "hidden" | "visible";
  width?: number | "auto";
  height?: number | "auto";
  align?: "left" | "right" | "center";
  theme?: "light" | "dark";
  chrome?: string;
  tweetLimit?: number;
  borderColor?: string;
}

interface TwttrWidgets {
  // Reference: https://developer.x.com/en/docs/twitter-for-websites/javascript-api/guides/scripting-factory-functions
  createTimeline(
    source: TwttrTimelineSource,
    element: HTMLElement | null,
    options?: TwttrTimelineOptions,
  ): Promise<void>;
}

interface Twttr {
  widgets?: TwttrWidgets;
}

declare global {
  interface Window {
    twttr: Twttr;
  }
}

export {};
