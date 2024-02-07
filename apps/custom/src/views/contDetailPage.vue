<template>
  <div>
    <div class="sticky-bar border-bottom bg-lightgray">
      <div class="d-flex-center-between px-6 py-2">
        <div><strong>고객 정보</strong></div>
        <div><v-btn rounded color="primary" size="small">변경 요청</v-btn></div>
      </div>
    </div>
    <ContProfile class="mt-6" />
    <div class="contents-area d-flex-center my-4">
      <v-card elevation="0" class="bg-darkgreen cont-action-card">
        <v-icon class="mb-1">mdi-file-document-edit-outline</v-icon>
        <div>지출보고 작성</div>
      </v-card>
      <v-card elevation="0" class="bg-darkgreen cont-action-card">
        <v-icon class="mb-1">mdi-account-multiple</v-icon>
        <div>내 담당 등록</div>
      </v-card>
      <v-card elevation="0" class="bg-darkgreen cont-action-card" disabled>
        <v-icon class="mb-1">mdi-draw</v-icon>
        <div>개인정보 동의</div>
      </v-card>
      <v-card elevation="0" class="bg-darkgreen cont-action-card">
        <v-icon class="mb-1">mdi-account-plus-outline</v-icon>
        <div>연자 등록</div>
      </v-card>
    </div>
    <div class="bg-white">
      <v-tabs v-model="activeTab" color="deep-purple-accent-4" class="contents-area">
        <v-tab v-for="item in contTabContentsList" :key="item.name">
          <div class="contents-text">{{ item.text }}</div>
        </v-tab>
      </v-tabs>
    </div>

    <v-window v-model="activeTab">
      <v-window-item v-for="item in contTabContentsList" :key="item.name" :value="item">
        <div class="contents-area small-text my-4">
          <component :is="item.component" :data="item.data" />
        </div>
      </v-window-item>
    </v-window>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import ContProfile from '@/components/cont/ContProfile.vue';
import ContBasicInfo from '@/components/cont/ContBasicInfo.vue';
import ContSalesActivity from '@/components/cont/ContSalesActivity.vue';
export default defineComponent({
  name: 'contDetailPage',
  components: { ContProfile, ContBasicInfo, ContSalesActivity },
  setup() {
    const route = useRoute();
    const contId = route.params.contId;
    const activeTab = ref(0);

    const basicInfo = {
      contNm: 'OO대학병원',
      contPosition: '정교수',
      contRank: '과장',
      contDept: '내분비내과',
      contMajor: '1,2형 당뇨',
      agreeEmail: 'Y',
      agreeSms: 'N',
      contGroup: '그룹A, 그룹B',
      manager: '영등포3팀 김담당, 영등포 종병팀 김상사',
      seminar: '0/4',
      contSpeaker: 'Y',
    };
    const slaesActivity = [
      {
        month: '2024년 1월',
        list: [
          { day: '19일(금)', list: [{ title: '제품설명회(단일)', place: '실리콘밸리 호텔', btn: '' }] },
          {
            day: '12일(금)',
            list: [
              { title: '제품설명회(단일)', place: '신촌 세브란스병원', btn: '사후 문서 보기' },
              { title: '견본품 제공', place: '실리콘밸리 호텔', btn: '사후 문서 보기' },
            ],
          },
        ],
      },
    ];
    let contTabContentsList = [
      { text: '기본 정보', name: 'ContBasicInfo', component: 'ContBasicInfo', data: basicInfo },
      { text: '영업활동 이력', name: 'ContSalesActivity', component: 'ContSalesActivity', data: slaesActivity },
      { text: '근무 시간', name: 'ContWorkTime', component: 'ContWorkTime', data: {} },
      { text: '경력 사항', name: 'ContCareer', component: 'ContCareer', data: {} },
      { text: '고객 메모', name: 'ContCustomerMemo', component: 'ContCustomerMemo', data: {} },
    ];

    return { contId, activeTab, contTabContentsList };
  },
});
</script>

<style scoped lang="scss">
.contents-area {
  width: 600px;
  margin: 0 auto;
  @media #{$breakpoints-only-xs} {
    width: 100%;
    padding: 0px 10px;
  }
}

.cont-action-card {
  width: 25%;
  height: 70px;
  padding: 10px;
  font-size: 0.8em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0px 6px;
}
.cont-action-card.v-card--disabled {
  background: rgba(31, 91, 79, 0.3);
  color: #444;
}
.sticky-bar {
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
}
</style>
