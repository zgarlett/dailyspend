import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface Props<T> {
    data: T[];
    dimensions: Dimensions
}

interface Dimensions {
    width: number;
    height: number;
    margin: Margin;
}

interface Margin {
    top: number;
    right: number;
    bottom: number;
    left: number;
}
export function D3Graph<T>(props: Props<T>) {
    const { data, dimensions } = props;
    const svgRef = useRef(null);
    const { width, height, margin } = dimensions;
    const svgWidth = width + margin.left + margin.right;
    const svgHeight = height + margin.top + margin.bottom;
    React.useEffect(() => {
        const xScale = undefined; //d3.scaleTime().domain([ new Date("2019-07-15") , new Date("2020-03-30") ]).range([0, width]);
        const svgEl = d3.select(svgRef.current);
        const svg = svgEl
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
    }, [data]);
    return <svg ref={svgRef} width={svgWidth} height={svgHeight} />;
}