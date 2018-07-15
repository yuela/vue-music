<template>
    <div class="message">
      <div class="info" rel="info">{{message.msg}}</div>
    </div>
</template>

<script>
  import {mapState} from 'vuex'
    export default {
        name: "Message",
      computed:{
        ...mapState({
          message:'message'
        })
      },
      methods:{
        messageChange(){
          if(!this.message.success){
            let timer=setTimeout(()=>{
              this.$store.commit("setMessage",{success:true,msg:''});
            },3000);
            clearTimeout(timer)
          }
        }
      },
      updated(){
          this.messageChange();
      }
    }
</script>

<style scoped lang="scss">
  .message{
    background: lightgrey;
    position: absolute;
    top:50%;
    left:50%;
    z-index:99;
    border-radius: 5px;
    .info{
      background: rgba(0,0,0,.5);
      border-radius:5px;
      padding:10px 15px;
      font-size:1rem;
      color:#fff;
      border:0;
    }
  }

</style>
