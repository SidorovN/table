<template>
  <th
    :class="[
      'table__cell',
      'table__cell_type_heading',
      { table__cell_active: active },
    ]"
  >
    {{ title }}
    <button v-if="active">arrow</button>
  </th>
</template>

<script>
export default {
  props: ['selected', 'name', 'title'],
  computed: {
    active() {
      return this.selected === this.name
    },
  },
  mounted() {
    console.log(this.selected, this.name)
  },
}
</script>

<style lang="scss" scoped></style>
