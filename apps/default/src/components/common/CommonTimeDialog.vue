<template>
  <div>
    <span v-if="title" class="custom-field-title" :class="{ required: isRequired }">{{ title }}</span>
    <v-text-field
      variant="outlined"
      class="xsmall-input"
      density="compact"
      hide-details="auto"
      :class="size"
      readonly
      :disabled="disabled"
      :value="computeTimeVal"
      @click="isTimeDialog = true" />
  </div>
  <v-dialog v-model="isTimeDialog" max-width="380" transition="dialog-bottom-transition" scrollable>
    <v-card>
      <div class="d-flex-center-between pa-3 bg-gray">
        <div><strong>시간 설정</strong></div>
        <v-btn variant="text" density="compact" icon="mdi-close" elevation="0" @click="close" />
      </div>
      <div class="pa-2">
        <div class="small-text">시작시간</div>
        <div class="d-flex align-center">
          <v-select
            v-model="times.startHour"
            :items="timeLange.hour"
            @change="changeStart"
            hide-details
            density="compact"
            class="w50p"></v-select>
          <v-select
            v-model="times.startMinute"
            :items="timeLange.min"
            @change="changeStart"
            hide-details
            density="compact"
            class="w50p"></v-select>
        </div>
        <div class="small-text mt-3">종료시간</div>
        <div class="d-flex align-center">
          <v-select
            v-model="times.endHour"
            :items="timeLange.hour"
            :disabled="!customDuration"
            hide-details
            density="compact"
            class="w50p"></v-select>
          <v-select
            v-model="times.endMinute"
            :items="timeLange.min"
            :disabled="!customDuration"
            hide-details
            density="compact"
            class="w50p"></v-select>
        </div>
        <div class="small-text mt-3">소요시간</div>
        <div>
          <v-btn
            v-for="item in arrayDuration"
            :key="item"
            @click="clickDuration(item)"
            size="small"
            variant="tonal"
            :color="duration === item ? 'primary' : 'black'"
            class="mr-1 mb-1 time-btn"
            >{{ '+' + item + '분' }}</v-btn
          >
        </div>
        <v-btn
          @click="clickDuration('custom')"
          size="small"
          variant="tonal"
          :color="customDuration ? 'primary' : 'black'"
          >직접 입력</v-btn
        >
      </div>
      <div v-if="alertInfo.isShow" class="text-center pb-2">
        <small class="txt-red"> {{ alertInfo.alertMsg }}</small>
      </div>
      <v-card-actions>
        <v-btn class="w100p" variant="tonal" color="primary" @click="submit"> 선택 </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { computed, ref, Ref, watchEffect, SetupContext } from 'vue';

interface TimeLange {
  hour: string[];
  min: string[];
}

interface AlertType {
  isShow: boolean;
  alertMsg: string;
}

export default {
  name: 'CommonTimeDialog',
  props: {
    title: { type: String, default: undefined },
    isRequired: { type: Boolean, default: false },
    params: {
      type: Object,
      default: () => ({
        startHour: '09',
        startMinute: '00',
        endHour: '18',
        endMinute: '00',
      }),
    },
    disabled: { type: Boolean, default: false },
    size: { type: String, default: 'fit' },
  },
  setup(props: any, context: SetupContext) {
    const isTimeDialog = ref(false);

    const times = ref({
      startHour: props.params.startHour || undefined,
      startMinute: props.params.startMinute || undefined,
      endHour: props.params.endHour || undefined,
      endMinute: props.params.endMinute || undefined,
    });

    const timeLange: TimeLange = {
      hour: Array.from({ length: 18 }, (_, i) => (i + 6).toString().padStart(2, '0')),
      min: ['00', '10', '20', '30', '40', '50'],
    };

    const arrayDuration = [30, 60, 90, 120, 180];
    const customDuration = ref(true);

    const alertInfo: Ref<AlertType> = ref({
      isShow: false,
      alertMsg: '',
    });

    const duration = ref(0);

    const changeStart = () => {
      if (customDuration.value) return;

      const startTime = new Date(0, 0, 0, +times.value.startHour, +times.value.startMinute);
      const endTime = new Date(startTime.getTime() + duration.value * 60000);

      times.value.endHour = endTime.getHours().toString().padStart(2, '0');
      times.value.endMinute = endTime.getMinutes().toString().padStart(2, '0');
    };

    const clickDuration = (item: number | 'custom') => {
      if (item === 'custom') {
        duration.value = 0;
        customDuration.value = true;
      } else {
        if (!times.value.startHour || !times.value.startMinute) {
          showAlertMsg('시작시간을 선택해 주세요.');
          return;
        }

        duration.value = item;

        const startTime = new Date(0, 0, 0, +times.value.startHour, +times.value.startMinute);
        const endTime = new Date(startTime.getTime() + duration.value * 60000);

        times.value.endHour = endTime.getHours().toString().padStart(2, '0');
        times.value.endMinute = endTime.getMinutes().toString().padStart(2, '0');

        customDuration.value = false;
      }
    };

    const showAlertMsg = (msg: string) => {
      if (!alertInfo.value.isShow) {
        alertInfo.value.isShow = true;
        setTimeout(() => {
          alertInfo.value.isShow = false;
        }, 3000);
      }
      alertInfo.value.alertMsg = msg;
    };

    const close = () => {
      isTimeDialog.value = false;
    };

    const submit = () => {
      try {
        if (!times.value.startHour || !times.value.startMinute) throw new Error('시작시간을 선택해 주세요.');
        if (!times.value.endHour || !times.value.endMinute) throw new Error('종료시간을 선택해 주세요.');

        const start = `${times.value.startHour}${times.value.startMinute}`;
        const end = `${times.value.endHour}${times.value.endMinute}`;

        if (start > end) throw new Error('시작시간은 종료시간 이전이어야 합니다.');

        context.emit('update:params', {
          startHour: times.value.startHour,
          startMinute: times.value.startMinute,
          endHour: times.value.endHour,
          endMinute: times.value.endMinute,
        });
        close();
      } catch (error: any) {
        showAlertMsg(error.message);
      }
    };

    const generateTimeArray = () => {
      const times = [];
      for (let hour = 0; hour < 24; hour += 1) {
        for (let minute = 0; minute < 60; minute += 10) {
          const hourFormatted = hour.toString().padStart(2, '0');
          const minuteFormatted = minute.toString().padStart(2, '0');
          times.push(`${hourFormatted}:${minuteFormatted}`);
        }
      }
      return times;
    };

    watchEffect(() => {
      duration.value = 0;
      customDuration.value = true;
    });

    const computeTimeVal = computed(() => {
      const start = `${times.value.startHour || 'HH'}:${times.value.startMinute || 'MM'}`;
      const end = `${times.value.endHour || 'HH'}:${times.value.endMinute || 'MM'}`;
      return `${start} - ${end}`;
    });

    return {
      isTimeDialog,
      times,
      timeLange,
      arrayDuration,
      customDuration,
      alertInfo,
      duration,
      computeTimeVal,
      changeStart,
      clickDuration,
      close,
      submit,
      generateTimeArray,
    };
  },
};
</script>
<style scoped>
.fit {
  width: 110px;
}
.full {
  width: 100%;
}
</style>
