
<template>
  <div class="home">
  </div>
</template>

<script>
// @ is an alias to /src
//并发请求：同时进行多个请求，统一处理返回值

import axios from 'axios' //温馨提示：引入axios后，created(){}里一定要有一个axios请求否则会程序会报错
export default {
  name: 'axios2-3',
  components: {
   
  },
  created(){
    //axios.all()  参数数组 请求
    //axios.spread()  在axios.all多个请求完成时候，把返回数据分割处理，在把每一个返回值统一处理
  axios.all(
      [
          axios.get('/data.json'),
          axios.get('/city.json'),
      ]
  ).then(
      axios.spread((dataRes,cityRes)=>{
            console.log(dataRes,cityRes)
      }) //回调函数
  )
  },
}
</script>