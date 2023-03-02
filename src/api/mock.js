/* Home首页的引入mock */
import Mock from "mockjs";
import homeApi from './mock/home.js'
/* 拦截请求 */
Mock.mock('home/getData',homeApi.getHomeData)
Mock.mock('home/getCountData',homeApi.getCountData)