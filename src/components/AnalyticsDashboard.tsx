import { analytics } from "@/utils/analytics";
import { BarChart, Card } from "@tremor/react";
import React from "react";

interface AnalyticsDashboardProps {
  avgVisitorsPerDay: string;
  amountVisitorsPerDay: number;
  timeSeriesPageView: Awaited<ReturnType<typeof analytics.retrieveDays>>;
}

const AnalyticsDashboard = ({
  avgVisitorsPerDay,
  amountVisitorsPerDay,
  timeSeriesPageView,
}: AnalyticsDashboardProps) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid w-full mx-auto grid-cols-1 sm:grid-cols-2 gap-6">
        <Card className="w-full mx-auto max-w-xs">
          <p className="text-tremor-default text-dark-tremor-content">
            Avg. visitors/day
          </p>
          <p className="text-3xl text-dark-tremor-content-strong font-semibold">
            {avgVisitorsPerDay}
          </p>
        </Card>
        <Card className="w-full mx-auto max-w-xs">
          <p className="text-tremor-default text-dark-tremor-content">
            Visits Today
          </p>
          <p className="text-3xl text-dark-tremor-content-strong font-semibold">
            {amountVisitorsPerDay}
          </p>
        </Card>
      </div>

      <Card>
        {timeSeriesPageView ? (
          <BarChart
            allowDecimals={false}
            showAnimation
            data={timeSeriesPageView.map((day) => ({
              name: day.date,
              Visitors: day.events.reduce((acc, curr) => {
                return acc + Object.values(curr)[0]!;
              }, 0),
            }))}
            categories={["Visitors"]}
            index="name"
          />
        ) : null}
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;
