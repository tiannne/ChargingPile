/* Home页的mock数据 */
export default {
 getHomeData: () => {
  return {
   code: 200,
   data: {
    tableData: [
     {
      name: "站点A",
      todayMA: 2,
      monthMA: 2,
      totalMA: 9,
     },
     {
      name: "站点B",
      todayMA: 2,
      monthMA: 3,
      totalMA: 16,
     },
     {
      name: "站点C",
      todayMA: 1,
      monthMA: 5,
      totalMA: 17,
     },
     {
      name: "站点D",
      todayMA: 0,
      monthMA: 2,
      totalMA: 7,
     },
     {
      name: "站点E",
      todayMA: 1,
      monthMA: 2,
      totalMA: 9,
     },
     {
      name: "站点F",
      todayMA: 1,
      monthMA: 1,
      totalMA: 1,
     },
     {
      name: "站点G",
      todayMA: 2,
      monthMA: 5,
      totalMA: 17,
     },
     {
      name: "站点A",
      todayMA: 2,
      monthMA: 2,
      totalMA: 9,
     },
     {
      name: "站点B",
      todayMA: 2,
      monthMA: 3,
      totalMA: 16,
     },
     {
      name: "站点C",
      todayMA: 1,
      monthMA: 5,
      totalMA: 17,
     },
     {
      name: "站点D",
      todayMA: 0,
      monthMA: 2,
      totalMA: 7,
     },
     {
      name: "站点E",
      todayMA: 1,
      monthMA: 2,
      totalMA: 9,
     },
     {
      name: "站点F",
      todayMA: 1,
      monthMA: 1,
      totalMA: 1,
     },
     {
      name: "站点G",
      todayMA: 2,
      monthMA: 5,
      totalMA: 17,
     },
    ]
   }
  }
 },
 getCountData: () => {
  return {
   code: 200,
   data:{
    cardData: [
     {
      name:"今日维修数量",
      value:17,
      icon:"Briefcase",
      color:"#2ec7c9"
     },
     {
      name:"今日报修数量",
      value:12,
      icon:"List",
      color:"#ffb980"
     },
     {
      name:"今日未维修数量",
      value:4,
      icon:"Failed",
      color:"#5ab1ee"
     },
     {
      name:"昨日维修数量",
      value:37,
      icon:"Briefcase",
      color:"#2eceee"
     },
     {
      name:"昨日报修数量",
      value:16,
      icon:"List",
      color:"#ffbeee"
     },
     {
      name:"昨日未维修数量",
      value:7,
      icon:"Failed",
      color:"#5abfff"
     }
    ]
   }
  }
 }
}
