<template>
  <div class="dropdown">
    <button class="dropdown__button">
      Dropdown
    </button>
    <ul class="dropdown__list dropdown__list_opened">
      <li class="dropdown__item"><Checkbox>All</Checkbox></li>
      <li class="dropdown__item"><Checkbox>All</Checkbox></li>
      <li class="dropdown__item"><Checkbox>All</Checkbox></li>
      <li class="dropdown__item"><Checkbox>All</Checkbox></li>
      <li class="dropdown__item"><Checkbox>All</Checkbox></li>
      <li class="dropdown__item"><Checkbox>All</Checkbox></li>
    </ul>
  </div>
</template>

<script>
import Checkbox from '@/components/ui/Checkbox'
  export default {
    components: {
      Checkbox,
    }
  }
</script>

<style lang="scss" scoped>
.dropdown {
  position: relative;
  &__list {
    display: none;
    list-style: none;
    padding: 0;
    position: absolute;
    &_opened {
      display: block;
    }
  }
}
</style>