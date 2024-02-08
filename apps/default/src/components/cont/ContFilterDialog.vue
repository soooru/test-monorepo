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
        <div class="small-text pt-4 pb-2">지역</div>
        <div class="pb-4">
          <CommonMultiSelect :item-list="areaList" v-model:selectedVal="filter.area" placeholder="지역" />
          <CommonMultiSelect
            :item-list="areaDetailList"
            v-model:selectedVal="filter.areaDetail"
            placeholder="지역 상세"
            class="mt-1" />
        </div>
        <v-divider></v-divider>
        <div class="small-text pt-4 pb-2">고객 구분</div>
        <div class="reverse-checkbox pb-2">
          <v-checkbox v-model="filter.type" label="의사" value="doctor" v-bind="checkboxOpt()" />
          <v-checkbox v-model="filter.type" label="간호사" value="nurse" v-bind="checkboxOpt()" />
          <v-checkbox v-model="filter.type" label="약사" value="chemist" v-bind="checkboxOpt()" />
          <v-checkbox v-model="filter.type" label="치과의사" value="dentist" v-bind="checkboxOpt()" />
        </div>
        <v-divider></v-divider>
        <div class="small-text pt-4 pb-2">거래처 구분</div>
        <div class="d-flex w100p pb-4">
          <div class="w50p pr-1">
            <v-select variant="outlined" density="compact" hide-details placeholder="거래처구분1" />
          </div>
          <div class="w50p px-1">
            <v-select variant="outlined" density="compact" hide-details placeholder="거래처구분2" />
          </div>
        </div>
        <v-divider></v-divider>
        <div class="small-text pt-4 pb-2">고객 그룹</div>
        <div class="reverse-checkbox pb-2">
          <v-checkbox v-model="filter.group" label="groupA" value="groupA" v-bind="checkboxOpt()" />
          <v-checkbox v-model="filter.group" label="groupB" value="groupB" v-bind="checkboxOpt()" />
          <v-checkbox v-model="filter.group" label="groupC" value="groupC" v-bind="checkboxOpt()" />
        </div>
        <v-divider></v-divider>
        <div class="small-text pt-4 pb-2">정보 제공 동의</div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, toRef, ref } from 'vue';
import { COMM_deepclone_obj } from '@/utils/common';
import CommonMultiSelect from '@/components/common/CommonMultiSelect.vue';

export default defineComponent({
  name: 'ContFilterDialog',
  components: { CommonMultiSelect },
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
      area: ['seoul'],
      areaDetail: [],
      type: [],
      group: ['temp'],
    };
    const filter = ref(COMM_deepclone_obj(resetFilterVal));
    const areaList = [
      { val: 'seoul', text: '서울' },
      { val: 'incheon', text: '인천' },
      { val: 'busan', text: '부산' },
      { val: 'daejeon', text: '대전' },
      { val: 'daegu', text: '대구' },
      { val: 'bucheon', text: '부천' },
      { val: 'city', text: '도시' },
      { val: 'gyeonggi-do', text: '경기도' },
    ];
    const areaDetailList = [
      { val: 'gugu', text: '관악구' },
      { val: 'young', text: '영등포구' },
      { val: 'gurogu', text: '구로구' },
    ];

    // ui const opt
    const checkboxOpt = () => {
      return Object.assign({
        'hide-details': true,
        density: 'compact',
        color: 'success',
      });
    };

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

    return {
      areaList,
      areaDetailList,
      localIsDialog,
      filter,
      clickOutside,
      checkboxOpt,
      resetFilter,
      saveFilter,
    };
  },
});
</script>
