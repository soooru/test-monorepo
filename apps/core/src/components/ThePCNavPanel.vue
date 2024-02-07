<template>
  <div class="d-flex-center">
    <CommonLogo class="mx-3" />
    <ul class="pc-menu">
      <li v-for="item in localMenuList" :key="item.id">
        <v-btn variant="plain" @click="togglePCPanel(item.id)"> {{ item.label }}</v-btn>
      </li>
    </ul>
    <v-menu
      v-if="findSubgroup.length > 0"
      transition="slide-y-transition"
      :close-on-content-click="false"
      v-model="pcMenuPanel"
      no-click-animation
      persistent>
      <div class="pc-panel py-2 px-6 d-flex" v-click-outside="clickOutside">
        <div v-for="(item, index) in findSubgroup" :key="index" class="mr-12">
          <div class="small-text mb-2">{{ item.title }}</div>
          <ul v-for="menuitem in item.list" :key="menuitem.id">
            <li @click="clickMenu(menuitem)">
              <v-btn variant="plain">{{ menuitem.label }}</v-btn>
            </li>
          </ul>
        </div>
      </div>
    </v-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import { MenuItemType, SubGroupType } from '@/types/interface/menu';
import CommonLogo from '@core/components/common/CommonLogo.vue';

export default defineComponent({
  name: 'ThePCNavPanel',
  props: {
    menuList: {
      type: Array as () => MenuItemType[],
      default: () => [],
    },
  },
  components: { CommonLogo },
  setup(props, context) {
    const localMenuList = computed(() => {
      return props.menuList;
    });

    const pcMenuPanel = ref(false);
    let findSubgroup = ref<SubGroupType[]>([]);

    const togglePCPanel = (id: string) => {
      findSubgroup.value = localMenuList.value.find((item: MenuItemType) => item.id === id)?.subgroup || [];
      if (findSubgroup.value.length > 0) {
        pcMenuPanel.value = true;
      } else {
        const clicked = localMenuList.value.find((item: MenuItemType) => item.id === id);
        if (clicked) clickMenu(clicked);
      }
    };
    const clickMenu = (item: MenuItemType) => {
      context.emit('clickMenu', item);
      pcMenuPanel.value = false;
    };
    const clickOutside = (e: Event) => {
      let targetElement = e.target as Element | null;
      let attemptCnt = 0;
      const maxAttempts = 5;
      // 상위 요소를 찾아가면서 pc-menu 클래스가 있는지 확인
      while (targetElement) {
        if (targetElement.classList.contains('pc-menu')) return;
        attemptCnt++;
        targetElement = targetElement.parentElement;
        // 최대 시도 횟수를 초과하면 종료
        if (attemptCnt >= maxAttempts) {
          pcMenuPanel.value = false;
          return;
        }
      }
    };
    return {
      pcMenuPanel,
      findSubgroup,
      localMenuList,
      clickMenu,
      togglePCPanel,
      clickOutside,
    };
  },
});
</script>

<style lang="scss" scoped>
.pc-menu {
  display: flex;
  align-items: center;
  li {
    font-size: 0.9em;
    cursor: pointer;
  }
}
.pc-panel {
  height: 300px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100vw;
  min-height: 40px;
  position: absolute;
  top: 48px;
  background: #fff;
}
</style>
