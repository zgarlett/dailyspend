/** MultilineChart.js */
import React from "react";
import * as d3 from "d3";
import { TopLevelData, Dimensions } from './maincharts';
import { BarData } from "./barwrapper";
interface Props {
    data: TopLevelData<BarData>[];
    dimensions: Dimensions;
}





export const BarChart = (props: Props) => {
    const { data, dimensions } = props;
    const svgRef = React.useRef(null);
    const { width, height, margin } = dimensions;
    const svgWidth = width + margin.left + margin.right;
    const svgHeight = height + margin.top + margin.bottom;
    const X = d3.map(data[0].items, (d, i) => d.letter);
    const Y = d3.map(data[0].items, (d, i) => d.frequency);
    let xDomain = new d3.InternSet(d3.groupSort(data[0].items, ([d]) => d.frequency, d => d.letter));
    const yDomain = [0, d3.max(Y)] as [number, number];
    const I = d3.range(X.length).filter(i => xDomain.has(X[i]));
    const marginBottom = 30;
    const marginTop = 20;
    const marginRight = 0;
    const marginLeft = 20;
    const xPadding = 0.2;
    const xRange = [height - marginBottom , marginTop]
    const xScale = d3.scaleBand().domain(xDomain).range(xRange).padding(xPadding);
    const yScale = d3.scaleLinear().domain(yDomain).range([height - marginBottom, marginTop])
    const xAxis = d3.axisBottom(xScale).tickSizeOuter(0);
    const yAxis = d3.axisLeft(yScale).ticks(height / 40, '%');
    React.useEffect(() => {

        const svgEl = d3.select(svgRef.current);
        svgEl.selectAll("*").remove(); // Clear svg content before adding new elements 
        svgEl
            .append("g")
            .attr("transform", `translate(${margin.left - 5},${margin.top})`)
            .call(yAxis)
            .call(g => g.select(".domain").remove())
            .call(g => g.selectAll(".tick line").clone()
                .attr("x2", width - marginLeft - marginRight)
                .attr("stroke-opacity", 0.1))
            .call(g => g.append("text")
                .attr("x", -marginLeft)
                .attr("y", 10)
                .attr("fill", "currentColor")
                .attr("text-anchor", "start")
                .text('Frequency'));

        const bar = svgEl.append("g")
            .attr("fill", "steelblue")
            .selectAll("rect")
            .data(I)
            .join("rect")
            .attr("x", i => xScale(X[i]) as number)
            .attr("y", i => yScale(Y[i]))
            .attr("height", i => yScale(0) - yScale(Y[i]))
            .attr("width", xScale.bandwidth());

        const formatValue = yScale.tickFormat(100, '%');
        // const title = (i: number) => `${X[i]}\n${formatValue(Y[i])}`;
        // if (title) bar.append("title")
        //     .text(title);

        svgEl.append("g")
            .attr("transform", `translate(0,${height - marginBottom})`)
            .call(xAxis);
    }, [data]); // Redraw chart if data changes

    return <svg ref={svgRef} width={svgWidth} height={svgHeight} />;
};