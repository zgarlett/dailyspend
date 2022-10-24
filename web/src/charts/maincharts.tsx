import React from "react";
import MultilineChart from "./multid3";
import schc from "../assets/SCHC.json";
import vcit from "../assets/VCIT.json";
import portfolio from "../assets/portfolio.json";

export interface Dimensions {
    width: number;
    height: number;
    margin: Margin;
  }
  export interface Margin {
    top: number;
    right: number;
    bottom: number;
    left: number;
  }
  
  export interface JsonData {
    date: string;
    marketValue?: number;
    value: number;
  }
  
  export interface TopLevelData {
    name: string;
    color: string;
    weight: number;
    items: JsonData[];
  }

const portfolioData = { name: "Portfolio", color: "#ffffff",weight: 1, items: portfolio as JsonData[]} as TopLevelData;
const schcData = { name: "SCHC", color: "#d53e4f",weight: 3, items: schc as JsonData[]} as TopLevelData;
const vcitData = { name: "VCIT", color: "#5e4fa2",weight: 1, items: vcit as JsonData[]} as TopLevelData;
const dimensions = {
    width: 600,
    height: 300,
    margin: { top: 30, right: 30, bottom: 30, left: 60 }
};

export default function MainChart() {
    return (
        <div className="App">
            <MultilineChart
                data={[portfolioData, schcData, vcitData]}
                dimensions={dimensions}
            />
        </div>
    )
};