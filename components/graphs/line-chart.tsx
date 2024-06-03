"use client"
import { ResponsiveLine, ResponsiveLineCanvas } from "@nivo/line";
import { Box, useTheme } from "@mui/material";
import { tokens } from "@/lib/token-colors";

const data = [
    {
      id: "Course 1",
      color: "hsl(284, 70%, 50%)",
      data: [
        { x: "Jun-23", y: 147 },
        { x: "Jul-23", y: 118 },
        { x: "Aug-23", y: 114 },
        { x: "Sep-23", y: 216 },
        { x: "Oct-23", y: 71 },
        { x: "Nov-23", y: 55 },
        { x: "Dec-23", y: 63 },
        { x: "Jan-24", y: 288 },
        { x: "Feb-24", y: 243 },
        { x: "Mar-24", y: 44 },
        { x: "Apr-24", y: 35 },
        { x: "May-24", y: 40 }
      ]
    },
    {
      id: "Course 2",
      color: "hsl(238, 70%, 50%)",
      data: [
        { x: "Jun-23", y: 201 },
        { x: "Jul-23", y: 245 },
        { x: "Aug-23", y: 214 },
        { x: "Sep-23", y: 58 },
        { x: "Oct-23", y: 136 },
        { x: "Nov-23", y: 281 },
        { x: "Dec-23", y: 146 },
        { x: "Jan-24", y: 191 },
        { x: "Feb-24", y: 180 },
        { x: "Mar-24", y: 36 },
        { x: "Apr-24", y: 178 },
        { x: "May-24", y: 276 }
      ]
    },
    {
      id: "Course 3",
      color: "hsl(72, 70%, 50%)",
      data: [
        { x: "Jun-23", y: 268 },
        { x: "Jul-23", y: 43 },
        { x: "Aug-23", y: 29 },
        { x: "Sep-23", y: 251 },
        { x: "Oct-23", y: 221 },
        { x: "Nov-23", y: 248 },
        { x: "Dec-23", y: 254 },
        { x: "Jan-24", y: 210 },
        { x: "Feb-24", y: 173 },
        { x: "Mar-24", y: 47 },
        { x: "Apr-24", y: 278 },
        { x: "May-24", y: 28 }
      ]
    },
    {
      id: "Course 4",
      color: "hsl(296, 70%, 50%)",
      data: [
        { x: "Jun-23", y: 172 },
        { x: "Jul-23", y: 114 },
        { x: "Aug-23", y: 245 },
        { x: "Sep-23", y: 179 },
        { x: "Oct-23", y: 194 },
        { x: "Nov-23", y: 244 },
        { x: "Dec-23", y: 197 },
        { x: "Jan-24", y: 53 },
        { x: "Feb-24", y: 8 },
        { x: "Mar-24", y: 137 },
        { x: "Apr-24", y: 190 },
        { x: "May-24", y: 89 }
      ]
    },
    {
      id: "Course 5",
      color: "hsl(53, 70%, 50%)",
      data: [
        { x: "Jun-23", y: 23 },
        { x: "Jul-23", y: 31 },
        { x: "Aug-23", y: 117 },
        { x: "Sep-23", y: 230 },
        { x: "Oct-23", y: 47 },
        { x: "Nov-23", y: 71 },
        { x: "Dec-23", y: 124 },
        { x: "Jan-24", y: 97 },
        { x: "Feb-24", y: 135 },
        { x: "Mar-24", y: 121 },
        { x: "Apr-24", y: 44 },
        { x: "May-24", y: 73 }
      ]
    }
];
const LineChart = ({ isDashboard = false, xlabel = 'revenue', ylabel='months' }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box >
   
    <Box height="50vh">

    <ResponsiveLine
      data={data}
      theme={{
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
        tooltip: {
          container: {
            color: colors.primary[500],
          },
        },
      }}
      colors={isDashboard ? { datum: "color" } : { scheme: "nivo" }} // added
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      lineWidth={2}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : ylabel, 
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickValues: 7,
        tickSize: 3,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : xlabel, 
        legendOffset: -40,
        legendPosition: "middle",
        
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={6}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "top",
          direction: "row",
          justify: false,
          translateX: 14,
          translateY: -38,
          itemsSpacing: 19,
          itemDirection: "left-to-right",
          itemWidth: 100,
          
          itemHeight: 40,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
             
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      
    />
    </Box>
    </Box>
  );
};

export default LineChart;