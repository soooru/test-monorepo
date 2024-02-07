<template>
  <div class="text-left">
    <v-card class="px-1 mb-2" elevation="0">
      <v-row>
        <v-col cols="4"> (주)거래처 </v-col>
        <v-col cols="8"> {{ data.contNm }}</v-col>
        <v-divider></v-divider>
        <v-col cols="4"> 직책 </v-col>
        <v-col cols="8"> {{ data.contPosition }} </v-col>
        <v-divider></v-divider>
        <v-col cols="4"> 직위 </v-col>
        <v-col cols="8"> {{ data.contRank }} </v-col>
        <v-divider></v-divider>
        <v-col cols="4"> 진료과 </v-col>
        <v-col cols="8"> {{ data.contDept }} </v-col>
        <v-divider></v-divider>
        <v-col cols="4"> 전공 </v-col>
        <v-col cols="8"> {{ data.contMajor }} </v-col>
      </v-row>
    </v-card>
    <v-card class="px-1 mb-2" elevation="0">
      <v-row>
        <v-col cols="4"> 개인정보동의 </v-col>
        <v-col cols="8">
          {{ data.agreeEmail === 'Y' ? '이메일' : '' }} {{ data.agreeSms === 'Y' ? '휴대폰' : '' }}
        </v-col>
      </v-row>
    </v-card>
    <v-card class="px-1 mb-2" elevation="0">
      <v-row>
        <v-col cols="4"> 고객 그룹 </v-col>
        <v-col cols="8"> {{ data.contGroup }} </v-col>
      </v-row>
    </v-card>
    <v-card class="px-1 mb-2" elevation="0">
      <v-row>
        <v-col cols="4"> 담당 </v-col>
        <v-col cols="8"> {{ data.manager }} </v-col>
      </v-row>
    </v-card>
    <v-card class="px-1 mb-2" elevation="0">
      <v-row>
        <v-col cols="4"> 제품설명회 </v-col>
        <v-col cols="8"> {{ data.seminar }} </v-col>
        <v-divider></v-divider>
        <v-col cols="4"> 연자 등록 </v-col>
        <v-col cols="8"> {{ data.contSpeaker }} </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'contBasicInfo',
  props: {
    data: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
