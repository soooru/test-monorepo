<template>
  <h3 class="text-left mb-4">◎ Document</h3>
  <div class="document-wrap small-text">
    <v-row class="ma-0 pa-0">
      <v-col v-for="(data, index) in documentData" :key="index" class="ma-0 pa-0" cols="3">
        <v-card variant="outlined" class="document-contents">
          <div>{{ data.title }}</div>
          <div class="mt-1">
            <!-- 정상 작동  -->
            <span class="txt-blue">{{ FILTER_comma(data.cnt) }}</span> 건
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { FILTER_comma } from '@/utils/filter';

export default defineComponent({
  name: 'DashDocument',
  setup() {
    const documentData = ref([
      { title: '임시 저장', cnt: 0 },
      { title: '결재 진행중', cnt: 100000 },
      { title: '결재 / 검증 완료', cnt: 100 },
      { title: '결재 반려', cnt: '1290' },
    ]);
    return {
      documentData,
      FILTER_comma,
    };
  },
});
</script>

<style scoped>
.document-contents {
  height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 4px;
  margin: 0px 2px;
}
</style>
