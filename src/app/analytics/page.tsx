import AnalyticsDashboard from "@/components/AnalyticsDashboard";
import { getDate } from "@/utils";
import { analytics } from "@/utils/analytics";
import React from "react";

const Analytics = async () => {
  const TRACKING_DAYS = 7;
  const pageView = await analytics.retrieveDays("pageview", TRACKING_DAYS);
  const totalPageViews = pageView.reduce(
    (prev, curr) =>
      prev + curr.events.reduce((a, b) => a + Object.values(b)[0]!, 0),
    0
  );

  const avgVisitorsPerDay = (totalPageViews / TRACKING_DAYS).toFixed(1);

  const amountVisitorsPerDay = pageView
    .filter((ev) => ev.date === getDate())
    .reduce(
      (prev, curr) =>
        prev + curr.events.reduce((a, b) => a + Object.values(b)[0]!, 0),
      0
    );
  return (
    <div className="min-h-screen w-full py-12 flex justify-center items-center">
      <div className="relative w-full max-w-6xl mx-auto text-white">
        <AnalyticsDashboard
          avgVisitorsPerDay={avgVisitorsPerDay}
          amountVisitorsPerDay={amountVisitorsPerDay}
          timeSeriesPageView={pageView}
        />
      </div>
    </div>
  );
};

export default Analytics;
