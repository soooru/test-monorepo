<template>
  <v-dialog v-model="localIsDialog" max-width="320" @click:outside="clickOutside">
    <v-card>
      <div class="d-flex-center-between pa-2">
        <v-btn variant="plain" density="compact" icon="mdi-close" @click="clickOutside" />
        <div>
          <v-btn variant="plain" size="small" @click="resetFilter">초기화</v-btn>
          <v-btn variant="plain" color="primary" size="small" @click="saveFilter">적용</v-btn>
        </div>
      </div>
      <v-divider></v-divider>
      <div class="px-4 pb-4">
        <div class="small-text pt-4 pb-2">문서 구분</div>
        <div class="reverse-checkbox pb-2">
          <v-checkbox v-model="filter.docCat" label="사전" value="before" v-bind="checkboxOpt()" />
          <v-checkbox v-model="filter.docCat" label="사후" value="after" v-bind="checkboxOpt()" />
        </div>
        <v-divider></v-divider>
        <div class="small-text pt-4 pb-2">문서 상태</div>
        <div class="reverse-checkbox pb-2">
          <v-checkbox v-model="filter.state" label="임시저장" value="temp" v-bind="checkboxOpt()" />
          <v-checkbox v-model="filter.state" label="결재중" value="progress" v-bind="checkboxOpt()" />
          <v-checkbox v-model="filter.state" label="결재완료" value="complete" v-bind="checkboxOpt()" />
          <v-checkbox v-model="filter.state" label="반려" value="reject" v-bind="checkboxOpt()" />
        </div>
        <v-divider></v-divider>
        <div class="small-text pt-4 pb-2">카테고리</div>
        <div class="reverse-checkbox pb-2">
          <v-checkbox v-model="filter.cat" label="제품설명회 (단일)" value="single" v-bind="checkboxOpt()" />
          <v-checkbox v-model="filter.cat" label="제품설명회 (복수)" value="multi" v-bind="checkboxOpt()" />
          <v-checkbox v-model="filter.cat" label="학술대회지원" value="seminar" v-bind="checkboxOpt()" />
          <v-checkbox v-model="filter.cat" label="강연/자문" value="seminar2" v-bind="checkboxOpt()" />
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, toRef, ref } from 'vue';
import { COMM_deepclone_obj } from '@/utils/common';

export default defineComponent({
  name: 'ApprFilterDialog',
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    // init variables
    const localIsDialog = toRef(props, 'isOpen');
    const resetFilterVal = {
      docCat: ['before', 'after'],
      state: ['temp'],
      cat: ['single', 'multi', 'seminar', 'seminar2'],
    };
    const filter = ref(COMM_deepclone_obj(resetFilterVal));

    // ui const opt
    const checkboxOpt = () => {
      return Object.assign({
        'hide-details': true,
        density: 'compact',
        color: 'success',
      });
    };

    // actions
    const clickOutside = () => {
      context.emit('close');
    };

    const resetFilter = () => {
      filter.value = COMM_deepclone_obj(resetFilterVal);
    };

    const saveFilter = () => {
      context.emit('close');
      // context.emit('save', filter.value);
    };

    return { localIsDialog, clickOutside, filter, checkboxOpt, resetFilter, saveFilter };
  },
});
</script>
