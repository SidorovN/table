<template>
  <th v-if="visible">
    <button
      @click="reverseTable"
      :class="['heading', { heading_active: active, heading_down: down }]"
      :disabled="!active"
    >
      <span>{{ title }}</span>
    </button>
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
  data() {
    return {
      down: false,
    }
  },
  methods: {
    reverseTable() {
      this.$store.dispatch('table/reverseTable')
      const table = this.$store.getters['table/getTableData']
      this.setDown()
    },
    setDown() {
      const table = this.$store.getters['table/getTableData']
      this.down = table[0][this.name] > table[100][this.name]
    },
  },
  beforeUpdate() {
    this.setDown()
  },
}
</script>

<style lang="scss" scoped>
.heading {
  @extend %font;
  position: relative;
  border: none;
  outline: none;
  background-color: transparent;
  font-weight: 600;
  padding: 0 20px;
  &_active {
    cursor: pointer;
    color: $active-bg;
    &:after {
      position: absolute;
      content: '';
      top: 0;
      right: 0;
      height: 16px;
      width: 16px;
      background-image: url('/images/sort.svg');
      background-repeat: no-repeat;
      background-position: center;
    }
  }
  &_down:after {
    transform: rotate(180deg);
  }

  &:disabled {
    color: inherit;
  }
}
</style>
