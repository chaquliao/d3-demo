<template>
  <div style="width: 100%;height: 800px">
    <div id="container" style="margin: 30 30"></div>
    <div id="container2"></div>
  </div>
</template>
<script>
import * as d3 from "d3"
export default {
  name: "histogram",
  mounted: function() {
    var vm = this;
    this.initChart();
    window.onresize = function() {
      d3.select("svg").remove()
      vm.initChart()
    }
  },
  methods: {
    initChart() {
      var data = [{
          value: 1,
          label: "rass",
          fill: "steelblue"
        }, {
          value: 5,
          label: "core",
          fill: "#C1CDCD"
        }, {
          value: 2,
          label: "leap",
          fill: "#FFD39B"
        }, {
          value: 2,
          label: "chongqing",
          fill: "#FF7256"
        }, {
          value: 8,
          label: "chengdu",
          fill: "#9BCD9B"
        }, {
          value: 12,
          label: "hangzhou",
          fill: "steelblue"
        }],
        bar_padding = 10,
        svg_width = d3.select("#container")._parents[0].clientWidth - 50,
        bar_width = svg_width / data.length - bar_padding,
        svg_height = 600;

      var values = data.map(item => {
        return item.value
      })

      var labels = data.map(item => {
        return item.label
      })

      var tooltip = d3.select("#container2")
        .append("div")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("display", "none")

      var svg = d3.select("#container")
        .append("svg")
        .attr("width", svg_width + 50)
        .attr("height", 650)

      var bar = svg.selectAll("g")
        .data(data)
        .enter()
        .append("g")
        .attr("transform", function(d, i) {
          return `translate(${i*(bar_width+bar_padding)+20},20)`
        })

      var x = d3.scaleBand().range([0, svg_width]);
      var scale_x = x.domain(labels);

      var scale_y = d3.scaleLinear()
        .domain([0, d3.max(values)])
        .range([svg_height, 0]);

      var rect = bar.append("rect")
        .attr("y", function(d) {
          return scale_y(d.value)
        })
        .attr("width", bar_width)
        .attr("fill", function(d) {
          return d.fill
        })
        .on("click", function(d, i) {
          d3.select(this)
            .transition()
            .duration(5000)
            .attr("fill", "#000")
        })
        .on("mouseover", function(d) {
          return tooltip.style("display", "block");
        })
        .on("mousemove", function(d) {
          return tooltip.style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px")
            .html(`<div class="tooltip-container">data is ${d.value}</div>`)
            .style("display", "block");
        })
        .on("mouseout", function(d) {
          return tooltip.style("display", "none");
        })
        .transition()
        .attr("height", function(d) {
          return svg_height - scale_y(d.value)
        })

      var x_axis = d3.axisBottom(scale_x),
        y_axis = d3.axisRight(scale_y)
        .tickSize(svg_width);

      svg.append("g")
        .attr("transform", `translate(20,${svg_height+20})`)
        .call(d3.axisBottom(scale_x))

      svg.append("g")
        .attr("transform", "translate(20,20)")
        .call(customYAxis)

      function customXAxis(g) {
        g.call(x_axis);
      }

      function customYAxis(g) {
        g.call(y_axis);
        g.select(".domain").remove();
        g.selectAll(".tick:not(:first-of-type) line").attr("stroke", "#777").attr("stroke-dasharray", "2,2");
        g.selectAll(".tick text").attr("x", -8).attr("dy", -4);
      }
    }
  }
}
</script>
<style>
.test-rect-1 {
  fill: #ffed00;
}

.test-rect-2 {
  fill: steelblue;
}

.tooltip-container {
  width: 130px;
  height: 120px;
  background: white;
  margin-left: 5px;
  border: 1px solid black;
  border-radius: 4px
}

.tooltip-container:before {
  content: '';
  display: block;
  position: absolute;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  top: 10px;
  left: -5px;
  border-right: 10px solid #333333;
}
</style>
