"use client";
import { Chart } from "react-google-charts";

export function AdminPieChart({ tours }) {
  const hardTours = tours.filter((tour) => tour.difficulty == "difficult");
  const mediumTours = tours.filter((tour) => tour.difficulty == "medium");
  const easyTours = tours.filter((tour) => tour.difficulty == "easy");

  const data = [
    ["task", "difficulty level"],
    ["difficult", Number(hardTours.length)],
    ["medium", Number(mediumTours.length)],
    ["easy", Number(easyTours.length)],
  ];

  const options = {
    title: "Tours Difficulty",
    is3D: true,
    titleTextStyle: {
      color: "black",
      fontName: "Helvetica",
      fontSize: 20,
      bold: true,
      italic: true,
    },
    legend: { position: "bottom", textStyle: { color: "blue", fontSize: 16 } },
  };
  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"400px"}
    />
  );
}
