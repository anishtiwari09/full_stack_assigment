import React, { useEffect, useRef } from 'react'
import * as d3 from "d3";
const findMinAndMaxValue=(data)=>{
    console.log(data)
    let xMin=0
    let xMax=-Infinity
    let yMin=0
    let yMax=-Infinity
  
    for(let item of data){
        console.log(item[1])
        if(xMin>item[0]){
            xMin=item[0]
        }
        if(yMin>item[1]){
            yMin=item[1]
        }
        if(xMax<item[0]){
            xMax=item[0]
        }
        if(yMax<item[1]){
           
            yMax=item[1]
        }
    }
    return [xMin,xMax,yMin,yMax]
}
export default function GraphResult({dataset}) {
    const ref=useRef()
    const drawLineGraph=(dataset1)=>{


    // Step 3
    var svg = d3.select(ref.current),
        margin = 200,
        width = svg.attr("width") - margin, //300
        height = svg.attr("height") - margin //200
    // Step 4
   let [xMin,xMax,yMin,yMax]=findMinAndMaxValue(dataset1)
   console.log(xMin,xMax,yMin,yMax)
   let minValue=Math.min(xMin,yMin)
   let maxValue=Math.max(xMax,yMax)
    
    var xScale = d3.scaleLinear().domain([minValue, maxValue]).range([0, width]),
        yScale = d3.scaleLinear().domain([minValue, maxValue]).range([height, 0]);
        
    var g = svg.append("g")
        .attr("transform", "translate(" + 100 + "," + 100 + ")");

    // Step 5
    // Title
    svg.append('text')
    .attr('x', width/2 + 100)
    .attr('y', 100)
    .attr('text-anchor', 'middle')
    .style('font-family', 'Helvetica')
    .style('font-size', 20)
    .text('Result');
    
    // X label
    svg.append('text')
    .attr('x', width/2 + 100)
    .attr('y', height - 15 + 150)
    .attr('text-anchor', 'middle')
    .style('font-family', 'Helvetica')
    .style('font-size', 12)
    .text('Attempt');
    
    // Y label
    svg.append('text')
    .attr('text-anchor', 'middle')
    .attr('transform', 'translate(60,' + height + ')rotate(-90)')
    .style('font-family', 'Helvetica')
    .style('font-size', 12)
    .text('Score');

    // Step 6
    g.append("g")
     .attr("transform", "translate(0," + height + ")")
     .call(d3.axisBottom(xScale));
    
    g.append("g")
     .call(d3.axisLeft(yScale));
    
    // Step 7
    svg.append('g')
    .selectAll("dot")
    .data(dataset1)
    .enter()
    .append("circle")
    .attr("cx", function (d) { return xScale(d[1]); } )
    .attr("cy", function (d) { return yScale(d[0]); } )
    .attr("r", 3)
    .attr("transform", "translate(" + 100 + "," + 100 + ")")
    .style("fill", "#CC0000");

    // Step 8        
    var line = d3.line()
    .x(function(d) { return xScale(d[1]); }) 
    .y(function(d) { return yScale(d[0]); }) 
    .curve(d3.curveMonotoneX)
    
    svg.append("path")
    .datum(dataset1) 
    .attr("class", "line") 
    .attr("transform", "translate(" + 100 + "," + 100 + ")")
    .attr("d", line)
    .style("fill", "none")
    .style("stroke", "#CC0000")
    .style("stroke-width", "2");
    console.log('kdk')
    }
useEffect(()=>{
 drawLineGraph(dataset)
},[])
  return (
    <div style={{
        display:"flex",
      
        margin:20,
        justifyContent:"center"
    }}
   
    >
  <svg width="500" height="400" id="svg"  ref={ref}></svg>
    </div>
  )
}
