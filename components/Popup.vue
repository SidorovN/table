<template>
  <div class="popup" @mouseleave="$emit('cancel')">
    <p class="popup__text">
      Are you sure you want to
      <span class="popup__span-accent">
        delete item?
      </span>
    </p>
    <div class="popup__container">
      <button @click="$emit('cancel')" class="popup__button">Cancel</button>
      <button
        @click="$emit('confirm')"
        class="popup__button popup__button_type_active"
      >
        Confirm
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item'],
}
</script>

<style lang="scss" scoped>
.popup {
  position: absolute;
  top: 100%;
  @extend %font;
  @extend %popup;
  right: 0;
  padding: 16px;
  background-color: #fff;
  width: max-content;
  &__text {
    @extend %font;
    margin-bottom: 8px;
  }
  &__span-accent {
    font-weight: 600;
  }
  &__container {
    width: max-content;
    margin: 0 auto;
  }
  &__button {
    @extend %active;
  }
}
</style>
