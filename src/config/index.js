/* 环境配置 */

/* 当前的环境 */
const env = import.meta.env.MODE || 'prod'

const EnvConfig={
 devolopment:{
  baseApi:'/api',
  mockApi:'home/getData'
 },
 /* 测试环境 */
 test:{
  baseApi:'/api',
  mockApi:'home/getData'
 },
 /* 开发环境 */
 pro:{
  baseApi:'/api',
  mockApi:'home/getData'
 },
}
