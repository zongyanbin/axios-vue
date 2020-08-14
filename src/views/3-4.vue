<template>
  <div class="home">

  </div>
</template>

<script>
//错误处理：请求错误时进行都处理
import axios from 'axios'
export default {
  name: 'axios3-5',
  created(){

      //请求拦截器
      axios.interceptors.request.use(config=>{
          return config
      },err=>{
          return Promise.reject(err) //请求错误  成名Promise.resolve  失败Promise.reject 请求错误404  超时401
      })

     //响应拦截器
     axios.interceptors.response.use(res=>{
         return res
     },err=>{
         return Promise.reject(err) //响应错误
     })
      axios.get('/data.json').then((res)=>{
          console.log(res)
      }).catch(err=>{
          //请求错误和响应错误最终都进入到catch里
          console.log(err)
      })

      //例子：实际开发过程中，一般添加同一错误处理 404
      let instance = axios.create({})
      instance.interceptors.request(config=>{
          return config
      },err=>{
          //请求错误，一般http状态码以4开头，常见401超时，404 not found
           //$('#modal').show()
          setTimeout(()=>{
             // $('#modal').hide()
          },2000)
          return Promise.reject(err)
      })

     //响应拦截器
      instance.interceptors.response.use(res=>{
          return res
      },err=>{
            //$('#modal').show()
          setTimeout(()=>{
             // $('#modal').hide()
          },2000)
          //响应错误处理 一般http状态码以5开头 常见 500系统错误 502系统重启
          return Promise.reject(err)
      })
  
     instance.get('/data.json').then(res=>{
         console.log(res)
     }).catch(err=>{ //只显示通用都错误处理这里就不需要些.catch了
         console.log(err)
     }) 

  }
}
</script>