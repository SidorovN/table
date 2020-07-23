<template>
  <div class="toolbar">
    <div class="toolbar__group">
      <p class="toolbar__title">Sort by:</p>
      <Radio @radio-change="sort" name="sort" :checked="true" value="product"
        >Product (100g serving)</Radio
      >
      <Radio @radio-change="sort" name="sort" value="calories">Calories</Radio>
      <Radio @radio-change="sort" name="sort" value="fat">Fat (g)</Radio>
      <Radio @radio-change="sort" name="sort" value="carbs">Carbs (g)</Radio>
      <Radio @radio-change="sort" name="sort" value="protein"
        >Protein (g)</Radio
      >
      <Radio @radio-change="sort" name="sort" value="iron">Iron (g)</Radio>
    </div>
    <div class="toolbar__group">
      <button v-if="!selected.length" class="toolbar__button" disabled>
        Delete
      </button>
      <button v-else @click="deleteItem(selected)" class="toolbar__button">
        {{ `Delete (${selected.length})` }}
      </button>
      <Dropdown class="dropdown" disabled :title="`${getRange} Per page`">
        <li class="dropdown__item">
          <Radio
            @radio-change="setRange"
            value="10"
            :checked="true"
            name="per-page"
            >10</Radio
          >
        </li>
        <li class="dropdown__item">
          <Radio @radio-change="setRange" value="15" name="per-page">15</Radio>
        </li>
        <li class="dropdown__item">
          <Radio @radio-change="setRange" value="25" name="per-page">25</Radio>
        </li>
      </Dropdown>
      <div class="pagination">
        <button @click="prevPage">Prev</button>
        <p class="pagination__text">
          {{ `${getFirst}-${getFirst + getRange - 1} of ${getTotalItems}` }}
        </p>
        <button @click="nextPage">Next</button>
      </div>
      <Dropdown
        class="dropdown"
        disabled
        :title="`${getColumns.length} columns selected`"
      >
        <Checkbox
          @check-change="setAll"
          :checked="selectAll"
          name="columns"
          value="all"
          >All</Checkbox
        >
        <form @change="changeColumns" class="dropdown__form" name="columns">
          <Checkbox name="columns" value="product" :checked="true"
            >Product</Checkbox
          >
          <Checkbox name="columns" value="calories" :checked="true"
            >Calories</Checkbox
          >
          <Checkbox name="columns" value="fat" :checked="true"
            >Fat (g)</Checkbox
          >
          <Checkbox name="columns" value="carbs" :checked="true"
            >Carbs (g)</Checkbox
          >
          <Checkbox name="columns" value="protein" :checked="true"
            >Protein (g)</Checkbox
          >
          <Checkbox name="columns" value="iron" :checked="true"
            >Iron (g)</Checkbox
          >
        </form>
      </Dropdown>
    </div>
  </div>
</template>

<script>
import Dropdown from '@/components/ui/Dropdown'
export default {
  components: {
    Dropdown,
  },
  props: ['totalItems', 'firstItem', 'lastItem', 'selected'],
  data() {
    return {
      selectAll: true,
    }
  },
  methods: {
    changeColumns(evt) {
      const inputs = Array.from(evt.currentTarget.elements)
      const columns = inputs.filter((el) => el.checked).map((el) => el.value)
      this.selectAll = inputs.every((el) => el.checked)
      this.$store.dispatch('table/setColumns', { columns })
    },
    sort(evt) {
      const param = evt.target.value
      this.$store.dispatch('table/sortTable', { data: param })
    },
    setRange(evt) {
      const range = evt.target.value
      this.$store.dispatch('table/setRange', +range)
    },
    setAll(evt) {
      if (evt.currentTarget.checked) {
        const form = document.forms.columns
        Array.from(form.elements).forEach((el) => (el.checked = true))
      }
    },
    nextPage() {
      const first =
        this.getFirst + this.getRange < this.getTotalItems
          ? this.getFirst + this.getRange
          : this.getTotalItems - this.getRange
      this.setPagination(first, this.getRange)
      this.$emit('change-page')
    },
    prevPage() {
      const first =
        this.getFirst > this.getRange ? this.getFirst - this.getRange : 1
      this.setPagination(first, this.getRange)
      this.$emit('change-page')
    },
    setPagination(first, range) {
      this.$store.dispatch('table/setPagination', {
        first: first,
        range: range,
      })
    },
    deleteItem(id) {
      console.log(id)
      this.$store
        .dispatch('table/deleteItem', id)
        .then((res) => {
          this.$emit('change-page')
        })
        .catch((res) => {
          console.log(res)
        })
        .finally((res) => {
          console.log('finally')
        })
    },
  },
  computed: {
    getFirst() {
      const { table } = this.$store.state
      console.log(table)
      return table.pagination.first
    },
    getRange() {
      const { table } = this.$store.state
      return table.pagination.range
    },
    getColumns() {
      const { table } = this.$store.state
      return table.columns
    },
    getTotalItems() {
      const { table } = this.$store.state
      return table.table.length
    },
  },
}
</script>

<style lang="scss" scoped>
.toolbar {
  font-size: $font-size;
  line-height: $line-height;
  display: flex;
  justify-content: space-between;
  &__group {
    align-items: center;
    display: flex;
  }
  &__button {
    background-color: $active-bg;
    color: $active-color;
    border: 1px solid transparent;
    border-radius: 2px;
    height: 100%;
    margin-right: 12px;
    &:disabled {
      color: #c6cbd4;
      background-color: transparent;
      border: 1px solid #c6cbd4;
    }
  }
}
.pagination {
  display: flex;
}
</style>
