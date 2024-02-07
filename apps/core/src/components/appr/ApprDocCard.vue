<template>
  <v-card v-if="docData" variant="outlined" class="bg-white text-left pa-4 doc-card">
    <div class="d-flex-center-between">
      <div>{{ docData.title }}</div>
      <v-btn class="ma-0 px-0" append-icon="mdi-chevron-right" variant="plain" size="small">
        {{ docData.state }}
      </v-btn>
    </div>
    <div>
      <v-chip variant="flat" class="mr-1" label size="small" color="primary">{{ docData.docCat }}</v-chip>
      <v-chip class="mr-1" label size="small">{{ docData.docnum }}</v-chip>
      <v-chip variant="flat" label size="small" color="secondary">{{ docData.docTp }}</v-chip>
    </div>
    <div class="small-text doc-card-detail">
      <div>거래처 : {{ docData.comp }}</div>
      <div>진행일시 : {{ docData.date }} {{ docData.startTime }} - {{ docData.endTime }}</div>
      <div>작성자 : {{ docData.author }}</div>
      <div>요청일시 : {{ docData.reqDate }}</div>
    </div>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ApprDocCardType } from '@/types/dto/documents/appr_doc.dto';

export default defineComponent({
  name: 'ApprDocCard',
  props: {
    docData: {
      type: Object as () => ApprDocCardType,
      default: () => ({} as ApprDocCardType),
    },
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.doc-card-detail {
  padding-top: 10px;
  margin-top: 10px;
  border-top: 1px dashed #999;
}
</style>
