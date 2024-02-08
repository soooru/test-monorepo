<template>
  <h3 class="text-left mb-4">◎ TimeLine</h3>
  <div class="timeline-wrap small-text">
    <div v-for="day in timeLineList" :key="day.date">
      <div class="text-left">{{ day.date }}</div>
      <v-timeline side="end">
        <v-timeline-item
          v-for="(item, index) in day.timeline"
          :key="item.id"
          dot-color="white"
          size="60px"
          class="time-item">
          <template v-slot:icon>
            <div class="grey-text time-dot">{{ item.time }}</div>
          </template>
          <div>
            <div class="text-left">
              <div class="d-flex-center-between w100p">
                <v-chip label size="small">{{ item.type }}</v-chip>
                <v-btn
                  @click="openOverlay(day.date, index)"
                  icon="mdi-plus-box"
                  variant="flat"
                  density="compact"
                  size="small" />
              </div>
              <div class="mt-1" v-html="item.text"></div>
            </div>
          </div>
          <div v-show="openedOverlay === `${day.date}:${index}`" class="time-overlay d-flex-center">
            <v-btn
              @click="openOverlay"
              class="close-btn"
              variant="text"
              density="compact"
              icon="mdi-minus-box"
              size="small"
              elevation="0"
              color="#fff" />
            <div class="d-flex-center">
              <v-btn density="compact" class="mr-1" color="primary">사전 문서</v-btn>
              <v-btn density="compact" color="info">사후 문서</v-btn>
            </div>
          </div>
        </v-timeline-item>
      </v-timeline>
    </div>
    <v-btn prepend-icon="mdi-chevron-down" variant="text" density="compact" color="primary" class="w100p">
      전체 보기
    </v-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'TimeLine',
  setup() {
    const openedOverlay = ref('');
    const timeLineList = [
      {
        date: '2024-01-23',
        timeline: [
          {
            id: 1,
            time: '10:00 AM',
            type: '제품설명회(단일)',
            text: 'Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.',
          },
          {
            id: 2,
            time: '11:00 AM',
            type: '강연/자문',
            text: '띄어 쓰기<br/>테스트입니다.',
          },
        ],
      },
      {
        date: '2024-01-24',
        timeline: [
          {
            id: 1,
            time: '10:00 AM',
            type: '제품설명회(단일)',
            text: 'Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.',
          },
        ],
      },
    ];

    const openOverlay = (date: string, index: number) => {
      if (date === undefined || index === undefined) {
        openedOverlay.value = '';
        return;
      }
      openedOverlay.value = `${date}:${index}`;
    };
    return { timeLineList, openedOverlay, openOverlay };
  },
});
</script>

<style lang="scss" scoped>
.timeline-wrap {
  .time-dot {
    border: 1px solid gray;
    padding: 4px;
    width: 60px;
    height: 60px;
    text-align: center;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .time-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(black, 0.5);
    z-index: 9;
    border-radius: 10px;
    .close-btn {
      position: absolute;
      top: 12px;
      right: 10px;
    }
  }
}
.timeline-wrap :deep .v-timeline-item__body {
  display: block;
  position: relative;
  width: 100%;
  padding-block-end: 0px !important;
  padding-block-start: 0px !important;
  padding: 10px !important;
  margin-left: 4px;
}

.timeline-wrap :deep .v-timeline-item__opposite {
  display: none;
}
</style>
