<template>
  <div>
    <v-menu transition="slide-x-transition">
      <template v-slot:activator="{ props }">
        <v-btn icon v-bind="props">
          <v-avatar color="primary" size="x-small">
            <v-icon icon="mdi-account-circle"></v-icon>
          </v-avatar>
        </v-btn>
      </template>
      <v-card class="pa-2 small-text">
        <div>
          <div>수도권 MR 팀</div>
          <div>
            <strong>{{ userName }}</strong>
          </div>
          <v-divider class="my-2"></v-divider>
          <v-btn size="small" variant="text"> 설정 <v-icon size="small" icon="mdi-cog" /></v-btn>
          <v-btn @click="tryLogout" size="small" variant="text">
            로그아웃 <v-icon size="small" icon="mdi-logout" />
          </v-btn>
        </div>
      </v-card>
    </v-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useUserStore } from '@/stores/user-store';
import { useRouter } from 'vue-router';
import { computed } from 'vue';

export default defineComponent({
  name: 'TheAccount',
  setup() {
    const userStore = useUserStore();
    const router = useRouter();

    const userName = computed(() => {
      return userStore.user.username;
    });

    const tryLogout = () => {
      userStore.logout();
      router.push('/login');
    };
    return {
      tryLogout,
      userName,
    };
  },
});
</script>
