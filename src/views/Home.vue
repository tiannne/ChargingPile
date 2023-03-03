<template class="wrap">
   <el-row class="home" :gutter="20">
      <el-col :span="8" style="margin-top: 20px;">
         <el-card shadow="hover">
            <div class="user">
               <img src="../../public/JJLIN.png" alt="">
               <div class="userinfo">
                  <p class="name">{{ name }}</p>
                  <p class="role">管理员</p>
               </div>
            </div>
            <div class="login-info">
               <p>上次登录时间:<span>2023-3-1</span></p>
               <p>上次登录的地点:<span>大连</span></p>
            </div>
         </el-card>
         <el-card shadow="hover" style="margin-top: 10px" height="200">
            <el-table :data="tableData" height="240">
               <el-table-column v-for="(val, key) in tableLabel" :key="key" :prop="key" :label="val">
               </el-table-column>
            </el-table>
         </el-card>
      </el-col>
      <el-col :span="16" style="margin-top: 20px">
         <div class="num">
            <el-card shadow="hover" :body-style="{ display: 'flex', padding: 0 }" v-for="item in countData"
               :key="item.name">
               <component class="icons" :is="item.icon" :style="{ background: item.color }"></component>
               <div class="details">
                  <p class="num">{{ item.value }}次</p>
                  <p class="txt">{{ item.name }}</p>
               </div>
            </el-card>
         </div>
         <el-card shadow="hover" :body-style="{ height: '355px' }">
            <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview"
               :on-remove="handleRemove" :file-list="fileList" list-type="picture">
               <el-button size="small" type="primary">图片上传</el-button>
               <div slot="tip" class="el-upload__tip">&nbsp&nbsp&nbsp充电桩巡检记录（只能上传jpg/png文件，且不超过500kb）</div>
            </el-upload>
         </el-card>
      </el-col>
   </el-row>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue';
import axios from 'axios';


export default defineComponent({
   setup() {
      let tableData = ref([]);
      let countData = ref([]);
      const tableLabel = {
         name: "站点名称",
         todayMA: "今日维护",
         monthMA: "本月维护",
         totalMA: "总维护",
      };
      const getTableList = async () => {
         await axios.get('home/getData').then((res) => {
            /* 打印一下res看是否生效 */
            console.log(res)
            tableData.value = res.data.data.tableData
         })
      };
      const getCountData = async () => {
         await axios.get('home/getCountData').then((res) => {
            /* 打印一下res看是否生效 */
            console.log(res)
            countData.value = res.data.data.cardData
         })
      }
      /* onMounted接受回调函数 */
      onMounted(() => {
         getTableList();
         getCountData();
      })
      {
         return {
            tableData,
            tableLabel,
            countData,
         };
      }

   },
   data() {
      return {
         fileList: [
            {
               name: '辽宁省大连市甘井子区高新区设计城A座903',
               url: '../../../public/a (1).jpg'
            },
            {
               name: '辽宁省大连市中山区人民路71号成大大厦N08',
               url: '../../../public/a (2).jpg'
            }
         ],
         name: window.localStorage.getItem('Email'),
      };
   },
   methods: {
      handleRemove(file, fileList) {
         console.log(file, fileList);
      },
      handlePreview(file) {
         console.log(file);
      },
   }
});
</script>

<style lang="scss" scoped>
.home {
   .user {
      display: flex;
      align-items: center;
      padding-bottom: 20px;
      border-bottom: 1px solid #ccc;
      margin-bottom: 20px;

      img {
         width: 150px;
         height: 150px;
         border-radius: 50%;
         margin-right: 40px;
      }
   }

   .login-info {
      p {
         line-height: 30px;
         font-size: 13px;
         color: #999;

         span {
            color: #666;
            margin-left: 60px;
         }
      }
   }

   .num {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .el-card {
         width: 32%;
         margin-bottom: 20px;
      }

      .icons {
         width: 85px;
         height: 85px;
         font-size: 20px;
         text-align: center;
         line-height: 85px;
         color: #fff;
      }

      .details {
         margin-left: 15px;
         display: flex;
         flex-direction: column;
         justify-content: center;

         .num {
            font-size: 24px;
            margin-bottom: -5px;
            margin-top: 5px;
         }

         .txt {
            font-size: 13px;
            text-align: center;
            color: #999;
         }
      }
   }
}
</style>