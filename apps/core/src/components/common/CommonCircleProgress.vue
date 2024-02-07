<template>
  <v-dialog persistent overlay-color="white" v-model="localIsShow">
    <div class="text-center">
      <v-progress-circular indeterminate color="primary" class="ma-auto"></v-progress-circular>
    </div>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useProgressStore } from '@/stores/progress-store';

export default defineComponent({
  name: 'CommonCircleProgress',
  setup() {
    const progressStore = useProgressStore();
    const localIsShow = computed(() => {
      return progressStore.isGlobalProgress;
    });
    return { localIsShow };
  },
});
</script>
