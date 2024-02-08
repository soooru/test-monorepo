<template>
  <div>
    <TestButton />
    <v-row>
      <v-col v-for="item in dynamicComp" :key="item.name" cols="12" md="6" lg="6">
        <component :is="item.component"></component>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, ref, onMounted, markRaw } from 'vue';
import DynamicCompService from '@/services/dynamic-comp/dynamicComp';
import { DynamicCompType } from '@/types/dto/dynamic-comp/dynamic_comp.dto';
import { COMM_is_comp } from '@/utils/common';

import { TestButton } from '@packages/components';

export default defineComponent({
  name: 'MRDashBoard',
  components: { TestButton },
  setup() {
    const data = ref<DynamicCompType[]>([]);
    const dynamicComp = ref<any[]>([]);

    const fetchMenu = async () => {
      const response = await DynamicCompService.getCompList('mrDashboard');
      data.value = response.data;

      for (const el of data.value) {
        await checkAndLoadComponent(el.compFileName);
      }
    };

    const checkAndLoadComponent = async (compFileName: string) => {
      const middlePath = `components/dashboard`;
      const exists = await COMM_is_comp(middlePath, compFileName);
      if (exists) {
        try {
          const component = markRaw(defineAsyncComponent(() => import(`@/${middlePath}/${compFileName}.vue`)));
          dynamicComp.value.push({
            name: compFileName,
            component,
          });
        } catch (error) {
          console.error(`Failed to load component: ${compFileName}`, error);
        }
      }
    };

    onMounted(fetchMenu);

    return {
      dynamicComp,
    };
  },
});
</script>
