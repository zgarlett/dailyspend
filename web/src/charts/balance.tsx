/** MultilineChart.js */
import React from "react";
import * as d3 from "d3";
import { TopLevelData, Dimensions, JsonData } from './maincharts';
interface BalanceData {
  date: string;
  balance: number;
}
interface Props {
  data: TopLevelData<BalanceData>[];
  dimensions: Dimensions;
}

export const BalanceChart = (props: Props) => {
  const { data, dimensions } = props;
  const svgRef = React.useRef(null);
  const { width, height, margin } = dimensions;
  const svgWidth = width + margin.left + margin.right + 300;
  const svgHeight = height + margin.top + margin.bottom + 40;
  const xDomain = d3.extent(data[0].items, (d: BalanceData) => new Date(d.date)) as [Date, Date];
  const yMin = (d3.min(data[0].items, (d) => d.balance) as number) - 50;
  const yMax = (d3.max(data[0].items, (d) => d.balance) as number) + 50;
  React.useEffect(() => {
    const xScale = d3.scaleTime()
      .domain([xDomain[0], xDomain[1].setDate(xDomain[1].getDate() + 10)])
      .range([0, width + 200]);
    const yScale = d3.scaleLinear()
      .domain([yMin, yMax + 200])
      .range([height, 0]);
    // Create root container where we will append all other chart elements
    const svgEl = d3.select(svgRef.current);
    svgEl.selectAll("*").remove(); // Clear svg content before adding new elements 
    const svg = svgEl
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
    // Add X grid lines with labels
    const xAxis = d3.axisBottom(xScale)
      .ticks(40)
      .tickSize(-height + margin.bottom - 20);
    const xAxisGroup = svg.append("g")
      .attr("transform", `translate(0, ${height + - margin.bottom + 25})`)
      .call(xAxis);
    xAxisGroup.select(".domain").remove();
    xAxisGroup.selectAll("line").attr("stroke", "rgba(255, 255, 255, 0.2)");
    xAxisGroup.selectAll("text")
      .attr("opacity", 0.7)
      .attr("color", "white")
      .attr("font-size", "0.5rem")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-65)");
    // Add Y grid lines with labels
    const yAxis = d3.axisLeft(yScale)
      .ticks(10)
      .tickSize(-width - 200)
      .tickFormat((val) => `$ ${val}`);
    const yAxisGroup = svg.append("g").call(yAxis);
    yAxisGroup.select(".domain").remove();
    yAxisGroup.selectAll("line").attr("stroke", "rgba(255, 255, 255, 0.2)");
    yAxisGroup.selectAll("text")
      .attr("opacity", 0.5)
      .attr("color", "white")
      .attr("font-size", "0.75rem");
    // Draw the lines
    const line = d3.line<BalanceData>()
      .x((d, i) => xScale(new Date(d.date)))
      .y((d, i) => yScale(d.balance));
    svg.selectAll(".line")
      .data(data)
      .enter()
      .append("path")
      .attr("fill", "none")
      .attr("stroke", (d, i) => d.color)
      .attr("stroke-width", (d, i) => d.weight)
      .attr("d", (d) => line(d.items));
  }, [data]); // Redraw chart if data changes

  return <svg ref={svgRef} width={svgWidth} height={svgHeight} />;
};