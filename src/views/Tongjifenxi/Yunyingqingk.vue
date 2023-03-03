<template>
   

    <!-- <div class="block">
        <span class="demonstration">统计日期&nbsp;&nbsp;</span>
        <el-date-picker v-model="value1" type="daterange" range-separator="至" start-placeholder="开始日期"
            end-placeholder="结束日期">
        </el-date-picker>
        <el-button type="primary" @click="selectData">查询</el-button>
    </div> -->
    <div class="block">
        <span class="demonstration">时间&nbsp;&nbsp;&nbsp;</span>
        <el-date-picker v-model="value1" type="date" placeholder="选择日期">
        </el-date-picker>
        <el-button type="primary" @click="selectData">查询</el-button>
    </div>

    <div id="main" style="width: 600px;height:400px;margin-left: 300px;"></div>

    <el-table :data="tableData" border style="width: 68%">
        <el-table-column fixed prop="id" label="序号" width="60">
        </el-table-column>
        <el-table-column fixed prop="tjsj" label="统计日期" width="200">
        </el-table-column>
        <el-table-column prop="cdl" label="充电量" width="150">
        </el-table-column>
        <el-table-column prop="cdcs" label="充电次数" width="150">
        </el-table-column>
        <el-table-column prop="cdje" label="充电金额" width="150">
        </el-table-column>
        <el-table-column prop="khs" label="客户数" width="180">
        </el-table-column>

    </el-table>
</template>

<script>

import * as echarts from 'echarts';
import http from "../../utils/http.js";
import dayjs from 'dayjs'

