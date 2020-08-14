<template>
  <div class="home">
      
    <!--联系人列表--> 
    <!--chosenContactId 你选择得是那个ID-->
    <!--list 数据源 整个列表都是通过list来的-->
    <!--add 新增按钮事件-->
    <!--edit 编辑事件-->
    <van-contact-list
    :list="list"
    @add="onAdd"
    @edit="onEdit"
    />

    <!-- 联系人编辑 -->
    <van-popup v-model="showEdit" position="bottom">
    <van-contact-edit
        :contact-info="editingContact"
        :is-edit="isEdit"
        @save="onSave"
        @delete="onDelete"
    />
    </van-popup>

  </div>
</template>

<script>
import {ContactList,Toast, ContactEdit,Popup} from 'vant'
import axios from 'axios'
export default {
  name: 'contactList',
  components: {
    //注册组件 必须要在template里用到必须这里写
    [ContactList.name]:ContactList,
    [ContactEdit.name]:ContactEdit,
    [Popup.name]:Popup
  },
  data(){
      return{
        //   list:[{
        //       id:1,
        //       name:'',
        //       tel:'',
        //   }]
        list:[],
        instance:null, //axios  实例
        showEdit:false,//编辑弹窗得显隐
        editingContact:{ //正在编辑的联系人

        },
        isEdit:false,//新建或者编辑 false新建  true编辑
      }
  },
  created(){
         this.instance = axios.create({
                    baseURL:'http://localhost:9000/api',
                    timeout:1000
                }),
            this.getList()    
  },
  methods:{

      //封装方法 获取联系人列表
      getList(){
                this.instance.get('/contactList').then(res=>{
                    console.log(res)
                    this.list = res.data.data
                }).catch(err=>{
                    Toast('请求失败,请稍后再试')
                    console.log(err)
                })
      },


      //添加联系人
      onAdd(){
         this.editingContact = {id :this.list.leght};
         this.showEdit =  true
         this.isEdit = false
  
      },

      //编辑联系人
      onEdit(info){
          this.showEdit =  true
          this.isEdit = true
          this.editingContact = info
      },

      //保存联系人
      onSave(info){
          if(this.isEdit){
              //编辑保存
              this.instance.put('/contact/edit',info).then(res=>{
                  if(res.data.code===200){
                        Toast('编辑成功') //正常无论是编辑还是新建都是保存成功
                        this.showEdit = false
                        this.getList()
                  }
              }).catch(()=>{
                      Toast('请求失败，请稍后重试')
              })
          }else{
              //新建保存
              this.instance.post('/contact/new/json',info).then(res=>{
              console.log(res)
                  if(res.data.code===200){
                        Toast('新建成功')
                        this.showEdit = false
                        this.getList()
                  }
               
              }).catch(()=>{
                  Toast('请求失败,请稍后重试')
              })
          }

      },

      //删除联系人
      onDelete(info){
          this.instance.delete('/contact',{
              params:{
                  id:info.id
              }
          }).then(res=>{
              if(res.data.code===200){
                  Toast('删除成功')
                  this.showEdit = false
                  this.getList()
              }
          }).catch(()=>{
              Toast('请求失败请稍后再试')
          })
      }
  }
}
</script>