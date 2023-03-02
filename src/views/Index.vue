<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <h2 style="font-size: 20px;padding-left: 80px;line-height: 50px; color: white;">
                    <el-icon style="font-size: 30px; margin-right: 20px; height: 50px; position: absolute;left: 50px;">
                        <Platform />
                    </el-icon>
                    大连市充电桩维护管理系统
                </h2>
                <div class="user-head">
                    <el-space>
                        <el-avatar> user </el-avatar>
                        <span style="color: white;">
                            {{ name }}
                        </span>
                        <el-button type="primary" :color="editColor" @click="handleClick">
                            <el-icon :size="size" :color="color">
                                <SwitchButton />
                            </el-icon>
                        </el-button>
                        <el-dialog v-model="dialogVisible" width="30%" :before-close="handleClose">
                            <span>确定退出登录?</span>
                            <template #footer>
                                <span class="dialog-footer">
                                    <el-button @click="cancel">取消</el-button>
                                    <el-button type="primary" @click="confirm">
                                        确定
                                    </el-button>
                                </span>
                            </template>
                        </el-dialog>

                    </el-space>
                </div>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <el-menu active-text-color="#0000d2" background-color="#ccc" class="el-menu-vertical-demo"
                        :default-active="activeIndex" text-color="#111" @open="handleOpen" @close="handleClose" router>
                        <el-menu-item index="/home">
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
                    <el-breadcrumb separator="/">
                        <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item> -->
                        <!-- <el-breadcrumb-item><a href="/">promotion management</a></el-breadcrumb-item> -->
                        <el-breadcrumb-item :to="{ path: '/home' }" v-for="item in breadcrumb" :key="item">{{ item
                        }}</el-breadcrumb-item>
                    </el-breadcrumb>
                    <RouterView />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>


<script>
import { Edit } from '@element-plus/icons-vue'
export default {
    data() {
        return {
            activeIndex: '',
            dialogVisible: false,
            name: window.localStorage.getItem('Email'),
            breadcrumb: []
        }
    },
    methods: {
        cancel() {
            this.dialogVisible = false
        },
        confirm() {
            this.$router.push('/login')
        },
        handleClick() {
            this.dialogVisible = true
        }
    },
    created() {
        this.activeIndex = this.$route.path
    },
    computed: {
        breadcrumb() {
            return this.$route.meta.breadcrumb || []
        }
    }
}
</script>

<style lang="scss" scoped>
.el-header {
    background: url(../../public/banner.jpg) no-repeat;
    background-size: 100% 100%;
    background-attachment: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.el-button--primary {
    background-color: rgb(255, 255, 255);
    color: #0000d2;
    font-size: 15px;
    font-weight: bold;
    border: 0;
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
}
</style>