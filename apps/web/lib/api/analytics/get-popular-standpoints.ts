import type { protos } from "@google-analytics/data";
import { unstable_cache as cache } from "next/cache";
import initializeAnalyticsClient from "./utils/initialize-analytics-client";
import { getSubject } from "@partiguiden/party-data/reader";
import type { Subject } from "@partiguiden/party-data/types";

const GA4_PROPERTY = process.env.GA4_ANALYTICS_PROPERTY;

async function getPopularStandpoints() {
  if (!GA4_PROPERTY) {
    console.warn("No GA4 property set");
    return;
  }

  const client = initializeAnalyticsClient();
  if (!client) {
    return [];
  }
  const request: protos.google.analytics.data.v1beta.IRunReportRequest = {
    property: `properties/${GA4_PROPERTY}`,
    dimensions: [
      {
        name: "pagePathPlusQueryString",
      },
    ],
    metrics: [
      {
        name: "screenPageViews",
      },
    ],
    dateRanges: [
      {
        startDate: "30daysAgo",
        endDate: "today",
      },
    ],
    dimensionFilter: {
      filter: {
        fieldName: "pagePathPlusQueryString",
        stringFilter: {
          matchType: "BEGINS_WITH",
          value: "/standpunkter/",
        },
      },
    },
    orderBys: [
      {
        metric: {
          metricName: "screenPageViews",
        },
        desc: true,
      },
    ],
    limit: 4,
  };

  const [response] = await client.runReport(request);
  const standpointIds = [];
  for (const row of response.rows ?? []) {
    for (const value of row.dimensionValues ?? []) {
      const standpointId = value.value?.replace("/standpunkter/", "");
      if (standpointId) {
        standpointIds.push(standpointId);
      }
    }
  }

  const standpoints = standpointIds
    .map(getSubject)
    .filter((subject): subject is Subject => subject !== undefined);

  return standpoints;
}

export default cache(getPopularStandpoints, ["get-popular-standpoints"], {
  // Once per day
  revalidate: 60 * 60 * 24,
});
