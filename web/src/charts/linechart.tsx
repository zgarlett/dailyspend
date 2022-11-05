import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { appl } from './constants';

interface Props {
    data: any[];
    dimensions: Dimensions
}

interface PriceData {
    date: string;
    close: number;
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
export function LineChart(props: Props) {

    let dims = {
        marginTop: 20, // top margin, in pixels
        marginRight: 30, // right margin, in pixels
        marginBottom: 30, // bottom margin, in pixels
        marginLeft: 40, // left margin, in pixels
        width: 500, // outer width, in pixels
        height: 500, // outer height, in pixels
    }
    let inputs = {
        x: ([x]: any[]) => x, // given d in data, returns the (temporal) x-value
        y: ([, y]: any[]) => y, // given d in data, returns the (quantitative) y-value
        defined: (d: any[], i: number) => false, // for gaps in data
        curve: d3.curveLinear, // method of interpolation between points
        xType: d3.scaleUtc, // the x-scale type
        xDomain: undefined, // [xmin, xmax]
        xRange: [dims.marginLeft, dims.width - dims.marginRight], // [left, right]
        yType: d3.scaleLinear, // the y-scale type
        yDomain: undefined, // [ymin, ymax]
        yRange: [dims.height - dims.marginBottom, dims.marginTop], // [bottom, top]
        yFormat: '', // a format specifier string for the y-axis
        yLabel: '', // a label for the y-axis
        color: "currentColor", // stroke color of line
        strokeLinecap: "round", // stroke line cap of the line
        strokeLinejoin: "round", // stroke line join of the line
        strokeWidth: 1.5, // stroke width of line, in pixels
        strokeOpacity: 1, // stroke opacity of line

    }
    const isthi: boolean = false;
    const { data, dimensions } = props;
    const svgRef = useRef(null);
    const svgWidth = dims.width + dims.marginLeft + dims.marginRight;
    const svgHeight = dims.height + dims.marginTop + dims.marginBottom;
    const xDomain = d3.extent(appl, d => new Date(d.date)) as Date[];
    const yDomain = [d3.min(appl, d => d.close), d3.max(appl, d => d.close) as number] as number[];
    React.useEffect(() => {

        // Compute values.
        const X = d3.map(data, inputs.x);
        const Y = d3.map(data, inputs.y);
        const I = d3.range(X.length);
        if (inputs.defined === undefined) inputs.defined = (d, i) => !isNaN(X[i]) && !isNaN(Y[i]);
        const D = d3.map(data, inputs.defined);

        // Construct scales and axes.
        const xScale =  d3.scaleUtc().domain(xDomain).range(inputs.xRange);
        const yScale = d3.scaleLinear().domain(yDomain).range(inputs.yRange);
        const xAxis = d3.axisBottom(xScale).ticks(dims.width / 80).tickSizeOuter(0);
        const yAxis = d3.axisLeft(yScale).ticks(dims.height / 40, "↑ Daily close ($)");

        // Construct a line generator.
        // const line = d3.curveLinear().

        const svgEl = d3.select(svgRef.current);
        const svg = svgEl.append("g").attr("transform", `translate(${dims.marginLeft},${dims.marginTop})`);

    }, [data]);
    return <svg ref={svgRef} width={svgWidth} height={svgHeight} />;
}