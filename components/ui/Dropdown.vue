<template>
  <div class="dropdown" @mouseleave="hideList">
    <button @click="showList" class="dropdown__button">
      <p>
        {{ title }}
      </p>
      <img
        src="@/static/images/arrow.svg"
        alt="Открыть список"
        class="dropdown__img"
      />
    </button>
    <ul :class="['dropdown__list', { dropdown__list_opened: listOpened }]">
      <slot></slot>
    </ul>
  </div>
</template>

<script>
import Checkbox from '@/components/ui/Checkbox'
export default {
  props: {
    title: String,
  },
  components: {
    Checkbox,
  },
  methods: {
    showList() {
      this.listOpened = true
    },
    hideList(evt) {
      this.listOpened = false
    },
  },
  data() {
    return {
      listOpened: false,
    }
  },
}
</script>

<style lang="scss" scoped>
.dropdown {
  font-size: $font-size;
  line-height: $line-height;
  position: relative;
  &__list {
    width: 100%;
    display: none;
    list-style: none;
    padding: 0;
    position: absolute;
    background: #ffffff;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.16);
    border-radius: 4px;
    max-height: 240px;
    padding: 16px;
    &_opened {
      display: block;
    }
  }
  &__button {
    display: flex;
    align-items: center;
    padding: 4px 12px;
    background-color: transparent;
    border: 1px solid #d5dae0;
    border-radius: 2px;
    vertical-align: baseline;
  }
  &__item:not(:last-child) {
    margin-bottom: 12px;
  }
}
</style>
