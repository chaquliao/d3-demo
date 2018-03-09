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
      var svg_width = 500,
        svg_height = 500,
        data = [{
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
        }];
      var values = data.map(item => {
        return item.value
      });
      var fills = data.map(item => {
        return item.fill
      });

      var pie = d3.pie();
      var pieData = pie(values)
      console.log(pieData)
      var outerRadius = 150; //外半径
      var innerRadius = 50; //内半径，为0则中间没有空白

      var arc = d3.arc() //弧生成器
        .innerRadius(innerRadius) //设置内半径
        .outerRadius(outerRadius); //设置外半径

      // var color = d3.scale.category20();

      var svg = d3.select("#container")
        .append("svg")
        .attr("width", svg_width)
        .attr("height", svg_height)

      var arcs = svg.selectAll("g")
        .data(pieData)
        .enter()
        .append("g")
        .attr("transform", `translate(${svg_width/2},${svg_height/2})`)

      arcs.append("path")
        .attr("fill", function(d,i){
        	return fills[i]
        })
        .attr("d", function(d) {
          return arc(d);
        });



    }
  }
}
</script>
