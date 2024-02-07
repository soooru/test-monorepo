<template>
  <div class="cursor-pointer" :width="width">
    <v-btn variant="plain" @click="clickedLogo">회사 로고</v-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'CommonLogo',
  props: {
    width: {
      type: String,
      default: '100px',
    },
  },
  setup() {
    const $router = useRouter();
    const clickedLogo = () => {
      // 현재 라우트가 /mr 이 아니라면
      if ($router.currentRoute.value.path !== '/mr') {
        $router.push('/mr');
      }
    };
    return { clickedLogo };
  },
});
</script>
