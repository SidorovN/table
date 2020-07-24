<template>
  <div class="dropdown" @mouseleave="hideList">
    <button @click="showList" class="dropdown__button">
      <p>
        {{ title }}
      </p>
      <Arrow
        color="#5B5E77"
        :class="['dropdown__arrow', { dropdown__arrow_opened: listOpened }]"
      />
    </button>
    <div :class="['dropdown__list', { dropdown__list_opened: listOpened }]">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Arrow from '@/components/ui/Arrow'
export default {
  props: {
    title: String,
  },
  components: {
    Arrow,
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
  @extend %font;
  color: $dropdown-color;
  position: relative;
  &__list {
    @extend %popup;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.16);
    border-radius: 4px;
    width: max-content;
    min-width: 100%;
    display: none;
    list-style: none;
    padding: 16px;
    overflow-x: auto;
    position: absolute;
    background: #ffffff;
    max-height: 240px;
    padding: 16px;
    &_opened {
      display: block;
    }
  }
  &__button {
    color: $dropdown-color;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 4px 12px;
    background-color: transparent;
    border: 1px solid #d5dae0;
    border-radius: 2px;
    vertical-align: baseline;
  }
  &__arrow {
    margin-left: 6px;
    transition: 0.3s ease;
    &_opened {
      transform: rotate(-180deg);
    }
  }
}
</style>
