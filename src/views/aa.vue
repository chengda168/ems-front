<template>
  <div>
    <div class="container device">
      <div class="deviceLeft">
        <div class="deviceLeft_box">
          <div class="node" :data-img="img1">
              <img  :src="img1">
          </div>
         <div class="node" :data-img="img2">
              <img  :src="img2">
          </div>
          <div class="node" :data-img="img3">
              <img  :src="img3">
          </div>
        </div>
        <button id="save" @click="onSave">生成画布</button>
      </div>
      <div id="deviceRight">
        <div id="main"></div>
      </div>
    </div>
    <div class="myChart" ref="myChart1"></div>
  </div>
</template>
<script>
import geoJson from "../assets/js/china.json";
import "jquery-ui-dist/jquery-ui";
import html2canvas from "html2canvas";
export default {
  data() {
    return {
      geoJson: {},
      img1: require("@/assets/images/img1.png"),
      img2: require("@/assets/images/img2.png"),
      img3: require("@/assets/images/img3.png"),
      img4: require("@/assets/images/line1.png"),
      close: require("@/assets/images/close.png"),
      text: "详情页面哈哈哈哈哈",
    };
  },
  methods: {
    echartsInit1() {
      // 找到容器
      let myChart = this.$echarts.init(this.$refs.myChart1);
      let geoJson1 = this.geoJson;
      this.$echarts.registerMap("china", geoJson1);
      var geoCoordMap = {
        台湾: [121.5135, 25.0308],
        黑龙江: [127.9688, 45.368],
        内蒙古: [110.3467, 41.4899],
        吉林: [125.8154, 44.2584],
        北京: [116.4551, 40.2539],
        辽宁: [123.1238, 42.1216],
        河北: [114.4995, 38.1006],
        天津: [117.4219, 39.4189],
        山西: [112.3352, 37.9413],
        陕西: [109.1162, 34.2004],
        甘肃: [103.5901, 36.3043],
        宁夏: [106.3586, 38.1775],
        青海: [101.4038, 36.8207],
        新疆: [87.9236, 43.5883],
        西藏: [91.11, 29.97],
        四川: [103.9526, 30.7617],
        重庆: [108.384366, 30.439702],
        山东: [117.1582, 36.8701],
        河南: [113.4668, 34.6234],
        江苏: [118.8062, 31.9208],
        安徽: [117.29, 32.0581],
        湖北: [114.3896, 30.6628],
        浙江: [119.5313, 29.8773],
        福建: [119.4543, 25.9222],
        江西: [116.0046, 28.6633],
        湖南: [113.0823, 28.2568],
        贵州: [106.6992, 26.7682],
        云南: [102.9199, 25.4663],
        广东: [113.12244, 23.009505],
        广西: [108.479, 23.1152],
        海南: [110.3893, 19.8516],
        上海: [121.4648, 31.2891],
      };
      var data = [
        { name: "北京", value: 199 },
        { name: "内蒙古", value: 47 },
        { name: "黑龙江", value: 123 },
        { name: "上海", value: 24 },
        { name: "安徽", value: 109 },
        { name: "福建", value: 116 },
        { name: "河南", value: 137 },
        { name: "重庆", value: 91 },
        { name: "新疆", value: 180 },
      ];
      var convertData = function () {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i].name];
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value),
            });
          }
        }
        return res;
      };

      function provinceData(){
        var res = [];
        for(let key  in geoCoordMap){
          res.push({
            name: key,
            value: geoCoordMap[key],
          });
        }
        return res;
      }

      let option = {
        backgroundColor: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 1,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "#0f378f", // 0% 处的颜色
            },
            {
              offset: 1,
              color: "#00091a", // 100% 处的颜色
            },
          ],
          globalCoord: false, // 缺省为 false
        },
        tooltip: {
          trigger: "item",
          formatter: function (params) {
            console.log(params)
            if(params.seriesName !='气泡' && params.seriesName !='散点'){
               if ( params.value ) {
                return params.name + " : " + params.value;
              } else {
                return params.name
              }
            }
            
          },
        },
        visualMap: {
          show: false,
          min: 0,
          max: 600,
          left: "left",
          top: "bottom",
          text: ["高", "低"], // 文本，默认为数值文本
          calculable: true,
          seriesIndex: [1],
          inRange: {},
        },
        geo: {
          map: "china",
          show: true,
          roam: true,
          label: {
            normal: {
              show: true,
              textStyle: {
                color: "#fff",
              },
            },
            emphasis: {
              show: true,
              textStyle: {
                color: "#fff",
              },
            },
          },
          itemStyle: {
            normal: {
              areaColor: "#3a7fd5",
              borderColor: "#0a53e9", //线
              shadowColor: "#092f8f", //外发光
              shadowBlur: 20,
            },
            emphasis: {
              areaColor: "#0a2dae", //悬浮区背景
              shadowColor: "red", //外发光
            },
          },
        },
        // tooltip: {},
        series: [
          {
            type: "map",
            map: "china",
            geoIndex: 0,
            aspectScale: 1, //长宽比
            showLegendSymbol: false, // 存在legend时显示
            label: {
              normal: {
                show: false,
              },
              emphasis: {
                show: false,
                textStyle: {
                  color: "#fff",
                },
              },
            },
            roam: true,
            itemStyle: {
              normal: {
                areaColor: "#031525",
                borderColor: "green",
              },
              emphasis: {
                areaColor: "#2B91B7",
              },
            },
            animation: false,
            data: data,
          },
          {
            name: '散点',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            rippleEffect: {
                brushType: 'fill'
            },
            itemStyle: {
                normal: {
                    color: '#F4E925',
                    shadowBlur: 10,
                    shadowColor: '#333'
                }
            },
            
            data: provinceData(),
            symbolSize: [10, 10],
            showEffectOn: 'render', //加载完毕显示特效
        },
          {
            name: "气泡",
            type: "scatter",
            coordinateSystem: "geo",
            symbol: "pin",
            symbolSize: [40, 40],
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: "#000",
                  fontSize: 9,
                },
                formatter(value) {
                  return value.data.value[2];
                },
              },
            },
            itemStyle: {
              normal: {
                color: "red", //标志颜色
              },
            },
            data: convertData(),
            showEffectOn: "render",
            rippleEffect: {
              brushType: "stroke",
            },
            hoverAnimation: true,
            zlevel: 1,
          },
        ],
      };
      // 开始渲染
      myChart.setOption(option);
    },
    drag() {
      $(".deviceLeft .deviceLeft_box").children().draggable({
        helper: "clone",
        scope: "zlg",
      });

      let self = this;
      var i = 0;
      $("#main").droppable({
        scope: "zlg",
        drop: function (event, ui) {
          var left = parseInt(ui.offset.left - $(this).offset().left);
          var top = parseInt(ui.offset.top - $(this).offset().top);
          var img = ui.draggable[0].dataset.img;
          i++;
          var id = "chart-img" + i;
          $(this).append('<div class="node  server"  style="position: absolute;" id="' + id + '"  data-id=" " ><img src="'+img+'"></div>');
          console.log($(this));
          $("#" + id).css("left", left).css("top", top);
          jsPlumb.addEndpoint(id, { anchors: "Top" }, hollowCircle);
          jsPlumb.addEndpoint(id, { anchors: "Right" }, hollowCircle);
          jsPlumb.addEndpoint(id, { anchors: "Bottom" }, hollowCircle);
          jsPlumb.addEndpoint(id, { anchors: "Left" }, hollowCircle);
          jsPlumb.draggable(id);
          jsPlumb.makeTarget(id, {
            anchor: "Continuous",
          });
          $("#" + id).draggable({ containment: "parent", grid: [10, 10] });
          self.doubleclick("#" + id);
        },
      });

     


        var hollowCircle = {
            endpoint: ["Dot", { radius: 5 }],
            connectorStyle: {
                lineWidth: 2,
                strokeStyle: "#61b8d0",
            },
            connectorHoverStyle: {
                lineWidth: 2,
                strokeStyle: "green",
            },
            paintStyle: {
              fillStyle: "#ccc",
              radius: 10,
              lineWidth: 6,
          },
            hoverPaintStyle: {
                fillStyle: "#aaa",
            },
            isSource: true,
            connector: ["Bezier", { stub: [40, 60], gap: 10, cornerRadius: 5, alwaysRespectStubs: true }],
            isTarget: true,
            maxConnections: -1,
            connectorOverlays: [
                ["Arrow", { width: 10, length: 20, location: 1, id: "arrow" }],
                ["Custom", {
                    create: function (component) {
                        return $('<span style="background:#fff;position:relative;z-index:999;cursor:pointer;">单击输入</span>');
                    },
                    location: 0.5,
                    id: "customOverlay",
                }],
            ],
        };
      // 悬浮显示关闭按钮
      $("#main").on("mouseenter", ".node", function () {
        $(this).append(
          '<img  style="position:absolute;width:12px" class="closeIcon" src="' + self.close + '" />'
        );
        $(".closeIcon").css("right", -10).css("top", -10);
      });
      // 移除关闭按钮
      $("#main").on("mouseleave", ".node", function () {
            $(".closeIcon").remove();
      });
      $("#main").on("click", ".closeIcon", function () {
            if (confirm("确定删除此节点吗?")) {
                jsPlumb.removeAllEndpoints($(this).parent().attr("id"));
                $(this).parent().remove();
            }
        });

        $("#deviceRight").on("click", "._jsPlumb_overlay", function () {
          var that = $(this);
          that.removeClass("_jsPlumb_overlay");
          var text = that.text();
          that.html("");
          that.append('<input type="text" id="myDropDown" value="' + text + '" />');
          $("#myDropDown").blur(function () {
            that.html($("#myDropDown").val());
            that.addClass("_jsPlumb_overlay");
          });
          return false;
        });
        jsPlumb.bind("dblclick", function (conn, originalEvent) {
            if (confirm("确定删除此连线吗？"))
                jsPlumb.detach(conn);
        });
        jsPlumb.bind("beforeDrop", function (info) {
          if (info.sourceId == info.targetId) {
            return false;
          }
          return true;
        });
    },
    doubleclick(id) {
      $(id).dblclick(function () {
                var text =  $(this).children("span").text();
                $(this).children("input").remove();
                $(this).children("span").remove();
                $(this).append('<input style="width:100%" type="text" class="note" value="' + text + '" />');
                $(this).mouseleave(function () {
                    let val = JSON.parse(JSON.stringify($(this).children("input").val()));
                    $(this).children("input").remove();
                    $(this).append('<span style="width:100%"  class="note" >'+val+'</span>');
                });
            });
    },
    onSave() {
      html2canvas(document.querySelector("#main"), {
        allowTaint: true,
        backgroundColor: "#fff",
      }).then((canvas) => {
        $("#main").html(canvas);
        $("._jsPlumb_endpoint").css("display",'none')
      });
    },
  },

  mounted() {
    this.geoJson = geoJson;
    this.echartsInit1();
    this.drag();
    
  },
};
</script>

