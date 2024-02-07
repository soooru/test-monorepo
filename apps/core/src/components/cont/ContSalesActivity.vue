<template>
  <div class="text-left">
    <div v-for="month in data" :key="month.month">
      <div>
        <strong>{{ month.month }}</strong>
      </div>
      <template v-for="day in month.list" :key="day.day">
        <div class="history-day mt-2">{{ day.day }}</div>
        <div v-for="(item, index) in day.list" :key="index">
          <div class="d-flex-center-between pt-2" :class="{ 'border-top': index !== 0 }">
            <v-chip label size="small" color="orange">{{ item.title }}</v-chip>
            <v-btn v-if="item.btn" size="small" rounded variant="tonal" color="primary">{{ item.btn }}</v-btn>
          </div>
          <div class="pb-3 pt-2">
            <strong>{{ item.place }}</strong>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

type SalesActivityItemType = {
  title: string;
  place: string;
  btn: string;
};
type SalesActivityDayItemType = {
  day: string;
  list: SalesActivityItemType[];
};
type SalesActivityMonthType = {
  month: string;
  list: SalesActivityDayItemType[];
};

type SalesActivityType = SalesActivityMonthType[];

export default defineComponent({
  name: 'ContSalesActivity',
  props: {
    data: {
      type: Array as () => SalesActivityType,
      required: true,
    },
  },
});
</script>

<style scoped>
.history-month {
  font-weight: bold;
}
.history-day {
  background: rgb(242, 242, 247);
}
</style>
