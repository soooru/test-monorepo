<template>
  <v-snackbar v-model="localData.isOpen" :timeout="localData.timeOut" @update:modelValue="closeSnackbar">
    <span class="contents-text">{{ localData.text }} </span>
    <template v-if="localData.timeOut === -1" v-slot:actions>
      <v-btn color="white" variant="text" size="small" @click="closeSnackbar"> 닫기 </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
import { ref, defineComponent, watch } from 'vue';

interface PropsType {
  isOpen: boolean;
  text: string;
  timeOut?: number | undefined; // "-1" : close button , "undefined" : timeout 2000 , "number" : timeout number(ms)
}

export default defineComponent({
  props: {
    parentData: {
      type: Object as () => PropsType,
      required: true,
    },
  },
  setup(props, context) {
    const initLocalData = (data: PropsType) => {
      return {
        isOpen: data.isOpen,
        text: data.text,
        timeOut: data.timeOut === -1 ? -1 : 2000,
      };
    };

    let localData = ref(initLocalData(props.parentData));

    watch(
      () => props.parentData,
      newVal => {
        localData.value = initLocalData(newVal);
      },
      { deep: true }
    );

    const closeSnackbar = () => {
      localData.value.isOpen = false;
      context.emit('close');
    };

    return { localData, closeSnackbar };
  },
});
</script>
