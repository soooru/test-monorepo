<template>
  <div class="global-nav-wrap">
    <div v-if="depth === 1" class="px-4 py-3">
      <div class="d-flex-center-between mb-6">
        <CommonLogo />
        <v-btn variant="text" density="compact" icon="mdi-close" elevation="0" @click="clickClose" />
      </div>
      <ul>
        <li v-for="item in localMenuList" :key="item.id" @click="openDeepDepth(item.id)" class="mb-2">
          {{ item.label }}
        </li>
      </ul>
    </div>
    <div v-else-if="depth === 2" class="px-4 py-3">
      <div class="d-flex-center-between mb-6">
        <v-btn variant="text" density="compact" icon="mdi-chevron-left" elevation="0" @click="depth = 1" />
        <v-btn variant="text" density="compact" icon="mdi-close" elevation="0" @click="clickClose" />
      </div>
      <div v-for="(item, index) in findSubgroup" :key="index" class="mb-4">
        <div class="small-text mb-2">{{ item.title }}</div>
        <ul v-for="menuitem in item.list" :key="menuitem.id">
          <li @click="clickMenu(menuitem)">{{ menuitem.label }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { MenuItemType, SubGroupType } from '@/types/interface/menu';
import { computed } from 'vue';

import CommonLogo from '@/components/common/CommonLogo.vue';

export default defineComponent({
  props: {
    type: {
      type: String,
      default: '',
    },
    menuList: {
      type: Array as () => MenuItemType[],
      default: () => [],
    },
  },
  components: {
    CommonLogo,
  },
  setup(props, context) {
    let depth = ref(1);
    let findSubgroup = ref<SubGroupType[]>([]);

    const localMenuList = computed(() => {
      return props.menuList;
    });
    const openDeepDepth = (id: string) => {
      findSubgroup.value = localMenuList.value.find((item: MenuItemType) => item.id === id)?.subgroup || [];
      if (findSubgroup.value.length > 0) {
        depth.value = 2;
      } else {
        const clicked = localMenuList.value.find((item: MenuItemType) => item.id === id);
        if (clicked) clickMenu(clicked);
      }
    };

    const clickMenu = (item: MenuItemType) => {
      context.emit('clickMenu', item);
    };
    let openedGroups = ref([]);

    const clickClose = () => {
      context.emit('clickClose');
      depth.value = 1;
    };

    return {
      localMenuList,
      depth,
      openedGroups,
      findSubgroup,
      clickClose,
      openDeepDepth,
      clickMenu,
    };
  },
});
</script>

<style lang="scss" scoped>
.global-nav-wrap {
  min-width: 300px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
}
.mo-logo {
  width: 110px;
  padding: 0px 10px;
  &:hover {
    cursor: pointer;
  }
}
</style>
