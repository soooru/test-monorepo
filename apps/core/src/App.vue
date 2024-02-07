<template>
  <router-view />
  <CommonCircleProgress />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import CommonCircleProgress from '@/components/common/CommonCircleProgress.vue';
import '@/assets/css/global.scss';
export default defineComponent({
  name: 'App',
  components: {
    CommonCircleProgress,
  },
});
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
