<template>
  <v-select
    v-model="selectedList"
    :items="localItemList"
    item-title="text"
    item-value="val"
    multiple
    variant="outlined"
    density="compact"
    class="mutliselect-input"
    :placeholder="placeholder"
    hide-details>
    <template v-slot:selection="{ item, index }"> <span v-if="index !== 0">,</span> {{ item.title }} </template>
    <template v-if="isAllCheck" v-slot:prepend-item>
      <v-list-item title="전체" @click="allToggle">
        <template v-slot:prepend>
          <v-checkbox-btn
            :color="checkAllMarker ? 'indigo-darken-4' : undefined"
            :indeterminate="selectedList.length > 0 && !checkAllMarker"
            :model-value="checkAllMarker" />
        </template>
      </v-list-item>
    </template>
  </v-select>
</template>

<script lang="ts">
import { watch } from 'vue';
import { defineComponent, ref, toRef, computed } from 'vue';

export default defineComponent({
  name: 'CommonMultiSelect',
  props: {
    placeholder: {
      type: String,
      default: '선택',
    },
    isAllCheck: {
      type: Boolean,
      default: true,
    },
    itemList: {
      type: Array as () => { text: string; val: string; [key: string]: any }[],
      default: () => [],
    },
    selectedVal: {
      type: Array as () => string[],
      default: () => [],
    },
  },
  setup(props, context) {
    let selectedList = ref<string[]>(props.selectedVal || []);
    const localItemList = toRef(props.itemList);

    const checkAllMarker = computed(() => {
      return localItemList.value.length === selectedList.value.length;
    });

    watch(selectedList, () => {
      context.emit('update:selectedVal', selectedList.value);
    });

    const allToggle = () => {
      if (checkAllMarker.value) {
        selectedList.value = [];
      } else {
        selectedList.value = localItemList.value.map(item => item.val);
      }
    };

    return { selectedList, checkAllMarker, localItemList, allToggle };
  },
});
</script>

<style scoped></style>
