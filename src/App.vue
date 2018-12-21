<template>
  <div id="app">
    <router-view v-wechat-title="$route.meta.title"></router-view>
    <myFooter></myFooter>
  </div>
</template>

<script>
import myFooter from '../src/views/Footer/footer'
export default {
  name: 'App',
  components:{
    myFooter
  },
}
</script>

<style>

</style>
