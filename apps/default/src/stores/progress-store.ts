import { defineStore } from 'pinia';

export const useProgressStore = defineStore('progress', {
  state: () => ({
    isGlobalProgress: false,
  }),
  actions: {
    setProgress(state: boolean) {
      this.isGlobalProgress = state;
    },
    showTimeProgress() {
      if (this.isGlobalProgress) return;
      this.isGlobalProgress = true;
      setTimeout(() => {
        this.isGlobalProgress = false;
      }, 1000);
    },
  },
});
