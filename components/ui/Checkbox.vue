<template>
  <div class="checkbox">
    <label class="checkbox__label">
      <input
        type="checkbox"
        class="checkbox__button visually-hidden"
        :value="value"
        :checked="checked"
        :disabled="disabled"
        @change="$emit('check-change', $event)"
      />
      <span class="checkbox__box"></span>
      <slot></slot>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    checked: Boolean,
    name: String,
    value: Number & String,
    disabled: Boolean,
  },
}
</script>

<style lang="scss" scoped>
.checkbox {
  @extend %font;
  &__label {
    cursor: pointer;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  &__box {
    margin: 0 12px;
    display: block;
    border-radius: 2px;
    height: 14px;
    width: 14px;
    border: 1px solid #c6cbd4;
    background-position: center;
    background-repeat: no-repeat;
  }
  &__button:checked ~ &__box {
    @extend %active;
    padding: 0;
    background-image: url('/images/shape.svg');
  }
}
</style>
