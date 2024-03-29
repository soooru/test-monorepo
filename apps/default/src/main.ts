import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// pinia (store)
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

// Vuetify
import vuetify from './plugins/vuetify';

const app = createApp(App);

app.use(pinia).use(router).use(vuetify).mount('#app');

// 전역 컴포넌트 등록
import BaseAlertDialog from '@/components/common/BaseAlertDialog.vue';
import BaseSnackBar from '@/components/common/BaseSnackBar.vue';
import BaseTextField from '@/components/common/BaseTextField.vue';

app.component('BaseAlertDialog', BaseAlertDialog);
app.component('BaseSnackBar', BaseSnackBar);
app.component('BaseTextField', BaseTextField);
