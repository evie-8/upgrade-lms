"use client";

import { ResponsiveBar } from "@nivo/bar";
import { Box, useTheme } from "@mui/material";
import { tokens } from "@/lib/token-colors";

const data = [
  {
    month: "Jan-24",
    "Course 1": 137,
    "Course 1 Color": "hsl(229, 70%, 50%)",
    "Course 2": 96,
    "Course 2 Color": "hsl(296, 70%, 50%)",
    "Course 3": 72,
    "Course 3 Color": "hsl(97, 70%, 50%)",
    "Course 4": 140,
    "Course 4 Color": "hsl(340, 70%, 50%)",
    "Course 5": 55,
    "Course 5 Color": "hsl(307, 70%, 50%)",
  },
  {
    month: "Feb-24",
    "Course 1": 55,
    "Course 1 Color": "hsl(307, 70%, 50%)",
    "Course 2": 28,
    "Course 2 Color": "hsl(111, 70%, 50%)",
    "Course 3": 58,
    "Course 3 Color": "hsl(273, 70%, 50%)",
    "Course 4": 29,
    "Course 4 Color": "hsl(275, 70%, 50%)",
    "Course 5": 109,
    "Course 5 Color": "hsl(72, 70%, 50%)",
  },
  {
    month: "Mar-24",
    "Course 1": 109,
    "Course 1 Color": "hsl(72, 70%, 50%)",
    "Course 2": 23,
    "Course 2 Color": "hsl(96, 70%, 50%)",
    "Course 3": 34,
    "Course 3 Color": "hsl(106, 70%, 50%)",
    "Course 4": 152,
    "Course 4 Color": "hsl(256, 70%, 50%)",
    "Course 5": 133,
    "Course 5 Color": "hsl(257, 70%, 50%)",
  },
  {
    month: "Apr-24",
    "Course 1": 133,
    "Course 1 Color": "hsl(257, 70%, 50%)",
    "Course 2": 52,
    "Course 2 Color": "hsl(326, 70%, 50%)",
    "Course 3": 43,
    "Course 3 Color": "hsl(110, 70%, 50%)",
    "Course 4": 83,
    "Course 4 Color": "hsl(9, 70%, 50%)",
    "Course 5": 81,
    "Course 5 Color": "hsl(190, 70%, 50%)",
  },
  {
    month: "May-24",
    "Course 1": 81,
    "Course 1 Color": "hsl(190, 70%, 50%)",
    "Course 2": 80,
    "Course 2 Color": "hsl(325, 70%, 50%)",
    "Course 3": 112,
    "Course 3 Color": "hsl(54, 70%, 50%)",
    "Course 4": 35,
    "Course 4 Color": "hsl(285, 70%, 50%)",
    "Course 5": 66,
    "Course 5 Color": "hsl(208, 70%, 50%)",
  },
  {
    month: "Jun-24",
    "Course 1": 66,
    "Course 1 Color": "hsl(208, 70%, 50%)",
    "Course 2": 111,
    "Course 2 Color": "hsl(334, 70%, 50%)",
    "Course 3": 167,
    "Course 3 Color": "hsl(182, 70%, 50%)",
    "Course 4": 18,
    "Course 4 Color": "hsl(76, 70%, 50%)",
    "Course 5": 80,
    "Course 5 Color": "hsl(87, 70%, 50%)",
  },
];

const BarChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <ResponsiveBar
      data={data}
      theme={{
        // added
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
      }}
      keys={["Course 1", "Course 2", "Course 3", "Course 4", "Course 5"]}
      indexBy="month"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "nivo" }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "months", // changed
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "sales", // changed
        legendPosition: "middle",
        legendOffset: -40,
      }}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      barAriaLabel={function (e) {
        return e.id + ": " + e.formattedValue + " in month: " + e.indexValue;
      }}
    />
  );
};

export default BarChart;
