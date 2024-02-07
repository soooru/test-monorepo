<template>
  <div class="common-date-picker">
    <span v-if="title" class="custom-field-title" :class="{ required: isRequired }">{{ title }}</span>
    <div :class="size">
      <v-menu v-model="isDatePicker" transition="slide-y-transition" :close-on-content-click="false">
        <template v-slot:activator="{ props }">
          <v-text-field
            v-bind="props"
            v-model="currentDateVal"
            variant="outlined"
            density="compact"
            :disabled="disabled"
            hide-details="auto"
            placeholder="YYYY-MM-DD"
            class="xsmall-input"
            width="100px" />
        </template>
        <v-card class="picker-wrap">
          <v-date-picker
            v-model="localDateVal"
            hide-header
            :min="min"
            :max="max"
            @update:modelValue="changeDate(false)"></v-date-picker>
          <div v-if="isConfirm" class="d-flex">
            <v-btn class="w50p" size="small" variant="tonal" rounded="0" @click="isDatePicker = false"> Cancel </v-btn>
            <v-btn class="w50p" size="small" variant="tonal" rounded="0" color="primary" @click="changeDate(true)">
              Save
            </v-btn>
          </div>
        </v-card>
      </v-menu>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import { useDate } from 'vuetify';

export default defineComponent({
  name: 'CommonDatePicker',
  props: {
    dateVal: { type: String, default: undefined, required: true },
    title: { type: String, default: undefined },
    isRequired: { type: Boolean, default: false },
    isConfirm: { type: Boolean, default: false },
    min: { type: String, default: '1900-01-01' },
    max: { type: String, default: '2100-12-31' },
    disabled: { type: Boolean, default: false },
    size: { type: String, default: 'fit' },
  },
  setup(props, context) {
    const adapter = useDate();

    // 부모로부터 받은 날짜 초기화
    const propsDateVal = props.dateVal || '';
    let currentDateVal = ref(propsDateVal);
    let localDateVal = ref(adapter.parseISO(propsDateVal));

    // datepicker 토글
    const isDatePicker = ref(false);

    // 날짜 변경
    const changeDate = (isBtn: boolean) => {
      if (isBtn || !props.isConfirm) {
        currentDateVal.value = adapter.toISO(localDateVal.value);
        context.emit('update:dateVal', currentDateVal.value);
        isDatePicker.value = false;
      }
    };

    return { isDatePicker, localDateVal, currentDateVal, changeDate };
  },
});
</script>

<style scoped>
.common-date-picker {
  flex-grow: 1;
}
.fit {
  width: 100px;
}
.full {
  width: 100%;
}
.picker-wrap {
  width: 260px;
}
</style>
