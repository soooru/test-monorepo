<template>
  <div :class="{ 'fixed-footer': fixed }" class="small-text text-left px-3 bg-none w100p">
    ⓒ Corp. All rights reserved.
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CommonFooter',
  props: {
    fixed: {
      type: Boolean,
      default: true,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped>
.fixed-footer {
  position: absolute;
  bottom: 0px;
}
</style>
