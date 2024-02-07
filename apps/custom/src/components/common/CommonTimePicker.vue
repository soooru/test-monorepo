<template>
  <div>
    <span v-if="title" class="custom-field-title" :class="{ required: isRequired }">{{ title }}</span>
    <div class="d-flex-center" :class="size">
      <v-select
        v-model="localHour"
        @update:modelValue="handleChange('h')"
        :clearable="clearable"
        placeholder="HH"
        :items="hours"
        variant="outlined"
        density="compact"
        class="xsmall-input w50p mr-1"
        hide-details="auto"
        :disabled="disabled" />
      <v-select
        v-model="localMin"
        @update:modelValue="handleChange('m')"
        :clearable="clearable"
        placeholder="MM"
        :items="mins"
        variant="outlined"
        density="compact"
        class="xsmall-input w50p"
        hide-details="auto"
        :disabled="disabled" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  props: {
    title: { type: String, default: undefined },
    isRequired: { type: Boolean, default: false },
    hour: { type: String, default: undefined },
    min: { type: String, default: undefined },
    size: { type: String, default: 'fit' },
    disabled: { type: Boolean, default: false },
    clearable: { type: Boolean, default: false },
  },
  setup(props, context) {
    // 리스트 초기화
    function initList() {
      const hours = [];
      for (let i = 0; i < 24; i++) {
        const hour = i < 10 ? `0${i}` : `${i}`;
        hours.push(hour);
      }
      const mins = [];
      for (let i = 0; i < 60; i += 10) {
        const min = i < 10 ? `0${i}` : `${i}`;
        mins.push(min);
      }
      return { hours, mins };
    }
    const { hours, mins } = initList();

    // 부모요소에서 받아온 값 초기화
    let localHour = ref(props.hour || undefined);
    let localMin = ref(props.min || undefined);

    const handleChange = (val: string) => {
      if (val === 'h') {
        context.emit('update:hour', localHour.value);
      }
      if (val === 'm') {
        context.emit('update:min', localMin.value);
      }
    };

    return { hours, mins, localHour, localMin, handleChange };
  },
  methods: {},
});
</script>

<style scoped>
.fit {
  width: 180px;
}
.full {
  width: 100%;
}
</style>
