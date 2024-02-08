<template>
  <div>
    <v-avatar :src="data.imgSrc" size="80" color="grey"><v-icon icon="mdi-face-man"></v-icon></v-avatar>
    <div class="mt-3 profile-name">{{ data.name }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'contProfile',
  props: {
    data: {
      type: Object,
      default: () => {
        return {
          name: 'OOO',
          imgSrc: '',
        };
      },
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped>
.profile-name {
  font-size: 1.3rem;
}
</style>
