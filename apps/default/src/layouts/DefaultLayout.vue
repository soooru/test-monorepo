<template>
  <v-app>
    <v-layout>
      <!-- left nav  -->
      <v-navigation-drawer v-model="globalNavDrawer" class="pa-0 ma-0">
        <TheGlobalNavList type="ad" @clickMenu="changeMenu" />
      </v-navigation-drawer>
      <!-- header  -->
      <v-app-bar elevation="0" density="compact" class="gloabl-app-bar">
        <v-btn @click="toggleGlobalNav" icon="mdi-menu" variant="flat" density="compact" />
        <v-app-bar-title>{{ currentMenu.label }}</v-app-bar-title>
        <template v-slot:append>
          <TheAccount />
        </template>
      </v-app-bar>
      <!-- contents  -->
      <v-main class="overflow-auto">
        <TheMenuTab :currentMenu="currentMenu" @changeMenu="changeMenu" />
        <router-view></router-view>
      </v-main>
    </v-layout>
  </v-app>
</template>
<script lang="ts">
import { ref } from 'vue';
import { defineComponent } from 'vue';
import { MenuItemType } from '@/types/interface/menu';

import TheGlobalNavList from '@/components/TheGlobalNavList.vue';
import TheAccount from '@/components/TheAccount.vue';
import TheMenuTab from '@/components/TheMenuTab.vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'DefaultLayout',
  components: {
    TheGlobalNavList,
    TheAccount,
    TheMenuTab,
  },
  setup() {
    const $router = useRouter();
    const { path, meta } = $router.currentRoute.value;

    // 기본값
    let currentTab = { id: '0', label: 'Home', key: '/ad' };

    // 메뉴에 label이 있으면
    if (meta.label) currentTab = { id: meta.id as string, label: meta.label as string, key: path };

    const globalNavDrawer = ref(false);
    const currentMenu = ref<MenuItemType>(currentTab);

    // methods
    const toggleGlobalNav = () => {
      globalNavDrawer.value = !globalNavDrawer.value;
    };
    const changeMenu = (menu: MenuItemType) => {
      currentMenu.value = menu;
      $router.push(menu.key);
    };
    return { globalNavDrawer, currentMenu, toggleGlobalNav, changeMenu };
  },
});
</script>
<style lang="scss" scoped>
.gloabl-app-bar {
  border-bottom: 1px solid;
  border-color: rgba(var(--v-border-color), var(--v-border-opacity));
}
</style>
