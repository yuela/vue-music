<template>
  <div class="loading">
    <div class="isCenter">
      <img src="../assets/32X32.gif" alt="loading" title="loading">
      <p class="desc">{{title}}</p>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '数据加载中...'
    },
  }
}
</script>

<style lang="scss" scoped>
  .loading {
    width: 100%;
    text-align: center;
    background-color: rgba(0,0,0,.5);
    height: 100%;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index:99;
    .isCenter {
        width:150px;
      padding:20px;
      background-color: #fff;
      margin:100px auto 0;
      >img{
        width:32px;
        height:32px;
      }
      .desc {
        font-size: 1rem;
      }
    }

  }

</style>
