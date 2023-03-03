<template>
  <div class="layout">
    <el-tabs type="border-card">
      <el-tab-pane label="登录">
        <el-form label-position="right" label-width="60px" style="max-width: 460px" class="loginForm">
          <el-form-item label="邮箱：">
            <el-input placeholder="请填写邮箱地址" v-model="Email" @blur="sendEmail" />
          </el-form-item>
          <el-form-item label="密码：">
            <el-input placeholder="请填写密码" type="password" v-model="password" @blur="sendPassword" />
          </el-form-item>

          <el-row>
            <el-checkbox class="checkBox" v-model="isAgree" label="同意用户使用准则" name="type" />
          </el-row>
          <el-button v-if="isAgree" type="primary" class="loginBtn" @click="login">
            登录
          </el-button>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="注册">
        <el-form label-position="right" label-width="100px" style="max-width: 460px" class="loginForm">
          <el-form-item label="邮箱：">
            <el-input v-model="rEmail" placeholder="请填写邮箱地址" @blur="sendEmailZC"/>
          </el-form-item>
          <el-form-item label="密码：">
            <el-input type="password" v-model="rPassword" placeholder="请填写密码" @blur="sendPasswordZC"/>
          </el-form-item>
          <el-form-item label="确认密码：">
            <el-input type="password" v-model="confirmPassword" @blur="confirmFunc" placeholder="请确认密码"/>
          </el-form-item>
          <el-row>
            <el-checkbox class="checkBox" v-model="rAgree" label="同意用户使用准则" name="type" />
          </el-row>
          <el-button v-if="rAgree" type="primary" class="loginBtn" @click="register">
            注册
          </el-button>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { reactive, toRefs } from "@vue/reactivity";
import { ElMessage } from "element-plus";
import  http  from "../utils/http.js";
import  { useRouter }  from "vue-router"
export default {
  setup() {

    const router = useRouter();

    const form = reactive({
      Email: "",
      password: "",
      isAgree: 0,
    });
    const registerForm = reactive({
      rEmail: "",
      rPassword: "",
      confirmPassword: "",
      identifyCode: "",
      rAgree: 0,
    });


    

    // 方法
    // 登录
    function login() {
      //console.log(form);
      http.post('login', {
        email: form.Email,
        password: form.password
      }).then(res => {
        if(res.data.code === 0){
          ElMessage.success('登录成功');
          window.localStorage.setItem('Email', form.Email);
          router.push('/index')
          form.Email = '';
          form.password = '';
        }else{
          ElMessage.error('邮箱或密码不正确,请您重新输入');
        }
      })
    }
    // 注册
    function register() {
      http.post('users',{
        email: registerForm.rEmail,
        password: registerForm.rPassword
      }).then(res =>{
        //console.log(res.status)
        if(res.status === 201){
          ElMessage.success('注册成功');
          registerForm.rEmail = '';
          registerForm.rPassword = '';
          registerForm.confirmPassword = '';
        }else{
          ElMessage.error('该用户已存在,请重新输入');
        }
      })




    }
    // 获取验证码
    function getIdentifyCode() {
      console.log("获取验证码");
    }

    //登录时前端邮箱校验
    function sendEmail() {
      let regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (form.Email != '' && !regEmail.test(form.Email)) {
        ElMessage.error('邮箱格式不正确');
        form.Email = ''
      } else if (form.Email === '') {
        ElMessage.error('请输入邮箱');
      }
    }
    //登录时前端密码校验
    function sendPassword() {
      if (form.password === '') {
        ElMessage.error('请输入密码');
      } 
    }

    //注册时前端邮箱校验
    function sendEmailZC() {
      let regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (registerForm.rEmail != '' && !regEmail.test(registerForm.rEmail)) {
        ElMessage.error('邮箱格式不正确');
        registerForm.rEmail = '';
      } else if (registerForm.rEmail === '') {
        ElMessage.error('请输入邮箱');
      }
    }
    
    //注册时前端邮箱校验
    function sendPasswordZC() {
      if (registerForm.rPassword === '') {
        ElMessage.error('请输入密码');
      } 
    }


    // function confirmFunc() {
    //   if (registerForm.confirmPassword !== registerForm.rPassword)
    //     alert("密码与确认密码不一致");
    // }

    
    // 确认密码
    const confirmFunc = () => {
      if (registerForm.confirmPassword !== registerForm.rPassword)
        ElMessage.error("密码与确认密码不一致.");
    };
    return {
      ...toRefs(form),
      ...toRefs(registerForm),
      login,
      register,
      getIdentifyCode,
      confirmFunc,
      sendEmail,
      sendPassword,
      sendEmailZC,
      sendPasswordZC
    };
  },
};
</script>
  
<style scoped>
.layout {
  position: absolute;
  left: calc(50% - 200px);
  top: 35%;
  width: 400px;
}

.loginBtn {
  width: 100px;
}

.loginForm {
  text-align: center;
}

.checkBox {
  margin-left: 7px;
}

.inpWidth {
  width: 165px;
}
</style>
  