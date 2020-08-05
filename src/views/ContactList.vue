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
            this. getList()    
  },
  methods:{

      //封装方法 获取联系人列表
      async getList(){
          let res = await
          this.$Http.getContactList()
          this.list = res.data

      },
      

      //添加联系人
      onAdd(){
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
      async onSave(info){
          if(this.isEdit){
              //编辑保存

              let res = await
              this.$Http.editContact(
                  info,
                  false,
              )

             if(res.code===200){
                Toast('编辑成功') //正常无论是编辑还是新建都是保存成功
                this.showEdit = false
                this.getList()
             }

          
          }else{
              //新建保存 

              /* form-data
              let res = await
              this.$Http.newContactForm(
                  info,
                  true,
              )

                if(res.code===200){
                    Toast('新建成功')
                    this.showEdit = false
                    this.getList()
                }
              */

              //application/json
              let res = await
              this.$Http.newContactJson(
                  info,
                  false,
              )

                if(res.code===200){
                    Toast('新建成功')
                    this.showEdit = false
                    this.getList()
                }
              
       
          }

      },

      //删除联系人
     async onDelete(info){
          let res = await
          this.$Http.delContact(
               {
                   id:info.id
               }
          )

        if(res.code===200){
            Toast('删除成功')
            this.showEdit = false
            this.getList()
        }  
      }
  }
}
</script>
