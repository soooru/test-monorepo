<template>
  <div class="text-left">
    <span v-if="title" class="custom-field-title" :class="{ required: isRequired }">{{ title }}</span>
    <v-text-field
      v-model="localTextVal"
      class="custom-text-field"
      :class="classname"
      :label="label"
      :variant="variant"
      :placeholder="placeholder"
      :density="density"
      :readonly="readonly"
      :disabled="disabled"
      :type="passwordType"
      @input="handleInput($event.target.value)"
      hide-details="auto"
      :append-inner-icon="appendIconVal"
      :prepend-inner-icon="prependInnerIcon"
      @click:append-inner="togglePwdVisible" />
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, computed } from 'vue';

type VariantType = 'outlined' | 'filled' | 'plain' | 'solo' | undefined;
type DensityType = 'default' | 'comfortable' | 'compact' | null | undefined;

export default defineComponent({
  name: 'BaseTextField',
  props: {
    textVal: { type: String, default: undefined, required: true },
    density: { type: String as () => DensityType, default: 'compact' },
    label: { type: String, default: undefined },
    variant: {
      type: String as () => VariantType,
      default: 'outlined',
    },
    placeholder: { type: String, default: undefined },
    readonly: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    type: { type: String, default: 'text' }, // password, commanum
    appendInnerIcon: { type: String, default: undefined },
    prependInnerIcon: { type: String, default: undefined },
    title: { type: String, default: undefined },
    isRequired: { type: Boolean, default: false },
    classname: { type: String, default: '' },
  },
  setup(props, context) {
    // 부모로부터 받은 textVal 초기화
    const localTextVal = ref(props.textVal);
    if (props.textVal && props.type === 'commanum') {
      localTextVal.value = Number(props.textVal).toLocaleString();
    }

    //password 타입일 떄 설정
    const isPwdType = ref(props.type === 'password');
    const isPwdShow = ref(false);
    const passwordType = computed(() => (isPwdType.value ? (isPwdShow.value ? 'text' : 'password') : props.type));

    // appendIcon 설정
    const appendIconVal = computed(() => {
      if (props.appendInnerIcon) return props.appendInnerIcon;
      return isPwdType.value ? (isPwdShow.value ? 'mdi-eye' : 'mdi-eye-off') : undefined;
    });

    const togglePwdVisible = () => {
      if (isPwdType.value) isPwdShow.value = !isPwdShow.value;
    };

    const handleInput = (value: string) => {
      // commanum 타입일 때 입력 변경
      if (props.type === 'commanum') {
        const numericValue = Number(value.replace(/[^0-9]/g, ''));
        localTextVal.value = numericValue === 0 ? undefined : numericValue.toLocaleString();
      } else {
        localTextVal.value = value;
      }
      context.emit('update:textVal', localTextVal.value);
    };

    return {
      localTextVal,
      passwordType,
      appendIconVal,
      togglePwdVisible,
      handleInput,
    };
  },
});
</script>

<style lang="scss" scoped>
.custom-field-title {
  font-size: 12px;
}
.custom-text-field {
  min-width: 70px;
}
</style>
