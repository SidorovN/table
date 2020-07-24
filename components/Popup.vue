<template>
  <div class="popup" @mouseleave="$emit('cancel')">
    <p class="popup__error" v-if="showError">Error. Try again please</p>
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
        <div v-if="haveLoading" class="btn__loader">
          <svg
            class="btn__spinner"
            width="65"
            height="65"
            viewBox="0 0 66 66"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              class="btn__spinner-path"
              fill="none"
              stroke-width="6"
              stroke-linecap="round"
              cx="33"
              cy="33"
              r="30"
              stroke="#fff"
            ></circle>
          </svg>
        </div>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item'],
  data() {
    return {}
  },
  computed: {
    haveLoading() {
      return this.$store.getters['table/getLoading']
    },
    showError() {
      return this.$store.getters['table/getError']
    },
  },
}
</script>

<style lang="scss" scoped>
.popup {
  position: absolute;
  z-index: 2;
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
    outline: none;
    position: relative;
    @extend %default-button;
    @extend %font;
    &_type_active {
      @extend %active;
    }
  }
  &__error {
    position: absolute;
    top: 3px;
    left: 0;
    transform: translate(50%, 0);
    color: red;
    font-weight: 600;
  }
}

.btn__loader {
  position: absolute;
  cursor: inherit;
  background-color: inherit;
  padding: 5px;
  height: 32px;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 3;
}
.btn__spinner {
  height: 100%;
  width: 100%;
  animation: rotator 2s linear infinite;
}

@keyframes rotator {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(270deg);
  }
}

.btn__spinner-path {
  stroke-dasharray: 187;
  stroke-dashoffset: 0;
  transform-origin: center;
  animation: dash 2s ease-in-out infinite;
  stroke: white;
}

@keyframes dash {
  0% {
    stroke-dashoffset: 187;
  }
  50% {
    stroke-dashoffset: 47;
    transform: rotate(135deg);
  }
  100% {
    stroke-dashoffset: 187;
    transform: rotate(450deg);
  }
}
</style>
