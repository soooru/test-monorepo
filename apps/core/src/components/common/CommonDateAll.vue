<template>
  <div>
    <div>
      <span v-if="title" class="custom-field-title" :class="{ required: isRequired }">{{ title }}</span>
      <v-text-field
        variant="outlined"
        class="xsmall-input"
        density="compact"
        hide-details="auto"
        placeholder="YYYY-MM-DD HH:MM ~ YYYY-MM-DD HH:MM"
        :class="size"
        readonly
        :disabled="disabled"
        :value="computedDateVal"
        @click="isDateDialog = true" />
    </div>
    <v-dialog v-model="isDateDialog" max-width="360" transition="dialog-bottom-transition" persistent>
      <v-card>
        <div class="d-flex-center-between pa-3 bg-gray">
          <div><strong>날짜 설정</strong></div>
          <v-btn variant="text" density="compact" icon="mdi-close" elevation="0" @click="close" />
        </div>
        <div class="pa-3 pb-4">
          <div class="small-text mb-1">시작 시간</div>
          <div class="d-flex w100p">
            <CommonDatePicker class="mr-1" size="full" v-model:dateVal="localDateVal.fromDt" />
            <CommonTimePicker v-model:hour="localDateVal.fromHour" v-model:min="localDateVal.fromMin" />
          </div>
          <div class="small-text mb-1 mt-3">종료 시간</div>
          <div class="d-flex w100p">
            <CommonDatePicker class="mr-1" size="full" v-model:dateVal="localDateVal.toDt" />
            <CommonTimePicker v-model:hour="localDateVal.toHour" v-model:min="localDateVal.toMin" />
          </div>
        </div>
        <div class="w100p d-flex">
          <v-btn class="w50p" variant="tonal" rounded="0" @click="close"> 취소 </v-btn>
          <v-btn class="w50p" variant="tonal" rounded="0" color="primary" @click="submit"> 적용 </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { ref, reactive } from 'vue';
import { defineComponent, computed } from 'vue';
import CommonDatePicker from '@/components/common/CommonDatePicker.vue';
import CommonTimePicker from '@/components/common/CommonTimePicker.vue';
type DateValType = {
  fromDt: string;
  fromHour: string;
  fromMin: string;
  toDt: string;
  toHour: string;
  toMin: string;
};
export default defineComponent({
  name: 'CommonDateAll',
  props: {
    title: { type: String, default: undefined },
    isRequired: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    size: { type: String, default: 'fit' },
    totalDate: {
      type: Object as () => DateValType,
      default: () => {
        return {
          fromDt: '',
          fromHour: '',
          fromMin: '',
          toDt: '',
          toHour: '',
          toMin: '',
        };
      },
    },
  },
  components: { CommonDatePicker, CommonTimePicker },
  setup(props, context) {
    const isDateDialog = ref(false);

    const clonedObject = reactive(JSON.parse(JSON.stringify(props.totalDate)));
    const originDateVal = ref<DateValType>(clonedObject);

    // 부모요소에서 받아온 값 초기화
    let localDateVal = ref<DateValType>(props.totalDate);

    const computedDateVal = computed(() => {
      const { fromDt, fromHour, fromMin, toDt, toHour, toMin } = localDateVal.value;
      const from = `${fromDt} ${fromHour}:${fromMin} `;
      const to = `${toDt} ${toHour}:${toMin} `;
      return `${from} ~ ${to}`;
    });

    const close = () => {
      localDateVal.value = { ...originDateVal.value };
      context.emit('update:totalDate', localDateVal.value);
      isDateDialog.value = false;
    };
    const submit = () => {
      context.emit('update:totalDate', localDateVal.value);
      isDateDialog.value = false;
    };
    return { isDateDialog, computedDateVal, localDateVal, originDateVal, close, submit };
  },
});
</script>

<style scoped></style>
