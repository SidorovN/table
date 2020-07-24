<template>
  <td v-if="visible" class="cell">
    {{ title }}
  </td>
</template>

<script>
export default {
  props: ['name', 'title', 'visible'],
  computed: {
    active() {
      return this.selected === this.name
    },
  },
}
</script>

<style lang="scss" scoped></style>
