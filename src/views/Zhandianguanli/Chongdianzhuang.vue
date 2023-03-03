<template>
    <div class="all">
        <div class="up">
            
            <el-form-item label="状态" class="zhuangtai" v-model="keywords">
                <el-select v-model="form.region" class="checker" label-height >
                    <el-option label="在线" value="在线" />
                    <el-option label="已下线" value="已下线" />
                </el-select>
            </el-form-item>
            <el-button type="primary" plain class="cha" @click="selectData">查询</el-button>
            <el-button type="primary" plain class="xin">新增</el-button>
            <el-button type="primary" plain class="shan">生成二维码</el-button>
        </div>
        <div class="down">
            <el-table ref="multipleTableRef" :data="tableData" style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="29" />
                <el-table-column property="xuhao" label="序号" width="60">
                </el-table-column>
                <el-table-column property="name" label="电桩名称" width="120" />
                <el-table-column property="attr" label="电桩型号" width="120" />
                <el-table-column property="type" label="电桩类型" width="120" />
                <el-table-column property="number" label="充电枪数量" width="120" />
                <el-table-column property="address" label="关联电站" show-overflow-tooltip />
                <el-table-column property="appriase" label="电桩功率" width="120" />
                <el-table-column property="did" label="操作">
                    <template #default="scope">
                        <el-button size="small" type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
                <el-table-column property="statu" label="状态" width="120" />
                <el-table-column property="time" label="创建时间" width="180" />
                <!-- <el-table-column property="status" label="状态" width="120" /> -->
            </el-table>
        </div>
    </div>
</template>

<script>
import { ElMessage, ElTable, selectKey } from "element-plus";
import http from '../../utils/http'

export default {

    data(){
        return {
            form:{
                region:''
            }, 
            keywords:'',         
            tableData:[]

        }
    },
    methods:{
        selectData(){
            console.log(this.form.region);
            if(this.form.region === '在线'){
                this.tableData = this.tableData.filter(v=>{
                    return v.statu === '在线'
                })
            }
            else if(this.form.region === '已下线'){
                this.tableData = this.tableData.filter(v=>{
                    return v.statu === '已下线'
                })
            }
        }
    },
    created(){
        http.get('one').then(res=>{
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
    margin-left: 5px;
    font-size: 16px;
}

.all.up.zhuangtai.checker {
    height: 70px;
}

.cha {
    margin-left: 740px;
    margin-top: 20px;
}

.xin {
    margin-top: 20px;
}

.shan {
    margin-top: 20px;
}
.el-table-column{
    text-align: center;
}
</style>