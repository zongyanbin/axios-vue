<template>
  <div class="axios2-2">

  </div>
</template>

<script>
/**
 *  温馨提示：
 *  axios 请求方法：get,post,put,patch,delete
 * 
 *  get:获取数据
 *  post:提交数据（表单提交+文件上传 img json文件 execl） 一般用于新建
 *  put:更新数据（将所数据都推送到后端） 一般用于更新
 *  patch:更新数据（只将修改的数据推送到后端） 看后端具体规范，数据比较多很耗费性能，所以选择提交
 *  delete:删除数据
 *  这五个请求方式，具体是由谁定义得，都是由后端定义
 *  因为每个项目都有具体都规范，或者和（后端协商）
 * 
 */
import axios from 'axios' //温馨提示：引入axios后，created(){}里一定要有一个axios请求否则会程序会报错
export default {
  name: 'axios2-2',
  components: {
    
  },
  created(){
      //2-2 axios请求方法及别名（get方法)
      //get请求
      // 请求路径 http://localhost:8080/data.json?id=12
      //get 方法 两种不同的写法
      axios.get('/data.json',{
          params:{
              id:12
          }
      }).then(res=>{  //get方法别名
        console.log(res)
      })

      axios({
          method:'get',
          url:'/data.json',
          params:{
              id:12
          }
      }).then(res=>{
          console.log(res)
      })
    

   // 2-3 axios请求方法及别名（post和put方法）
   //POST请求
   //post form-data表单提交(图片上传，文件上传) applicition/json
    let data={
        id:12
    }
    axios.post('/post',data).then(res=>{
        console.log(res)
    })

    axios({
        method:'post',
        url:'/post',
        data:data
    }).then(res=>{
        console.log(res)
    })

    //form-data请求 
    let formData = new FormData(); //创建form-data格式对象
    for(let key in data){
        formData.append(key,data[key]); //key 对应对象都是id 
    }

    axios.post('/post',formData).then(res=>{
        console.log(res)
    })

    axios.put('/put',data).then(res=>{
        console.log(res)
    })

    axios.patch('/patch',data).then(res=>{
        console.log(res)
    })

    //2-4 axios请求方法及别名（delete方法） 
    //别名两种方法
    axios.delete('/delete',{
        params:{
            id:12
        }
    }).then(res=>{
       console.log(res)     
    })


    axios.delete('/delete',{
        data:{
            id:12
        }
    }).then(res=>{
       console.log(res)     
    })


    //不用别名
    axios({
        method:'delete',
        url:'/delete',
        params:{},
        data:{}
    }).then(res=>{
        console.log(res)
    })

  }
}
</script>
