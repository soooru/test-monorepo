<template>
  <div class="common-date-picker">
    <span v-if="title" class="custom-field-title" :class="{ required: isRequired }">{{ title }}</span>
    <div class="d-flex" :class="size">
      <v-menu v-model="isFromDatePicker" transition="slide-y-transition" :close-on-content-click="false">
        <template v-slot:activator="{ props }">
          <v-text-field
            v-bind="props"
            v-model="currentFromVal"
            variant="outlined"
            density="compact"
            :disabled="disabled"
            hide-details="auto"
            placeholder="YYYY-MM-DD"
            class="xsmall-input mr-1" />
        </template>
        <v-card class="picker-wrap">
          <v-date-picker
            v-model="localFromVal"
            hide-header
            :min="min"
            :max="max"
            @click="changeFromDate"></v-date-picker>
        </v-card>
      </v-menu>
      <v-menu v-model="isToDatePicker" transition="slide-y-transition" :close-on-content-click="false">
        <template v-slot:activator="{ props }">
          <v-text-field
            v-bind="props"
            v-model="currentToVal"
            variant="outlined"
            density="compact"
            :disabled="disabled"
            hide-details="auto"
            placeholder="YYYY-MM-DD"
            class="xsmall-input" />
        </template>
        <v-card class="picker-wrap">
          <v-date-picker
            v-model="localToVal"
            hide-header
            :min="localFromVal"
            :max="max"
            @click="changeToDate"></v-date-picker>
        </v-card>
      </v-menu>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import { useDate } from 'vuetify';

export default defineComponent({
  name: 'CommonFromToPicker',
  props: {
    fromVal: { type: String, default: undefined, required: true },
    toVal: { type: String, default: undefined, required: true },
    title: { type: String, default: undefined },
    isRequired: { type: Boolean, default: false },
    min: { type: String, default: '1900-01-01' },
    max: { type: String, default: '2100-12-31' },
    disabled: { type: Boolean, default: false },
    size: { type: String, default: 'fit' },
  },
  setup(props, context) {
    const adapter = useDate();

    // 부모로부터 받은 날짜 초기화
    const propsFromVal = props.fromVal || '';
    const propsToVal = props.toVal || '';

    let currentFromVal = ref(propsFromVal);
    let localFromVal = ref(adapter.parseISO(propsFromVal));

    let currentToVal = ref(propsToVal);
    let localToVal = ref(adapter.parseISO(propsToVal));

    // datepicker 토글
    const isFromDatePicker = ref(false);
    const isToDatePicker = ref(false);

    // 날짜 변경
    const changeFromDate = () => {
      currentFromVal.value = adapter.toISO(localFromVal.value);
      context.emit('update:fromVal', currentFromVal.value);
      isFromDatePicker.value = false;
    };

    const changeToDate = () => {
      currentToVal.value = adapter.toISO(localToVal.value);
      context.emit('update:toVal', currentToVal.value);
      isToDatePicker.value = false;
    };

    return {
      isFromDatePicker,
      localFromVal,
      currentFromVal,
      changeFromDate,
      isToDatePicker,
      localToVal,
      currentToVal,
      changeToDate,
    };
  },
});
</script>

<style scoped>
.fit {
  width: 200px;
}
.full {
  width: 100%;
}
.picker-wrap {
  width: 260px;
}
</style>
