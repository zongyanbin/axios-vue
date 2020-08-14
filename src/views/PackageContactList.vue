<template>
  <div class="home">
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
import { ContactList,ContactEdit,Toast,Popup} from 'vant'
import axios from 'axios'
export default {
  name: 'Home',
  components: {
    [ContactList.name]:ContactList,
    [ContactEdit.name]:ContactEdit,
    [Popup.name]:Popup
  },

  
  data(){
      return {
          list:[],
          instance:null,
          showEdit:false,//编辑弹窗得显示
          editingContact:{},//正在编辑的联系人
          isEdit:false //新建或者编辑
      }
  },
  created(){
    this.instance = axios.create({
         baseURL:'http://localhost:9000/api',
         timeout:1000
    })
    this.getList()
  },
  methods:{
      async getList(){
           let  res = await
           this.$Http.getContactList()
           this.list = res.data
    
      },
      onAdd(){
       this.editingContact = {id :this.list.leght};
       this.isEdit= false,
       this.showEdit = true
      },
      onEdit(info){
          this.showEdit= true
          this.isEdit = true
          this.editingContact = info

      },
      async onSave(info){
          if(this.isEdit){

             let res = await
              //编辑保存
              this.$Http.editContact(info)

                if(res.code===200){
                      Toast('编辑成功')
                      this.showEdit= false
                      this.getList()
                  }
          }else{
   
            //    //新建保存 application/json
            //    let res = await
            //    this.$Http.newContactJson(info)
            //     if(res.code===200){
            //            Toast('新建成功')
            //            this.showEdit = false
            //            this.getList() 
            //     }

                
               //新建保存 from-data 
               let res = await
               this.$Http.newContactForm(info,true)
                if(res.code===200){
                       Toast('新建成功')
                       this.showEdit = false
                       this.getList() 
                }

        
          }
      },
      async onDelete(info){
          let res = await
          this.$Http.delContact({
              id:info.id
          })

                if(res.code===200){
                    Toast('删除成功')
                   this.showEdit= false
                   this.getList()
                }

      }

  }
}
</script>
