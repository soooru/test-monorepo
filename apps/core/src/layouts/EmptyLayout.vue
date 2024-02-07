<template>
  <div class="empty-layout">
    <router-view></router-view>
    <CommonFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CommonFooter from '@/components/common/CommonFooter.vue';

export default defineComponent({
  name: 'EmptyLayout',
  components: { CommonFooter },
  setup() {
    return {};
  },
});
</script>

<style scoped>
.empty-layout {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
