<!-- //index.vue -->
<template>
  <div>
    <div id="container">
    </div>
  </div>
</template>
<script>
import * as d3 from "d3";

export default {
  name: 'indexP',
  data() {
    return {}
  },

  mounted: function() {
    var vm = this;
    this.initChart()

    window.onresize = function() {
      d3.select("svg").remove()
      vm.initChart()
    }
  },

  methods: {
    initChart() {
      var width = d3.select("#container")._parents[0].clientWidth - 50,
        height = 600,
        margin = {
          left: 50,
          top: 30,
          right: 20,
          bottom: 20
        },
        g_width = width - margin.left - margin.right,
        g_height = height - margin.top - margin.bottom;

      //在html的元素里面增加一个svg

      var container = d3.select("#container")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("background", "white")

      //在svg里面增加另外的元素
      var g = d3.select("svg")
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`)

      var data = [1, 5, 2, 8, 3, 7, 0];

      var scale_x = d3.scaleLinear() //x轴缩放
        .domain([0, data.length - 1]) //输入范围
        .range([0, g_width]) //输出范围

      var scale_y = d3.scaleLinear() //y轴缩放
        .domain([0, d3.max(data)]) //输入范围
        .range([g_height, 0]) //输出范围

      var line_generator = d3.line() //线性图表
        .x(function(d, i) {
          return scale_x(i)
        }) //d是数组 i是数组的index
        .y(function(d) {
          return scale_y(d)
        })
        .curve(d3.curveCardinal);

      var area_generator = d3.area() //面积图表
        .x(function(d, i) {
          return scale_x(i)
        }) //d是数组 i是数组的index
        .y0(g_height)
        .y1(function(d) {
          return scale_y(d)
        })
        .curve(d3.curveCardinal);

      d3.select("g")
        .append("path")
        .attr("d", area_generator(data))
        .style("fill", "steelblue");

      var x_axis = d3.axisBottom(scale_x),
        y_axis = d3.axisLeft(scale_y);

      g.append("g")
        .call(x_axis)
        .attr("transform", `translate(0,${g_height})`)

      g.append("g")
        .call(y_axis)

    }
  }
}
</script>
<style>
#container {
  height: 250px;
  background: #fff;
}

path {
  fill: none;
  stroke: steelblue;
  stroke-width: 2px;
}

.domain {
  stroke: gray;
}
</style>
