import React from "react";
import { BarChart } from "./barchart";
import { barData } from "./constants";
import { TopLevelData } from "./maincharts";

export interface BarData {
    letter: string;
    frequency: number;
}


const data = { name: "Portfolio", color: "#ffffff", weight: 1, items: barData as BarData[] } as TopLevelData<BarData>;
const dimensions = {
    width: 475,
    height: 500,
    margin: { top: 0, right: 0, bottom: 20, left: 35 }
};

export function BarWrapper() {
    return (
        <BarChart
            data={[data]}
            dimensions={dimensions}
        />
    )
};