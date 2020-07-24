<template>
  <th v-if="visible" :class="['heading', { heading_active: active }]">
    {{ title }}
    <button v-if="active">arrow</button>
  </th>
</template>

<script>
export default {
  props: ['selected', 'name', 'title', 'visible'],
  computed: {
    active() {
      return this.selected === this.name
    },
  },
}
</script>

<style lang="scss" scoped>
.heading {
  font-weight: 600px;
  &_active {
    color: $active-bg;
  }
}
</style>
