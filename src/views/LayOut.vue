<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <h2>充电桩</h2>
                <div class="user-head">
                    <el-space>
                        <el-avatar> user </el-avatar>
                        <span>
                            admin
                        </span>
                    </el-space>
                </div>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <el-menu active-text-color="#ffd04b" 
                             background-color="#545c64" 
                             class="el-menu-vertical-demo"
                             :default-active="activeIndex" 
                             text-color="#fff" 
                             @open="handleOpen" 
                             @close="handleClose"
                             router>
                        <el-menu-item index="/index">
                            <el-icon><icon-menu /></el-icon>
                            <span>首页</span>
                        </el-menu-item>
                        <el-sub-menu index="/jiaoyiguanli">
                            <template #title>
                                <el-icon>
                                    <location />
                                </el-icon>
                                <span>交易管理</span>
                            </template>
                                <el-menu-item index="/Jiaoyiguanli/chongzhijilu">充值记录</el-menu-item>
                                <el-menu-item index="/Jiaoyiguanli/jiaoyiliushui">交易流水</el-menu-item>
                        </el-sub-menu>
                        <el-sub-menu index="/tongjifenxi">
                            <template #title>
                                <el-icon>
                                    <location />
                                </el-icon>
                                <span>统计分析</span>
                            </template>
                                <el-menu-item index="/Tongjifenxi/nenghaofenxi">能耗分析</el-menu-item>
                                <el-menu-item index="/Tongjifenxi/yunyingqingk">运营情况</el-menu-item>
                        </el-sub-menu>
                        <el-sub-menu index="/zhandianguanli">
                            <template #title>
                                <el-icon>
                                    <location />
                                </el-icon>
                                <span>站点管理</span>
                            </template>
                                <el-menu-item index="/Zhandianguanli/chongdianzhuang">充电桩</el-menu-item>
                                <el-menu-item index="/Zhandianguanli/chongdzhandian">充电站点</el-menu-item>
                        </el-sub-menu>
                    </el-menu></el-aside>
                <el-main>
                    Main
                    <RouterView />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>


<script>
export default {
    data(){
        return{
            activeIndex:''
        }
    },
    created(){
        this.activeIndex = this.$route.path
    }
}
</script>

<style lang="scss" scoped>
.el-header {
    background-color: skyblue;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.user-head {
    display: flex;
    align-items: center;
}

.el-aside {
    height: calc(100vh - 60px);
}

.el-menu {
    height: 100%;
}</style>