<template>
  <div class="home">

  </div>
</template>

<script>
//axios实例化

//为什么要用axios实例化？ 
//比如后端接口有多个地址，并且超时时长不一样
//生成数组
//let arr = []
//let arr = new Array();

import axios from 'axios'
export default {
  name: 'axios3-1',
  components: {
    
  },
  created(){
      //创建实例 两个域名 不同超时时间就需要实例
      //先生成变量 用到一个方法axios.create
      //参数配置信息
      let instance =axios.create({
          baseURL:'http://localhost:8080',
          timeout:1000 //http请求如果服务端长时间不返回数据接口就报超时401
          
      })

      let axios2 = axios.create({
          baseURL:'http://localhost:9090',
          timeout:5000
      })

      axios2.get('/data.json').then(res=>{
          console.log(res)
      })

      instance.get('/data.json').then(res=>{
          console.log(res)
      })
  },
}
</script>