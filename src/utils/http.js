//axios 二次封装  去官网找

import axios from "axios";

//创建实例
const instance = axios.create({
    //以下是基础的URL 以后发请求的时候去拼接 
    baseURL: '/api',
    //请求超时就设置5秒吧  到时间了的话，就报一些错误什么的吧
    timeout: 5000
    // headers: { 'X-Custom-Header': 'foobar' }
});

//这样的话 才能在5173下去请求后端的这个接口

//发请求就不用有写api了哈  去跟baseURL(基础路径去拼接)
// axios.get('users/yzm');




// 添加请求拦截器  -> 携带用户身份token
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器 -> 统一错误处理
instance.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});


//统 一 一 哈  发送增删改查 全都发送3个参数
//把差异化给他处理掉
let http = {
    get(url, data, config) {
        return instance.get(url, {
            //将data放进params里传给后端
            params: data,
            ...config
        })
    },
    post(url, data, config) {
        //正常写就可以  不用做任何处理
        return instance.post(url, data, config)
    },
    //put方法是覆盖式修改数据
    put(url, data, config) {
        //正常写就可以  不用做任何处理
        return instance.put(url, data, config)

    },
    //patch方法则是按需修改，即传什么数据，就按需修改什么数据
    patch(url, data, config) {
        //正常写就可以  不用做任何处理
        return instance.patch(url, data, config)
    },
    delete(url, data, config) {
        return instance.get(url, {
            //delete请求是用data去接受数据并发送
            data:data,
            ...config
        })
    }

}

export default http;