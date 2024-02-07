<template>
  <div>
    <h1>Dashboard</h1>
    <v-btn @click="tempChangeCompany">회사 변경</v-btn>
    <div class="small-grey-text">
      <br />
      회사가 변경될 일은 거의 없으므로 새로고침 하면 변경됩니다. <br />
      현재 거래처 : {{ clientId }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '@/stores/user-store';

export default defineComponent({
  name: 'DashBoard',
  setup() {
    const route = useRoute();
    const tempChangeCompany = () => {
      const user = useUserStore();
      const clientId = user.clientId;
      if (clientId === 'ClientA') {
        user.setClientId('ClientB');
      } else {
        user.setClientId('ClientA');
      }
    };
    return {
      route,
      clientId: useUserStore().clientId,
      tempChangeCompany,
    };
  },
});
</script>
