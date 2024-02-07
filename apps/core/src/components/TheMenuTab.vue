<template>
  <Vue3TabsChrome
    :ref="setTabRef"
    :tabs="tabList"
    v-model="nowTab"
    @click="handleClick"
    @remove="handleRemove"
    :auto-hidden-close-icon-width="0" />
</template>

<script lang="ts">
import { defineComponent, ref, Ref, toRefs, watch } from 'vue';
import 'vue3-tabs-chrome/dist/vue3-tabs-chrome.css';
import Vue3TabsChrome, { Tab } from 'vue3-tabs-chrome';

export default defineComponent({
  name: 'TheMenuTab',
  components: {
    Vue3TabsChrome,
  },
  props: {
    currentMenu: {
      type: Object as () => { label: string; key: string },
      default: () => {
        return {};
      },
    },
  },
  setup(props, context) {
    const tabRef: Ref = ref();
    const { currentMenu } = toRefs(props);

    let tabList = ref<Array<Tab>>([
      {
        label: 'Home',
        key: '/ad',
        favico: require('@/assets/logo.png'),
        closable: false,
      },
    ]);
    let nowTab: Ref = ref(tabList.value[0].key);
    if (currentMenu.value.label !== 'Home') {
      tabList.value.push({
        label: currentMenu.value.label,
        key: currentMenu.value.key,
      });
      nowTab = ref(tabList.value[1].key);
    }

    watch(currentMenu, newVal => {
      if (!tabList.value.find(tab => tab.key === newVal.key)) {
        handleAdd({
          label: newVal.label,
          key: newVal.key,
        });
      }
      if (nowTab.value !== newVal.key) nowTab.value = newVal.key;
    });

    const setTabRef = (el: HTMLElement) => {
      tabRef.value = el;
    };

    const changeTab = (tab: Tab) => {
      nowTab.value = tab.key;
      context.emit('changeMenu', {
        label: tab.label,
        key: tab.key,
      });
    };

    const handleAdd = (newTab: Tab) => {
      const addTabItem = {
        label: newTab.label,
        key: newTab.key,
      };
      tabRef.value.addTab(addTabItem);
      changeTab(addTabItem);
    };

    const handleRemove = () => {
      const changed = tabList.value.find(tab => tab.key === nowTab.value);
      if (changed) {
        changeTab({
          label: changed.label,
          key: nowTab.value,
        });
      }
    };

    const handleClick = (_e: Event, tab: Tab) => {
      changeTab({
        label: tab.label,
        key: tab.key,
      });
    };

    return {
      setTabRef,
      tabList,
      nowTab,
      handleAdd,
      handleRemove,
      handleClick,
    };
  },
});
</script>
