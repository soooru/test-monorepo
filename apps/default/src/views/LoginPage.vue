<template>
  <div class="login-wrap">
    <div class="login-container">
      <div class="mb-4 text-left">
        <div>회사 로고</div>
        <div class="small-grey-text">로그인 공지사항</div>
      </div>
      <v-card class="mb-3 pa-4">
        <BaseTextField class="mb-1" placeholder="아이디" v-model:textVal="idText" @keyup.enter="tryLogin" />
        <BaseTextField
          class="mb-2"
          placeholder="비밀번호"
          type="password"
          v-model:textVal="pwdText"
          @keyup.enter="tryLogin" />
        <v-btn class="w100p mb-1" color="primary" @click="tryLogin">로그인</v-btn>
        <v-checkbox label="로그인 상태 유지" density="compact" hide-details="auto" color="primary" />
      </v-card>
      <div class="pt-2">
        <router-link to="/pwdreset">
          <v-btn class="w100p mb-1" variant="text" color="primary"
            ><span class="small-text">비밀번호 재설정</span></v-btn
          >
        </router-link>
      </div>
    </div>
    <BaseAlertDialog :parentData="alertParam" @close="alertParam.isOpen = false" />
  </div>
  <CommonFooter />
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import { useUserStore } from '@/stores/user-store';
import { useRouter } from 'vue-router';
import CommonFooter from '@/components/common/CommonFooter.vue';

export default defineComponent({
  name: 'LoginPage',
  components: { CommonFooter },
  setup() {
    let idText = ref('');
    let pwdText = ref('');

    const userStore = useUserStore();
    const router = useRouter();

    const tryLogin = () => {
      // TODO: 로그인 처리
      if (idText.value === '') {
        alertParam.value.isOpen = true;
        return;
      }
      userStore.login('홍길동');
      router.push('/ad');
    };

    const alertParam = ref({
      isOpen: false,
      title: '로그인 정보를 확인해주세요',
      body: '비밀번호가 기억나지 않을 경우 비밀번호 재설정을 해주세요. <br/> 10회 이상 로그인 실패 시 비밀번호 재설정이 필요합니다.',
      persistent: true,
    });

    return {
      idText,
      pwdText,
      tryLogin,
      alertParam,
    };
  },
});
</script>
<style scoped lang="scss">
.login-wrap {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  @media #{$breakpoints-only-xs} {
    align-items: flex-start;
    padding-top: 80px;
    background: #fceed980;
    .login-container {
      min-width: 300px;
      width: calc(100% - 30px);
    }
  }
  .login-container {
    width: 400px;
  }
}
</style>
