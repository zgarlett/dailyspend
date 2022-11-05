import React from "react";
import { BalanceChart } from './balance';
import { zachData } from "./constants";
import { TopLevelData } from "./maincharts";

interface BalanceData {
    date: string;
    balance: number;
  }


const portfolioData = { name: "Portfolio", color: "#ffffff",weight: 1, items: zachData as BalanceData[]} as TopLevelData<BalanceData>;
const dimensions = {
    width: 350,
    height: 200,
    margin: { top: 10, right: 10, bottom: 20, left: 45 }
};

export function BChart() {
    return (
            <BalanceChart 
                data={[portfolioData]}
                dimensions={dimensions}
            />
    )
};