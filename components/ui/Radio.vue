<template>
  <div class="radio" v-if="visible">
    <label class="radio__label">
      <input
        type="radio"
        class="radio__button visually-hidden"
        :value="value"
        @change="$emit('radio-change', $event)"
        :name="name"
        :checked="checked"
      />
      <p class="radio__text"><slot>Label</slot></p>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    checked: Boolean,
    name: String,
    value: String,
    visible: {
      default: true,
    },
  },
}
</script>

<style lang="scss">
.radio {
  @extend %font;
  &__text {
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 2px;
  }
  &__label {
    display: block;
  }
  &__button:checked ~ &__text {
    background: $active-bg;
    color: $active-color;
  }
  :hover {
    background-color: $active-bg;
    color: $active-color;
    opacity: 0.7;
  }
}
</style>
