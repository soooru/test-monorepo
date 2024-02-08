<template>
  <div>
    <!-- search header  -->
    <div class="px-3 bg-white">
      <div class="d-flex-center-between">
        <div class="mt-3 mb-2">고객</div>
        <div>
          <v-icon icon="mdi-chevron-down mr-1"></v-icon>
          <v-btn variant="tonal" color="primary" size="small">신규 등록</v-btn>
        </div>
      </div>
      <div class="d-flex-center w100p">
        <v-btn-toggle v-model="contToggle" divided variant="outlined" density="compact">
          <v-btn class="px-2" size="small" density="compact">내 고객</v-btn>
          <v-btn class="px-2" size="small" density="compact">전체 고객</v-btn>
        </v-btn-toggle>
        <div class="grow-1 ml-1">
          <BaseTextField
            placeholder="이름, 진료과, 전공, 거래처명"
            v-model:textVal="searchWord"
            classname="bg-gray"
            prependInnerIcon="mdi-magnify" />
        </div>
      </div>
    </div>
    <!-- filter  -->
    <div class="px-3 py-1 mt-2 border-y small-text text-left">
      <v-btn @click="toggleFilterDialog(true)" class="ma-0 pa-0" prepend-icon="mdi-filter" variant="plain" size="small">
        필터
      </v-btn>
    </div>
    <!-- list  -->
    <div class="bg-gray py-3 px-2">
      <div v-if="loading"></div>
      <div v-else-if="contList.length === 0" class="py-5 small-text">검색된 고객이 없습니다.</div>
      <div v-else>
        <template v-for="item in contList" :key="item.id">
          <ContInfoCard :contData="item" @showDetail="showDetail" class="mb-2" />
        </template>
      </div>
      <div v-show="!loading">
        <v-pagination v-model="pagenation.currentPage" :length="pagenation.totalPage" size="x-small"></v-pagination>
      </div>
    </div>
    <ContFilterDialog :isOpen="isFilterDialog" @close="toggleFilterDialog" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ContService from '@/services/cont/contService';
import { ContType } from '@/types/dto/cont/cont.dto';
import { useRouter } from 'vue-router';

import ContInfoCard from '@/components/cont/ContInfoCard.vue';
import ContFilterDialog from '@/components/cont/ContFilterDialog.vue';

export default defineComponent({
  name: 'contListPage',
  components: { ContInfoCard, ContFilterDialog },
  setup() {
    const $router = useRouter();
    const searchWord = ref('');
    const contToggle = ref(0);
    const loading = ref(false);
    const isFilterDialog = ref(false);
    let contList = ref([]);

    ContService.getContList().then(res => {
      if (res && res.status === 200) {
        if (res.data) contList.value = res.data;
      } else {
        contList.value = [];
      }
    });

    const pagenation = ref({
      currentPage: 1,
      totalPage: 1,
    });

    // actions
    const showDetail = (contData: ContType) => {
      $router.push({ name: 'contDetail', params: { contId: contData.id } });
    };

    const toggleFilterDialog = (value: boolean | undefined) => {
      if (value === undefined) isFilterDialog.value = !isFilterDialog.value;
      else isFilterDialog.value = value;
    };
    return { searchWord, contToggle, loading, contList, pagenation, isFilterDialog, showDetail, toggleFilterDialog };
  },
});
</script>

<style scoped></style>
