<template>
  <h3 class="text-left mb-4">◎ MDM</h3>
  <div>
    <div class="mdm-card d-flex-center-between border-bottom" v-for="item in mdmData" :key="item.id">
      <div class="d-flex-center">
        <v-icon class="mr-3" size="large" :icon="item.cat === '' ? 'mdi-hospital-building' : 'mdi-face-man'" />
        <div class="text-left">
          <div class="single-line-ellipsis">
            {{ item.name }} <span v-show="item.cat">({{ item.cat }})</span>
          </div>
          <div class="small-text single-line-ellipsis">{{ item.location }}</div>
        </div>
      </div>
      <div class="small-text mdm-right">
        <span>{{ item.state }}</span>
        <v-icon icon="mdi-chevron-right" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'MDM',
  setup() {
    const mdmData = ref([
      { id: 1, name: '김영희', cat: '의사', location: '영희대학교병원', state: '등록 완료' },
      {
        id: 2,
        name: '비타민C내과',
        cat: '',
        location: '서울시 영등포구',
        state: '반려',
      },
      { id: 3, name: '김철수', cat: '간호사', location: '비타민병원', state: '등록 완료' },
      { id: 4, name: '홍길동', cat: '간호사', location: '비타민병원', state: '등록 완료' },
      { id: 5, name: 'OO한의원', cat: '', location: '제주시 한라봉리', state: '반려' },
    ]);
    return { mdmData };
  },
});
</script>

<style lang="scss" scoped>
.mdm-card {
  padding: 6px 10px;
  .mdm-right {
    min-width: 80px;
    text-align: right;
  }
}
</style>