<style >
.myChart {
  width: 100%;
  height: 1000px;
  margin: 0 auto;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
h1,
h2,
h3,
h4,
h5,
h6,
a,
p,
label,
ul,
li,
label,
span {
  margin: 0;
  padding: 0;
  font-family: "微软雅黑";
}
a,
a:active,
a:focus,
a:hover {
  text-decoration: none;
}
.clear {
  clear: both;
}
body {
  background: #fff;
}
html,
body {
  height: 100%;
}

.container {
  display: flex;
}
.device .deviceLeft {
  width: 242px;
  height: 100%;
  border-right: 1px solid #ccc;
  overflow: auto;
}
.device .deviceLeft h3 {
  padding-left: 10px;
  font-size: 14px;
  background: #ddd;
  line-height: 36px;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}
.device .deviceLeft .deviceLeft_box {
  overflow: hidden;
  padding: 10px 0;
}
.device .deviceLeft .deviceLeft_box .node {
  user-select: none;
   width: 50px;
  height: auto;
  float: left;
  margin: 5px;
}
.device .node {
  width: 50px;
  height: auto;
  text-align: right;
  cursor: pointer;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  z-index: 90;
}
.device .node input,
.device .node span{
    position: absolute;
    top: 0;
    right: 0;
}
.device .node span{
    color: red;
}
.device #deviceRight {
  position: relative;
  width: calc(100% - 242px);
  height: 400px;
  border: 1px solid red;
  box-sizing: border-box;
}
.device #myDropDown {
  width: 80px;
  margin-left: -14px;
  border: 1px solid #ccc;
  text-align: center;
}
.device #main {
  width: 100%;
  height: 100%;
}
.nodeInput {
  width: 110px !important;
  height: 60px !important;
  border: 1px solid #ccc;
}
input {
  text-align: right;
}
</style>
