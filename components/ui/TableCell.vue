<template>
  <td v-if="visible" :class="['cell', { cell_active: active }]">
    {{ title }}
  </td>
</template>

<script>
export default {
  props: ['name', 'title', 'visible', 'selected'],
  computed: {
    active() {
      return this.selected === this.name
    },
  },
}
</script>

<style lang="scss" scoped>
.cell {
  &_active {
    grid-column-start: 2;
  }
}
</style>
