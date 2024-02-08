<template>
  <v-card variant="outlined" class="bg-white text-left pa-3 doc-card">
    <div class="d-flex-center-between">
      <div>{{ contData.contNm }}</div>
      <v-btn class="ma-0 px-0" icon="mdi-chevron-right" variant="plain" size="small" @click="showDetail" />
    </div>
    <div>
      <v-chip class="mr-1" label size="small" color="brown">
        {{ contData.contType }}
      </v-chip>
      <v-chip label size="small" color="secondary">
        {{ contData.contGroup }}
      </v-chip>
    </div>
    <div class="small-text cont-card-detail">
      <div>거래처 : {{ contData.compNm }}</div>
      <div>담당 : {{ contData.manager }}</div>
      <div>방문일 : {{ contData.visited }}</div>
    </div>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ContType } from '@/types/dto/cont/cont.dto';

export default defineComponent({
  name: 'ContInfoCard',
  props: {
    contData: {
      type: Object as () => ContType,
      default: () => ({} as ContType),
    },
  },
  setup(props, ctx) {
    const showDetail = () => {
      ctx.emit('showDetail', props.contData);
    };
    return { showDetail };
  },
});
</script>

<style lang="scss" scoped>
.cont-card-detail {
  padding-top: 10px;
  margin-top: 10px;
  border-top: 1px dashed #999;
}
</style>
