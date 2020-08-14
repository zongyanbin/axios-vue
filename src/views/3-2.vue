<template>
  <div class="home">
 </div>
</template>

<script>
// axios配置参数都有哪些
import axios from 'axios'
export default {
  name: 'Home',
  components: {
    
  },
  created(){

      //3-2 实例的相关配置
      axios.create({
          baseURL:'http://localhost:8080',//1 请求域名，基本地址
          timeout:1000,//2 设置请求超时时长默认毫秒（ms） ,一般后端定义 超时显示401，
          //前端也要设置,超时请求取消 
          url:'/data.json',//3 请求路径
          method:'get',//4 请求方法 get post pu patch delete
          Headers:{ // 5 设置请求头 添加参数
          //比如一些接口需要登录鉴权 token还识别当前登录人得信息
          token:'',
          params:{},//6 参数把请求参数放到url
          data:{},//7 请求参数放到请求体里
          },
      })

    //都有哪些地方可以进行参数配置？
    //优先级从低到高
    //1.axios 全局配置
    axios.defaults.timeout = 1000
    axios.defaults.baseURL = 'http://localhost:8080'
    //2.axios 实例配置 
    let instance = axios.create()
    instance.defaults.timeout = 3000
    //3.axios 请求配置 
    //请求数据比较大，后端返回比较慢，修改超时时长
    
      instance.get('/data.json',{
          timeout:5000
      }) //config() = 1-7




   //3-3 常用参数配置具体使用方法  注意： 视频里3-3  let instance 这里修改为 let instance2  不修改和上面代码复制重复会报错
   //实际开发中 都会生成示例，在示例里进行配置
    //有两种请求接口
    //http:localhost:9090
    //http:localhost:9091
    let instance2 = axios.create({
        baseURL:'http:loaclhost:9090',
        timeout:1000
    })

    let instarnce1 = axios.create({
        baseURL:'http:localhost:9091',
        timeout:3000
    })
    
    //baseUrl,timeout,url,method,params
    instance2.get('/contactList',{
    params:{}
    }).then(res=>{
        console.log(res)
    })

    //示例2 baseUrl,timeout=5000,url,method,params
  //baseUrl,timeout=5000,url,method,params
    instarnce1.get('/orderList',{
        timeout:5000
    }).then(res=>{
        console.log(res)
    })

    
  },
}
</script>