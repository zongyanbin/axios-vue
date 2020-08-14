<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios' //温馨提示：引入axios后，created(){}里一定要有一个axios请求否则会程序会报错
export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  created(){   
    axios.get('/data.json').then(res=>{
      console.log(res);
    })
  }
}
</script>
