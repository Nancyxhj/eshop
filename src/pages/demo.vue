<template>
  <div class="box">
    <!-- 输入完成时触发方法 -->
    <input type="text" v-model="userInput" @keyup.enter="addTask">
    <ul>
      <li v-for="(item,index) in lists" :key="index"><input type="checkbox"  @click="checkItem($event,index)" :checked="item.isDone"> <input type="text" v-model="item.task "><button class="delete"
          v-show="item" @click="delTodo(index)">删除</button></li>
    </ul>
    <div class="bottom" v-show="lists.length>0"><input type="checkbox" @click="checkAll" :checked="allDone" >全选<button class="delete" @click="deleteAll">全部删除</button></div>
  </div>
</template>

<script>
export default {
  name: 'DEMO',
  data() {
    return {
      // 用户输入
      userInput: '',
      // 任务列表
      lists: [],
      allDone:false
 
    }
  },
  methods: {
    addTask() {
      this.lists.push({
        task:this.userInput,
        isDone:false
      });
      this.userInput = '';
    },
    delTodo(index) {
      this.lists.splice(index, 1);
    },
    // 全部删除
    deleteAll() {
      this.lists = [];
    },
    checkItem(e,index){
      if(e.target.checked){
         this.lists[index].isDone=true
      }else{this.lists[index].isDone=false}
      this.allDone=this.lists.every(item=>item.isDone)
    },
    checkAll(e){

    // 全选与取消全选，这块很妙，上方的isDone跟全选状态保持一致
      this.lists.forEach(item=>{item.isDone=e.target.checked})
  }


  }
  
}



</script>

<style scoped>
.box {
  width: 600px;
  margin: 0 auto;
  font-size: 18px;
  border: 1px solid #333;
}

.box>input {
  width: 595px;
  height: 50px;
  /* 在box内居中 */
  margin: 0 auto;

}

.box ul {
  list-style: none;
  padding: 10px;
  border: 1px solid #333;
}

ul>li {
  margin: 10px;
}

.delete {
  float: right;
  background-color: #f44336;
  border: 1px solid #f44336;
  color: white;
  text-align: center;
  font-size: 16px;


}
/* 底部全选框 */
.bottom {
  width: 600px;
  height: 50px;
  border: 1px solid #333;
  line-height: 50px;
}
.bottom>input {
  margin-left:10px;
}
.bottom>button {
  margin:15px ;
}

</style>