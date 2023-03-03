<template>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item>统计分析</el-breadcrumb-item>
        <el-breadcrumb-item>财务报表</el-breadcrumb-item>
    </el-breadcrumb>


    <div class="block">
        <span class="demonstration">时间&nbsp;&nbsp;&nbsp;</span>
        <el-date-picker v-model="value1" type="date" placeholder="选择日期">
        </el-date-picker>
        <el-button type="primary" @click="selectData">查询</el-button>
    </div>


    <el-table :data="tableData" border style="width: 100%">
        <el-table-column fixed prop="id" label="序号" width="60">
        </el-table-column>
        <el-table-column fixed prop="shijian" label="日期" width="120">
        </el-table-column>
        <el-table-column prop="yfk" label="预付款" width="100">
        </el-table-column>
        <el-table-column prop="wxzfk" label="微信支付款" width="120">
        </el-table-column>
        <el-table-column prop="zfbzfk" label="支付宝支付款" width="120">
        </el-table-column>
        <el-table-column prop="xtzhzfk" label="系统账户支付款" width="130">
        </el-table-column>
        <el-table-column prop="cdkzfk" label="充点卡支付款" width="120">
        </el-table-column>
        <el-table-column prop="hjzfk" label="合计支付款" width="120">
        </el-table-column>
        <el-table-column prop="xtzhcz" label="系统账户充值" width="120">
        </el-table-column>
        <el-table-column prop="cdkcz" label="充电卡充值" width="120">
        </el-table-column>
        <el-table-column prop="zhzye" label="账户总余额" width="120">
        </el-table-column>
        <!-- <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                <el-button type="text" size="small">编辑</el-button>
            </template>
        </el-table-column> -->
    </el-table>
</template>

<script>

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
            value1: '',
            value2: '',



        }
    },
    created() {
        http.get('cwbb').then((res) => {
            this.tableData = res.data;
        })

       
    },
    methods: {
        selectData() {
            http.get('cwbb').then((res) => {
                // for(let i = 0;i < res.data.length;i++){
                //     //console.log(res.data[i].shijian,dayjs(this.value1).format('YYYY-MM-DD'));
                //     //dayjs().format('YYYY-MM-DD');    
                //     //let date = dayjs(this.value1).format('YYYY-MM-DD')

                //     if(dayjs(this.value1).format('YYYY-MM-DD') === res.data[i].shijian){
                //         debugger;
                //         this.tableData = res.data;

                //     }

                // }
                this.tableData = res.data.filter((v) =>
                    v.shijian === dayjs(this.value1).format('YYYY-MM-DD')
                )
            })
        },

        handleClick(row) {
            console.log(row);
        }
    }
}

</script>

<style lang="scss" scoped>
.block {
    margin-top: 8px;
}

.el-button {
    margin-left: 600px;
}

.el-table {
    margin-top: 8px;
}
</style>