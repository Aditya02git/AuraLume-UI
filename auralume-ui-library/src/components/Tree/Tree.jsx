import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import './Tree.css';

const Tree = ({ 
  data, 
  width = 1200, 
  height = 800, 
  margin = { top: 40, right: 150, bottom: 40, left: 200 },
  nodeColors = {
    root: '#023ad9',
    geolocation: '#023ad9', 
    default: '#023ad9'
  },
  linkColor = '#023ad9',
  duration = 750,
  className = ''
}) => {
  const svgRef = useRef();
  const containerRef = useRef();
  
  useEffect(() => {
    if (!data) return;
    
    // Clear previous content
    d3.select(svgRef.current).selectAll("*").remove();
    
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    
    // Create SVG
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height);
      
    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
    
    let i = 0;
    
    // Create tree layout
    const treemap = d3.tree().size([innerHeight, innerWidth]);
    
    // Create hierarchy
    const root = d3.hierarchy(data, d => d.children);
    root.x0 = innerHeight / 2;
    root.y0 = 0;
    
    // Collapse after the first level
    if (root.children) {
      root.children.forEach(collapse);
    }
    
    // Collapse function
    function collapse(d) {
      if (d.children) {
        d._children = d.children;
        d._children.forEach(collapse);
        d.children = null;
      }
    }
    
    // Text wrapping function
    function wrap(text, width) {
      text.each(function() {
        const text = d3.select(this);
        const words = text.text().split(/\s+/).reverse();
        let word;
        let line = [];
        let lineNumber = 0;
        const lineHeight = 1.1;
        const y = text.attr("y");
        const dy = parseFloat(text.attr("dy"));
        let tspan = text.text(null).append("tspan")
          .attr("x", text.attr("x"))
          .attr("y", y)
          .attr("dy", dy + "em");
        
        while (word = words.pop()) {
          line.push(word);
          tspan.text(line.join(" "));
          if (tspan.node().getComputedTextLength() > width) {
            line.pop();
            tspan.text(line.join(" "));
            line = [word];
            tspan = text.append("tspan")
              .attr("x", text.attr("x"))
              .attr("y", y)
              .attr("dy", ++lineNumber * lineHeight + dy + "em")
              .text(word);
          }
        }
      });
    }
    
    // Update function
    function update(source) {
      const treeData = treemap(root);
      const nodes = treeData.descendants();
      const links = treeData.descendants().slice(1);
      
      // Normalize for fixed-depth
      nodes.forEach(d => { d.y = d.depth * 200; });
      
      // Update nodes
      const node = g.selectAll('g.node')
        .data(nodes, d => d.id || (d.id = ++i));
      
      // Enter new nodes
      const nodeEnter = node.enter().append('g')
        .attr('class', 'node')
        .attr("transform", () => `translate(${source.y0},${source.x0})`)
        .on('click', click);
      
      // Add circles
      nodeEnter.append('circle')
        .attr('class', 'node-circle')
        .attr('r', 1e-6)
        .style("fill", d => nodeColors[d.data.type] || nodeColors.default);
      
      // Add text labels
      nodeEnter.append('text')
        .attr("dy", ".35em")
        .attr("x", d => d.children || d._children ? -15 : 15)
        .attr("text-anchor", d => d.children || d._children ? "end" : "start")
        .attr("class", d => {
          if (d.data.type === "root") return "main-title";
          if (d.data.type === "geolocation") return "geolocation-title";
          return "detail-text";
        })
        .text(d => d.data.name)
        .each(function(d) {
          if (d.children || d._children) {
            d3.select(this).call(wrap, 200);
          }
        });
      
      // Update existing nodes
      const nodeUpdate = nodeEnter.merge(node);
      
      nodeUpdate.transition()
        .duration(duration)
        .attr("transform", d => `translate(${d.y},${d.x})`);
      
      nodeUpdate.select('circle.node-circle')
        .attr('r', d => {
          if (d.data.type === "root") return 8;
          if (d.data.type === "geolocation") return 6;
          return 4;
        })
        .style("fill", d => nodeColors[d.data.type] || nodeColors.default)
        .attr('cursor', 'pointer');
      
      // Remove exiting nodes
      const nodeExit = node.exit().transition()
        .duration(duration)
        .attr("transform", () => `translate(${source.y},${source.x})`)
        .remove();
      
      nodeExit.select('circle').attr('r', 1e-6);
      nodeExit.select('text').style('fill-opacity', 1e-6);
      
      // Update links
      const link = g.selectAll('path.link')
        .data(links, d => d.id);
      
      const linkEnter = link.enter().insert('path', "g")
        .attr("class", "link")
        .attr('d', () => {
          const o = { x: source.x0, y: source.y0 };
          return diagonal(o, o);
        });
      
      const linkUpdate = linkEnter.merge(link);
      
      linkUpdate.transition()
        .duration(duration)
        .attr('d', d => diagonal(d, d.parent));
      
      link.exit().transition()
        .duration(duration)
        .attr('d', () => {
          const o = { x: source.x, y: source.y };
          return diagonal(o, o);
        })
        .remove();
      
      // Store old positions
      nodes.forEach(d => {
        d.x0 = d.x;
        d.y0 = d.y;
      });
    }
    
    // Diagonal path function
    function diagonal(s, d) {
      return `M ${s.y} ${s.x}
              C ${(s.y + d.y) / 2} ${s.x},
                ${(s.y + d.y) / 2} ${d.x},
                ${d.y} ${d.x}`;
    }
    
    // Click handler
    function click(event, d) {
      if (d.children) {
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }
      update(d);
    }
    
    // Initial update
    update(root);
    
  }, [data, width, height, margin, nodeColors, linkColor, duration]);
  
  return (
    <div className={`tree-container ${className}`} ref={containerRef}>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default Tree;