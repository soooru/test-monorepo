<template>
  <div>
    <!-- search header  -->
    <div class="px-3 bg-white">
      <div class="d-flex-center-between">
        <div class="mt-3 mb-2">임시 문서함</div>
        <div><v-icon icon="mdi-chevron-down"></v-icon></div>
      </div>
      <div>
        <BaseTextField placeholder="Search" v-model:textVal="searchWord" classname="bg-gray" />
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
      <div v-else-if="tempDocList.length === 0" class="py-5 small-text">검색된 문서가 없습니다.</div>
      <div v-else>
        <template v-for="item in tempDocList" :key="item.id">
          <ApprDocCard :docData="item" class="mb-2" />
        </template>
      </div>
      <div v-show="!loading">
        <v-pagination v-model="currentPage" :length="totalPage" size="x-small"></v-pagination>
      </div>
    </div>
    <ApprFilterDialog :isOpen="isFilterDialog" @close="toggleFilterDialog" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import TempDocService from '@/services/documents/tempDocService';
import { ApprDocCardType } from '@/types/dto/documents/appr_doc.dto';

import ApprDocCard from '@/components/appr/ApprDocCard.vue';
import ApprFilterDialog from '@/components/appr/ApprFilterDialog.vue';

export default defineComponent({
  name: 'TempDocListPage',
  components: { ApprDocCard, ApprFilterDialog },
  setup() {
    const searchWord = ref('');
    const tempDocList = ref<ApprDocCardType[]>([]);
    const currentPage = ref(1);
    const totalPage = ref(1);
    const loading = ref(false);
    const isFilterDialog = ref(false);

    // 리스트 가져오기
    const getTempDocList = async () => {
      loading.value = true;
      const res = await TempDocService.getTempList();
      if (res && res.status === 200) {
        if (res.data) tempDocList.value = res.data;
      } else {
        tempDocList.value = [];
      }
      loading.value = false;
    };
    getTempDocList();

    // actions
    const toggleFilterDialog = (value: boolean | undefined) => {
      if (value === undefined) isFilterDialog.value = !isFilterDialog.value;
      else isFilterDialog.value = value;
    };

    return { loading, searchWord, tempDocList, currentPage, totalPage, isFilterDialog, toggleFilterDialog };
  },
});
</script>
