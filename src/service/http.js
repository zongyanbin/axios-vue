import axios from 'axios'
import service from './contactApi' //service 相当于 export default CONTACT_API
import {Toast} from 'vant'
//封装
//service 循环遍历输出不同的请求方式    创建实例
let instance = axios.create({
    baseURL:'http://localhost:9000/api',
    timeout:1000
})

const Http={} //创建一个请求方法对象  包裹请求方法得容器

//请求格式或参数的统一
for(let key in service){
    let api = service[key]//这里有url method

    //async什么作用 避免进入回调地狱 await后面跟着是异步函数
   Http[key] = async function(
        //声明async请求
        //首先function里有参数，这几个参数要定义好，这个是要根据实际情况定义
        //大家听完这个课程你要学会是如何封装一个适用于自己项目得方法，而不是讲完了直接拿着去用套用 这个是不对的
        //每个项目需要封装也是有一定区别的 接下来我要封装几个参数

        params, //请求get：url上默认值 ，如果是put post patch就用(data),如果是delete:url默认值
        isFormData = false,//默认false 标识是否是form-data请求   主要作用给put post patch用的
        config={}//默认空对象  axios请求用到都  （配置参数）
        ){ 
          
            //开始第一步首先需要拿到请求Url
           // let url = api.url

            //然后我在声明一个新的newParams  判断 isFormData  是否是formData请求 
            //如果不是formData请求 newParams= params 
            //如果是formData请求 需要处理转换成formdata对象
            let newParams = {}

            //content-type 是否是form-data的判断 true得情况
            if(params && isFormData){
                newParams = new FormData()
                for(let i in params){
                    newParams.append(i,params[i])
                }
            }else{
                newParams = params;
            }

            //第二步请求
            //不同请求的判断  put   post  patch
            let response = {}//请求的返回值
            if(api.method =='put' || api.method==='post'|| api.method==='patch'){
              
                     try{
                                //instance 请求方法第一个参数 api.method  接着是（）里第一个参数 url,第二个参数data，第三个参数config其他配置
                        response = await instance[api.method](api.url,newParams,config)
                     }catch(err){
                        response = err
                     }
            }else if(api.method==='delete' || api.method=='get'){

                    config.params = newParams
                try{
                     // delete 请求 instance 请求方法第一个参数 api.method  接着是（）里第一个参数 url ,第二个是config,没有第三个参数 
                        response = await instance[api.method](api.url,config)
                    }catch(err){
                        response =err
                    }

            }

            return response //返回响应值
        }
}


//拦截器的添加  
//请求拦截器
instance.interceptors.request.use(config=>{
    Toast.loading({
        mask:false,
        duration:0,//一直存在
        forbidClick:true,//禁止点击
        message:'加载中...'
    })
    //发起请求前做些什么
    return config
},()=>{
    //请求错误
    Toast.clear()
    Toast('请求错误，请求稍后重试')
})

//响应拦截器
instance.interceptors.response.use(res=>{
    //请求成功
    Toast.clear()
    return res.data
},()=>{
    Toast.clear()
    Toast('请求错误，请求稍后重试')
})

export default Http