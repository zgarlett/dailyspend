export {}
// /** MultilineChart.js */
// import React from "react";
// import * as d3 from "d3";
// import { TopLevelData, Dimensions } from './maincharts';
// import { BarData } from "./barwrapper";
// interface Props<T>{
//     data: TopLevelData<T[]>[];
//     dimensions: Dimensions;
//     x: ([x]: T[]) => typeof x;
//     y: ([,y]: T[]) => typeof y;
// }





// export const BarChart = <T extends unknown>(props: Props<T>) => {
//     const { data, dimensions,x , y } = props;
//     const svgRef = React.useRef(null);
//     const { width, height, margin } = dimensions;
//     const svgWidth = width + margin.left + margin.right;
//     const svgHeight = height + margin.top + margin.bottom;
//     const X = d3.map(data[0].items, x);
//     const Y = d3.map(data[0].items, y);
//     let xDomain = new d3.InternSet(d3.groupSort(data[0].items, ([d]) => -d.frequency, d => d.letter));
//     const yDomain = [0, ] as [number, number];
//     const I = d3.range(X.length).filter(i => xDomain.has(X[i]));
//     const marginBottom = 30;
//     const marginTop= 20;
//     const marginRight = 0;
//     const marginLeft = 40;
//     const xPadding = 0.1;
//     const xRange = [height - marginBottom, marginTop]
//     const xScale = d3.scaleBand(xDomain, xRange).padding(xPadding);
//     const yScale = d3.scaleLinear().domain(yDomain).range([height - marginBottom, marginTop])
//     const xAxis = d3.axisBottom(xScale).tickSizeOuter(0);
//     const yAxis = d3.axisLeft(yScale).ticks(height / 40, '%');
//     React.useEffect(() => {

//         const svgEl = d3.select(svgRef.current);
//         svgEl.selectAll("*").remove(); // Clear svg content before adding new elements 
//         const svg = svgEl
//             .append("g")
//             .attr("transform", `translate(${margin.left},${margin.top})`);

//     }, [data]); // Redraw chart if data changes

//     return <svg ref={svgRef} width={svgWidth} height={svgHeight} />;
// };