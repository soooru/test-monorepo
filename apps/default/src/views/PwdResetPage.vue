<template>
  <div>
    <div class="border-bottom d-flex-center-between pa-2 mb-10">
      <h3>비밀번호 재설정</h3>
      <router-link to="/login">
        <v-btn density="compact" icon="mdi-close" elevation="0" />
      </router-link>
    </div>
    <div class="d-flex-center">
      <v-card class="pa-4 pwdreset-card">
        <div v-show="step === 1">
          <BaseTextField class="mb-1" placeholder="아이디" title="아이디" v-model:textVal="idText" />
          <v-btn class="w100p mb-1" color="primary">
            <span class="small-text" @click="sendResetRequest">휴대폰 번호로 전송</span>
          </v-btn>
          <v-progress-circular v-show="progressing" class="mt-3" indeterminate color="primary" />
        </div>
        <div v-show="step === 2">
          <v-form>
            <BaseTextField
              class="mb-1"
              placeholder="신규 비밀번호를 입력해 주세요"
              title="신규 비밀번호"
              v-model:textVal="newPwd" />
            <BaseTextField
              class="mb-1"
              placeholder="동일한 비밀번호를 입력해 주세요."
              title="비밀번호 확인"
              v-model:textVal="newPwdConfirm" />
          </v-form>
          <v-btn class="w100p mb-1" color="primary">
            <span class="small-text" @click="tryChangePwd">비밀번호 변경 완료</span>
          </v-btn>
          <v-progress-circular v-show="progressing" class="mt-3" indeterminate color="primary" />
        </div>
      </v-card>
    </div>
  </div>
  <CommonFooter />
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import CommonFooter from '@/components/common/CommonFooter.vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'PwdResetPage',
  components: { CommonFooter },
  setup() {
    let idText = ref('');
    let newPwd = ref('');
    let newPwdConfirm = ref('');
    let progressing = ref(false);
    let step = ref(1);
    const router = useRouter();
    const sendResetRequest = () => {
      progressing.value = true;
      setTimeout(() => {
        progressing.value = false;
        step.value = 2;
      }, 1000);
    };
    const tryChangePwd = () => {
      // TODO : 패스워드 변경 처리
      progressing.value = true;
      setTimeout(() => {
        router.push('/login');
      }, 1000);
    };
    return { idText, newPwd, newPwdConfirm, step, progressing, sendResetRequest, tryChangePwd };
  },
});
</script>

<style lang="scss" scoped>
.pwdreset-card {
  width: 400px;
  @media #{$breakpoints-only-xs} {
    min-width: 300px;
    width: calc(100% - 30px);
  }
}
</style>
