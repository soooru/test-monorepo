<template>
  <div class="pa-3 text-left small-text">
    <h4>전역 컴포넌트 : 알림창</h4>
    <v-card variant="outlined" color="gray" class="pa-2 my-2">
      <div class="mb-2">
        <v-btn class="mr-2" @click="alertParam.isOpen = true" size="small">Alert 알림</v-btn>
        <BaseAlertDialog :parentData="alertParam" @close="alertParam.isOpen = false" />
        <v-btn @click="confirmAlertParam.isOpen = true" size="small">Confirm 알림</v-btn>
        <BaseAlertDialog :parentData="confirmAlertParam" @close="confirmAlertParam.isOpen = false" />
      </div>
    </v-card>
    <h4>전역 컨포넌트 : 스낵바 (Toast)</h4>
    <v-card variant="outlined" color="gray" class="pa-2 my-2">
      <div>
        <v-btn
          @click="
            () => {
              snackBarParam.isOpen = true;
              snackBarParam.timeOut = 1000;
            }
          "
          size="small"
          class="mr-2"
          >스낵바(타임아웃)</v-btn
        >
        <v-btn
          @click="
            () => {
              snackBarParam.isOpen = true;
              snackBarParam.timeOut = -1;
            }
          "
          size="small"
          >스낵바(닫기버튼)</v-btn
        >
        <BaseSnackBar :parentData="snackBarParam" @close="snackBarParam.isOpen = false" />
      </div>
    </v-card>
    <h4>API 호출</h4>
    <v-card variant="outlined" color="gray" class="pa-2 my-2">
      <div>
        <v-btn @click="axiosTest(0)" size="small" class="mr-2"> API 호출 : axios.get('/') </v-btn>
        <v-btn @click="axiosTest(1)" size="small"> API 호출 : axios.post('/new') </v-btn>
      </div>
      <div v-if="axiosRes" class="small-text mt-2">호출결과: {{ axiosRes }}</div>
    </v-card>
    <h4>기본 텍스트 필드</h4>
    <v-card variant="outlined" color="gray" class="pa-2 my-2 d-flex">
      <div class="w50p pa-1">
        <BaseTextField class="mb-2" placeholder="안내" isRequired title="항목필수" v-model:textVal="textVal.idText" />
        <BaseTextField placeholder="입력 불가" v-model:textVal="textVal.readonlyText" disabled />
      </div>
      <div class="w50p pa-1">
        <BaseTextField
          class="mb-2"
          placeholder="비밀번호"
          type="password"
          title="패스워드"
          v-model:textVal="textVal.pwdText" />
        <BaseTextField placeholder="숫자" type="commanum" v-model:textVal="textVal.moneyNum" />
      </div>
    </v-card>
    <h4>날짜 및 시간</h4>
    <v-card variant="outlined" color="gray" class="pa-2 my-2 d-flex">
      <div class="w50p pa-1">
        <CommonDatePicker class="mb-2" v-model:dateVal="dateVal.val1" isConfirm title="하단 버튼형" />
        <CommonDatePicker class="mb-2" v-model:dateVal="dateVal.val2" isRequired title="기본 필수형" />
        <CommonDatePicker class="mb-2" v-model:dateVal="dateVal.val3" disabled />
        <CommonFromToPicker v-model:fromVal="dateVal.fromVal" v-model:toVal="dateVal.toVal" title="FROM에서 TO" />
      </div>
      <div class="w50p pa-1">
        <CommonTimePicker
          class="mb-2"
          v-model:hour="timeVal.hour"
          v-model:min="timeVal.min"
          clearable
          title="시간과 분"
          isRequired />
        <CommonTimePicker class="mb-2" v-model:hour="timeVal.hour" v-model:min="timeVal.min" disabled />
        <CommonTimeDialog v-model:params="timeVal.params" title="시간 다이얼로그" />
        <CommonDateAll class="mt-2" title="날짜 시간 통합" v-model:totalDate="totalDate" />
      </div>
    </v-card>
  </div>
</template>

<script lang="ts">
import { ref, toRef, defineComponent } from 'vue';
import TutorialDataService from '@/services/tutorial/tutorialDataService';
import CommonDatePicker from '@/components/common/CommonDatePicker.vue';
import CommonFromToPicker from '@/components/common/CommonFromToPicker.vue';
import CommonTimePicker from '@/components/common/CommonTimePicker.vue';
import CommonTimeDialog from '@/components/common/CommonTimeDialog.vue';
import CommonDateAll from '@/components/common/CommonDateAll.vue';
export default defineComponent({
  name: 'ExamplePage',
  components: { CommonDatePicker, CommonFromToPicker, CommonTimePicker, CommonTimeDialog, CommonDateAll },
  data() {
    return { snackBar: true };
  },
  setup() {
    // 알림, 스낵바
    const alertParam = toRef({
      isOpen: false,
      title: '알림',
      body: '알림을 실행하셨습니까?',
      persistent: true,
    });
    const confirmAlertParam = toRef({
      isOpen: false,
      title: 'Confirm',
      body: '어떤 것에 동의 하십니까?',
      isConfirm: true,
      submitCallback: () => {
        alert('콜백 함수 실행됨');
      },
    });
    const snackBarParam = toRef({
      isOpen: false,
      text: '스낵바 테스트',
      timeOut: 2000,
    });

    // api 호출
    let axiosRes = ref(null);
    const axiosTest = async (index: number) => {
      let testRes;
      if (index === 0) {
        testRes = await TutorialDataService.getList();
      } else {
        testRes = await TutorialDataService.addNew({
          userId: 'string',
          username: 'string',
        });
      }
      if (testRes) axiosRes.value = testRes;
    };

    //input
    let textVal = ref({ idText: '', readonlyText: '오직 읽기만', pwdText: '', moneyNum: '12345' });
    let dateVal = ref({ val1: '', val2: '2024-03-01', val3: '2024-01-01', fromVal: '2024-01-08', toVal: '' });
    let timeVal = ref({
      hour: '12',
      min: '',
      params: { startHour: null, startMinute: '00', endHour: null, endMinute: null },
    });
    let isTimeDialog = ref(false);
    let totalDate = ref({
      fromDt: '',
      fromHour: '',
      fromMin: '',
      toDt: '',
      toHour: '',
      toMin: '',
    });

    return {
      alertParam,
      confirmAlertParam,
      snackBarParam,
      axiosTest,
      axiosRes,
      textVal,
      dateVal,
      timeVal,
      isTimeDialog,
      totalDate,
    };
  },
});
</script>

<style scoped></style>