export default {


    data() {
        return {
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
                shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                        picker.$emit('pick', new Date());
                    }
                }, {
                    text: '昨天',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24);
                        picker.$emit('pick', date);
                    }
                }, {
                    text: '一周前',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', date);
                    }
                }]
            },

            tableData: [
                /*  {
                     id: 1,
                     shijian: "2023-02-24 10:30:44",
                     yfk: "￥200",
                     wxzfk: "￥200",
                     zfbzfk: "￥200",
                     xtzhzfk: "￥200",
                     cdkzfk: "￥200",
                     hjzfk: "￥200",
                     tk: "￥200",
                     xtzhcz: "￥200",
                     cdkcz: "￥200",
                     zhzye: "￥200"
                 },
                 {
                     id: 1,
                     shijian: "2023-02-24 10:30:44",
                     yfk: "￥200",
                     wxzfk: "￥200",
                     zfbzfk: "￥200",
                     xtzhzfk: "￥200",
                     cdkzfk: "￥200",
                     hjzfk: "￥200",
                     tk: "￥200",
                     xtzhcz: "￥200",
                     cdkcz: "￥200",
                     zhzye: "￥200"
                 } */
            ],
            value1: ''
        }
    },

    methods:{
        selectData(){
            http.get('yyqk').then((res) => {
                //console.log(res.data);
                this.tableData = res.data.filter((v) =>
                    v.tjsj === dayjs(this.value1).format('YYYY-MM-DD')
                )
            })

        }
    },

    computed: {
        // captions(){
        //     console.log(1111)
        //     return this.tableData.map((v)=> v.tjsj)
        //    // return ['2-14', '2-15', '2-16', '2-17', '2-18', '2-19']
        // },
        // values1(){
        //     return  [50, 73, 72, 60, 55, 80]; 
        // },
        // values2(){
        //     return [50, 73, 72, 60, 55, 80];
        // }
    },
    watch: {
        tableData(newVal){
            var myChart = echarts.init(document.getElementById('main'));

            var captions = newVal.map((v)=> v.tjsj);
            var values1 = newVal.map((v)=>v.cdje); // 柱状
            var values2 = newVal.map((v)=>v.cdje); // 折线

            function calMax(arr) {
                let max = 0;
                arr.forEach((el) => {
                    el.forEach((el1) => {
                        if (!(el1 === undefined || el1 === '')) {
                            if (max < el1) {
                                max = el1;
                            }
                        }
                    });
                });
                let maxint = Math.ceil(max / 9.5);
                //不让最高的值超过最上面的刻度
                let maxval = maxint * 10;
                //让显示的刻度是整数
                return maxval;
            }

            var max1 = Math.ceil(calMax([values1]) / 100) * 100;
            var max2 = Math.ceil(calMax([values2]) / 100) * 100;

            var option = {
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: 'none'
                    },
                    position: function (point, params, dom, rect, size) { // 提示框位置
                        let x = 0;
                        let y = 0;
                        if (point[0] + size.contentSize[0] + 10 > size.viewSize[0]) {
                            x = point[0] - size.contentSize[0] - 10
                        } else {
                            x = point[0] + 10
                        }
                        if (point[1] + size.contentSize[1] + 10 > size.viewSize[1]) {
                            y = point[1] - size.contentSize[1] - 10
                        } else {
                            y = point[1] + 10
                        }
                        return [x, y];
                    },
                    formatter: params => {
                        const {
                            name,
                            data,
                        } = params[0];
                        return `
                <div style="font-size: 14px;font-family: Source Han Sans CN-Medium;font-weight: 500;color: #FFFFFF;margin-bottom:12px;">${name}日</div>
                <div style="font-size: 14px;font-family: Source Han Sans CN-Medium;font-weight: 500;color: #FFFFFF;margin-bottom:4px;">充电金额：${data}元</div>`
                    },
                    extraCssText: 'opacity: 0.8;background-color:#050F1B;padding:16px;box-shadow: 1px 6px 15px 1px rgba(0,0,0,0.13);border-radius: 4px;filter: blur(undefinedpx);border:none;'
                },
                legend: {
                    data: ['充电金额', '充电金额'],
                    top: "12",
                    left: '24',
                    itemWidth: 12,
                    itemHeight: 12,
                    itemGap: 20,
                    textStyle: {
                        fontSize: 14,
                        color: "rgba(0, 0, 0, 0.45)",
                        fontFamily: 'Source Han Sans CN-Regular',
                        padding: [0, 0, 0, 4]
                    }
                },
                grid: {
                    top: '10%',//上边距
                    right: '20',//右边距
                    left: '20',//左边距
                    bottom: '10%',//下边距
                    containLabel: true,
                },
                xAxis: {
                    type: 'category',
                    data: captions,
                    axisTick: {
                        show: false //隐藏X轴刻度
                    },
                    axisLine: {
                        lineStyle: {
                            color: "#CCCCCC"
                        }
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: 'rgba(0,0,0,0.65)',
                            fontSize: 14,
                            fontFamily: 'Source Han Sans CN-Regular',
                        }
                    },
                },
                yAxis: [{
                    type: 'value',
                    min: 0,
                    max: max1,
                    interval: max1 / 5, //  平均分为5份
                    splitNumber: 5,
                    nameTextStyle: {
                        color: 'rgba(0,0,0,0.65)',
                        fontSize: 14,
                        fontFamily: 'Source Han Sans CN-Regular',
                        align: "left",
                        verticalAlign: "center",
                    },
                    axisLabel: {
                        color: 'rgba(0,0,0,0.65)',
                        textStyle: {
                            fontSize: 14
                        },
                    },
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: 'rgba(223, 223, 223, 1)',
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        lineStyle: {
                            color: 'rgba(223, 223, 223, 1)',
                            type: "dashed",
                        }
                    }
                },
                {
                    type: 'value',
                    //name: "充电金额：元",
                    position: "right",
                    min: 0,
                    max: max2,
                    interval: max2 / 5, //  平均分为5份
                    splitNumber: 5,
                    nameTextStyle: {
                        color: 'rgba(0,0,0,0.65)',
                        fontSize: 14,
                        fontFamily: 'Source Han Sans CN-Regular',
                        align: "right",
                        verticalAlign: "center",
                    },
                    axisLabel: {
                        color: 'rgba(0,0,0,0.65)',
                        textStyle: {
                            fontSize: 14
                        },
                    },
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: 'rgba(223, 223, 223, 1)',
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        lineStyle: {
                            color: 'rgba(223, 223, 223, 1)',
                            type: "dashed",
                        }
                    }
                }],
                series: [{
                    type: 'bar',
                    name: "充电金额",
                    data: values1,
                    itemStyle: {
                        color: "#5B8FF9",
                    },
                    barWidth: 16,
                },
                {
                    name: '充电金额',
                    type: 'line',
                    data: values2,
                    yAxisIndex: 1,
                    symbolSize: 10, //标记的大小
                    lineStyle: {
                        color: "#F6BD16",
                        width: 3,
                    },
                    itemStyle: {
                        //折线拐点标志的样式
                        color: "#F6BD16",
                        borderColor: '#F6BD16',
                        borderWidth: 3,
                    },
                    // smooth: true
                }]
            };


            myChart.setOption(option)

        }
    },
    mounted() {
        http.get('yyqk').then((res) => {
            this.tableData = res.data;
            console.log(this.tableData,1)
        })

        

        

       
    }

}

</script>

<style lang="scss" scoped>
.block {
    margin-top: 8px;
}

.el-table {
    margin-left: 150px;
}

.el-button {
    margin-left: 600px;
}
</style>