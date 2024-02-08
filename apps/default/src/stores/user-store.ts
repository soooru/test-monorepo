import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    clientId: 'ClientA' as string,
    user: {
      userId: null as string | null,
      username: null as string | null,
    },
  }),
  getters: {
    isLoggedIn: state => {
      return state.user.userId !== null;
    },
  },
  actions: {
    setClientId(clientId: string) {
      this.clientId = clientId;
    },
    login(userId: string) {
      // 일련의 로그인 과정
      this.user.userId = userId;
      this.user.username = userId;
    },
    logout() {
      // 일련의 로그아웃 과정
      this.user.userId = null;
      this.user.username = null;
    },
  },
  persist: true,
});
