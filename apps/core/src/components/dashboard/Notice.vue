<template>
  <h3 class="text-left mb-4">◎ Notice</h3>
  <div>
    <div class="notice-card d-flex-center-between border-bottom" v-for="item in noticeData" :key="item.id">
      <div class="text-left multi-line-ellipsis">
        {{ item.title }}
      </div>
      <div class="small-text notice-right" width="100px">
        <v-chip v-if="item.state" label color="red" size="small">{{ item.state }}</v-chip>
        <v-icon icon="mdi-chevron-right" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'NoticeComp',
  setup() {
    const noticeData = ref([
      { id: 1, title: '정산 마감 기간 안내', state: 'new', link: '' },
      {
        id: 2,
        title: '공지사항',
        state: 'new',
        link: '',
      },
      { id: 3, title: '중요한 공지사항', state: '', link: '' },
      { id: 4, title: '맛있는 땅콩샌드 나눔 안내', state: 'new', link: '' },
    ]);
    return { noticeData };
  },
});
</script>
<style lang="scss" scoped>
.notice-card {
  padding: 6px 10px;
  .notice-right {
    min-width: 80px;
    text-align: right;
  }
}
</style>
