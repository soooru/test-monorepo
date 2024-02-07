<template>
  <v-app>
    <v-layout>
      <!-- mobile nav  -->
      <template v-if="$vuetify.display.mdAndDown">
        <!-- drawer  -->
        <v-navigation-drawer v-model="globalNavDrawer" width="100%" class="pa-0 ma-0" location="right">
          <TheGlobalNavList type="mr" :menuList="menuList" @clickMenu="changeMenu" @clickClose="toggleGlobalNav" />
        </v-navigation-drawer>
        <!-- header  -->
        <v-app-bar elevation="0" density="compact" class="gloabl-app-bar">
          <CommonLogo class="ml-3" />
          <div class="d-flex-center app-bar-right">
            <TheAccount />
            <v-btn @click="toggleGlobalNav" icon="mdi-menu" variant="flat" density="compact" size="small" />
          </div>
        </v-app-bar>
      </template>
      <!-- pc nav  -->
      <template v-else>
        <v-app-bar elevation="0" density="compact" class="gloabl-app-bar">
          <div class="d-flex-center-between w100p">
            <ThePCNavPanel :menuList="menuList" @clickMenu="changeMenu" />
            <TheAccount />
          </div>
        </v-app-bar>
      </template>
      <!-- contents  -->
      <v-main class="overflow-y-auto mr-main bg-lightgray">
        <div>
          <router-view></router-view>
        </div>
        <CommonFooter :fixed="false" />
      </v-main>
    </v-layout>
  </v-app>
</template>
<script lang="ts">
import { ref, defineComponent, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';

import { MenuItemType } from '@/types/interface/menu';

import TheGlobalNavList from '@/components/TheGlobalNavList.vue';
import ThePCNavPanel from '@/components/ThePCNavPanel.vue';
import TheAccount from '@/components/TheAccount.vue';
import CommonLogo from '@/components/common/CommonLogo.vue';
import CommonFooter from '@/components/common/CommonFooter.vue';

import MenuDataService from '@/services/menu/menuDataService';

export default defineComponent({
  name: 'MRLayout',
  components: {
    TheGlobalNavList,
    TheAccount,
    ThePCNavPanel,
    CommonLogo,
    CommonFooter,
  },
  setup() {
    const $router = useRouter();
    const { path, meta } = $router.currentRoute.value;
    const systemType = 'mr';

    // 메뉴 불러오기
    const menuList = ref([] as MenuItemType[]);
    const getMenuList = async () => await MenuDataService.getList(systemType);
    onBeforeMount(async () => {
      menuList.value = await getMenuList();
    });

    // 현재 메뉴 설정
    let currentTab = { id: '0', label: 'Home', key: '/mr' };
    if (meta.label) currentTab = { id: meta.id as string, label: meta.label as string, key: path };
    const currentMenu = ref<MenuItemType>(currentTab);

    const changeMenu = (menu: MenuItemType) => {
      currentMenu.value = menu;
      console.log('currentMenu', currentMenu.value);
      // TODO : 현재 메뉴가 없어 하드코딩함
      $router.push(menu.key);
    };

    // mobile drawer toggle
    const globalNavDrawer = ref(false);
    const toggleGlobalNav = () => {
      globalNavDrawer.value = !globalNavDrawer.value;
    };

    return {
      menuList,
      currentMenu,
      globalNavDrawer,
      toggleGlobalNav,
      changeMenu,
    };
  },
});
</script>
<style lang="scss" scoped>
.mr-main {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.gloabl-app-bar {
  border-bottom: 1px solid;
  border-color: rgba(var(--v-border-color), var(--v-border-opacity));
  position: relative;
  .app-bar-right {
    position: absolute;
    right: 10px;
  }
}
</style>
