<template>
  <div id="container"></div>
</template>
<script>
import * as d3 from "d3";

export default {
  mounted: function() {
  	this.initChart()
  },

  methods: {
    initChart() {
      var svg_width = 400,
        svg_height = 400,
        data = [10, 20, 5, 9, 14];

      d3.select("#container")
      .append("svg")
      .attr("width",svg_width)
      .attr("height",svg_height)
      .attr("transform",`translate(${svg_width/2},${svg_height/2})`)
    }
  }
}
</script>
