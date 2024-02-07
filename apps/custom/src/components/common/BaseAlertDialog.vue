<template>
  <v-dialog v-model="isOpen" max-width="320" @click:outside="clickOutside">
    <v-card>
      <div class="pa-4">
        <h4 v-if="parentData.title" class="pb-2">{{ parentData.title }}</h4>
        <div class="small-text" v-html="parentData.body"></div>
      </div>
      <v-divider color="primary"></v-divider>
      <div v-if="parentData.isConfirm">
        <v-btn v-bind="mergeOpt({ color: null })" @click="closeModal" v-text="parentData.cancelText ?? '닫기'" />
        <v-btn v-bind="Object.assign(btnOpt)" @click="submit" v-text="parentData.submitText ?? '확인'" />
      </div>
      <div v-else>
        <v-btn v-bind="mergeOpt({ class: 'w100p' })" @click="submit" v-text="parentData.submitText ?? '확인'" />
      </div>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { computed } from 'vue';
import { defineComponent, toRefs } from 'vue';

interface PropsType {
  isOpen: boolean;
  body: string;
  title?: string;
  isConfirm?: boolean;
  persistent?: boolean; // 대화 상자 닫히지 않음 여부
  param?: any;
  cancelText?: string;
  submitText?: string;
  submitCallback?: (arg: any) => void | null;
}
export default defineComponent({
  props: {
    parentData: {
      type: Object as () => PropsType,
      required: true,
      default: () => {
        return {
          isOpen: false,
          body: '',
        };
      },
    },
  },
  setup(props, context) {
    const { parentData } = toRefs(props);
    const isOpen = computed(() => {
      return parentData.value.isOpen;
    });

    // modal
    const submit = () => {
      if (parentData.value.submitCallback) {
        parentData.value.submitCallback(parentData.value.param);
      }
      closeModal();
    };

    const clickOutside = () => {
      if (!parentData.value.persistent) {
        closeModal();
      }
    };

    const closeModal = () => {
      context.emit('close');
    };

    // ui options
    const btnOpt = {
      rounded: '0',
      variant: 'text',
      color: 'primary',
      class: 'w50p',
    };
    const mergeOpt = (mergeOpt: { [key: string]: any }): { [key: string]: any } => {
      return Object.assign({}, btnOpt, mergeOpt);
    };

    return { isOpen, btnOpt, submit, clickOutside, closeModal, mergeOpt };
  },
});
</script>
