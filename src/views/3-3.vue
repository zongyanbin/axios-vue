<template>
  <div class="home">

  </div>
</template>

<script>
//拦截器： 在请求或响应被处理前拦截他们
//1.请求拦截器  2.响应拦截器
import axios from 'axios'
export default {
  name: 'axios3-4',
  created(){
      //1.请求拦截器
      axios.interceptors.request.use(config=>{  // use str 俩个参数 1请求前回调函数 2请求错误回调函数
            //在发送请求前做些什么？比如修改配置 弹出内容
            return config
        },err=>{
            //第2个参数 在请求错误都时候做些什么
            return Promise.reject(err) //Promise 里有俩参数  reject 请求错误用    reject成功用
        }
      ) 

      //2.响应截器
      //响应截器与请求拦截器类似
      axios.interceptors.response.use(res=>{
          //请求成功对响应数据做处理
          return res
      })
      axios.get().then(res=>{  //请求成功数据到res
        console.log(res)
      },err=>{
          //响应错误
          return Promise.reject(err)
      })
      // axios.get().then().catch(err=>{}) 
      //请求错误与响应错误都区别  （请求到没到后端  到了返回都错误响应错误 没到就是请求错误）
      //请求错误是只发送请求没有到达后端 游览器就会报错 404
      //响应错误，比如我想查一条数据 数据库里查一个人 数据错说没有此人，返回500 错误信息查无此人

      //不太常用，不重要仅供了解 取消拦截器 
      let interceptors=axios.interceptors.request.use(config=>{
          confirm.headers={
              auth:true
          }
          return config
      })
      axios.interceptors.request.eject(interceptors) //不用就给取消掉

      //实际开发例子： 登录状态（后端返回 token:'' 加密后的个人信息，识别当前登录人的身份）
      //这是用请求拦截器
      //先生成实例 一般都给实例添加拦截器 比如评论需要登录，把token加入到header里  
      //访问 需要登录的接口
      let instance =axios.create({})
      instance.interceptors.request.use(config=>{
          config.headers.token='config'
          return config  
        //   config.headers={  请他参数会被覆盖掉
        //       token:''
        //   }

      }) 
      
      //用他访问 不需要登录的接口
      let newInstance = axios.create({}) //创建完必须使用newInstance 否则报错

      newInstance.interceptors.request.use(config=>{
         // $('#modal').show() //等待弹窗
          return config
      })

      //响应后  
      newInstance.interceptors.response.use(res=>{
         // $('#modal').hide() //等待弹窗
          return res
      })



      //移动端开发 用户体验度 页面发起请求比较慢？用户需要知道我正在请求 我可以给页面添加一个加载样式loading 
      //请求前
      let instance_phone = axios.create({})
      instance_phone.interceptors.request.use(config=>{
         // $('#modal').show() //等待弹窗
          return config
      })

      //响应后  
      instance_phone.interceptors.response.use(res=>{
         // $('#modal').hide() //等待弹窗
          return res
      })
      
  }
}
</script>