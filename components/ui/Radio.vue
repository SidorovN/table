<template>
  <div class="radio">
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
  },
}
</script>

<style lang="scss">
.radio {
  &__text {
    font-size: 14px;
    line-height: 24px;
    padding: 8px;
    border-radius: 2px;
  }
  &__label {
    display: block;
  }
  &__button:checked ~ &__text {
    background: $active-bg;
    color: $active-color;
  }
}
</style>
