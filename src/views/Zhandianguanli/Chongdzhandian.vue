<template>
    <div class="all">
        <div class="up">
            <el-form-item label="店铺名称" prop="name" style="margin-top: 15px;">
            </el-form-item>
            <el-form-item>
                <el-input prefix-icon="el-icon-search" v-model="form.name" placeholder="请输入关键字" class="checkyi" />
            </el-form-item>
            <el-form-item label="状态" class="zhuangtai">
                <el-select v-model="form.region" class="checker" label-height>
                    <el-option label="在线" value="在线" />
                    <el-option label="已下线" value="已下线" />
                </el-select>
            </el-form-item>
            <el-button type="primary" plain class="cha" @click="selectData">查询</el-button>
            <el-button type="primary" plain class="xin">新增</el-button>
            <el-button type="danger" plain class="shan">删除</el-button>
        </div>
        <div class="down">
            <el-table ref="multipleTableRef" :data="tableData" style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="29" />
                <el-table-column property="xuhao" label="序号" width="60">
                </el-table-column>
                <el-table-column property="name" label="站点名称" width="135" />
                <el-table-column property="attr" label="站点属性" width="100" />
                <el-table-column property="type" label="站点类型" width="100" />
                <el-table-column property="number" label="充电桩数量" width="100" />
                <el-table-column property="address" label="详细地址" show-overflow-tooltip />
                <el-table-column property="appriase" label="是否开启评价" width="120" />
                <el-table-column property="time" label="创建时间" width="170" />
                <el-table-column property="statu" label="状态" width="120" />
                <el-table-column property="did" label="操作">
                    <template #default="scope">

                        <el-button size="small" type="danger"
                            @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script  >
import { ElMessage, ElTable, selectKey } from "element-plus";
import http from '../../utils/http'

export default {
    data() {
        return {
            form: {
                region: ''
            },
            keywords: '',
            tableData: [],

        }
    },
    // methods: {
    //     selectData() {
    //         console.log(this.form.tableData);
    //         /* return this.tableData.filter((value) => {
    //             return value.name.indexOf(this.keywords) !==-1 ;
    //         }); */
    //         let _selectData = this.car.toLowerCase();
    //         let newListData = [];
    //         if (_selectData) {
    //             this.tableData.filter((item) => {
    //                 if (item.name.toLowerCase().indexOf(_search) !== -1) {
    //                     newListData.push(item);
    //                 }
    //             })
    //         }
    //         this.tableData = newListData;
    //     }
    // },
    methods:{
        selectData(){
            console.log(this.form.name);
            if(this.form.name === '人民广场'){
                this.tableData = this.tableData.filter(v=>{
                    return v.address === '大连中山区人民广场'
                })
            }
            else if(this.form.name === '华南广场'){
                this.tableData = this.tableData.filter(v=>{
                    return v.address === '大连甘井子区华南广场'
                })
            }
            else if(this.form.name === '马栏广场'){
                this.tableData = this.tableData.filter(v=>{
                    return v.address === '大连沙河口区马栏广场'
                })
            }
        }
    },
    created() {
        http.get('two').then(res => {
            //console.log(res.data);
            this.tableData = res.data;
        })


    }

}
</script>

<style lang="scss" scoped>
.up {
    display: flex;
}

.checkyi {
    width: 200px;
    height: 33px;
    margin-top: 15px;


}

.zhuangtai {
    margin-top: 15px;
    height: 20px;
    margin-left: 20px;
    font-size: 16px;
}

.all.up.zhuangtai.checker {
    height: 70px;
}

.cha {
    margin-left: 500px;
    margin-top: 20px;
}

.xin {
    margin-top: 20px;
}

.shan {
    margin-top: 20px;
}
</style>