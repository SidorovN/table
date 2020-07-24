<template>
  <div class="">
    <Toolbar
      :totalItems="table.length"
      :firstItem="1"
      :lastItem="table.length"
      :selected="selected"
      @change-page="resetChecks"
      @sort="setActive"
    />
    <table class="table">
      <tr class="table__row table__row_type_heading">
        <th class="table__cell">
          <Checkbox @check-change="selectAll" :checked="selectedAll" />
        </th>
        <TH
          v-for="column in getColumns"
          :key="column.name"
          class="table__cell table__cell_type_heading"
          :visible="getColumns.find((el) => el.name === column.name).visible"
          :title="column.title"
          :name="column.name"
          :selected="active"
        />
      </tr>
      <div @change="selectRow" class="table__content">
        <tr class="table__row" v-for="row in setData" :key="row.id">
          <td class="table__cell"><Checkbox :value="row.id.toString()" /></td>
          <TD
            v-for="column in getColumns"
            :key="column.name"
            class="table__cell"
            :visible="getColumns.find((el) => el.name === column.name).visible"
            :title="row[column.name]"
            :name="column.name"
          />
          <td class="table__cell table__cell_type_button">
            <button @click="deleteItem">Delete</button>
          </td>
        </tr>
      </div>
    </table>
  </div>
</template>

<script>
import Radio from '@/components/ui/Radio'
import TableHeading from '@/components/ui/TableHeading'
import TableCell from '@/components/ui/TableCell'
import Checkbox from '@/components/ui/Checkbox'
import Toolbar from '@/components/Toolbar'
export default {
  components: {
    Radio,
    Checkbox,
    Toolbar,
    TH: TableHeading,
    TD: TableCell,
  },
  data() {
    return {
      dataToShow: [],
      selected: [],
      selectedAll: false,
      active: 'product',
    }
  },
  props: ['table'],
  methods: {
    selectAll(evt) {
      if (evt.target.checked) {
        const inputs = Array.from(
          evt.target
            .closest('.table')
            .querySelector('.table__content')
            .querySelectorAll('.checkbox__button')
        )
        console.log(inputs)
        inputs.forEach((el) => (el.checked = true))
        this.setSelected(inputs)
      }
    },
    selectRow(evt) {
      const inputs = Array.from(
        evt.currentTarget
          .closest('.table__content')
          .querySelectorAll('.checkbox__button')
      )
      this.setSelected(inputs)
    },
    setSelected(inputs) {
      const rows = inputs.filter((el) => el.checked).map((el) => el.value)
      this.selectedAll = inputs.every((el) => el.checked)
      this.selected = rows
    },
    setActive(param) {
      this.active = param
    },
    resetChecks() {
      this.selectedAll = false
      this.selected = []
    },
    deleteItem(evt) {
      const id = evt.target
        .closest('.table__row')
        .querySelector('.checkbox__button').value
      console.log([id])
      this.$store
        .dispatch('table/deleteItem', [id])
        .catch((res) => {
          console.log(res)
        })
        .finally((res) => {
          console.log('finally')
        })
    },
  },
  computed: {
    setData() {
      return this.getTable.slice(
        this.getFirst - 1,
        this.getFirst + this.getRange - 1
      )
    },
    getFirst() {
      const { table } = this.$store.state
      return table.pagination.first
    },
    getTable() {
      const { table } = this.$store.state
      return table.table
    },
    getRange() {
      const { table } = this.$store.state
      return table.pagination.range
    },
    getColumns() {
      const { table } = this.$store.state
      return table.columns
    },
  },
}
</script>

<style lang="scss" scoped>
.table {
  @extend %font;
  color: $default-color;
  width: 100%;
  &__row {
    display: grid;
    grid-template-columns: 100px 200px repeat(6, minmax(50px, 1fr));
    align-items: center;
    min-height: 50px;

    &:nth-of-type(2n + 3) {
      background: #f8f9fa;
    }
    &:hover {
      background: rgba(0, 161, 30, 0.07);
    }
  }
  &__cell {
    text-align: center;
    &_type_button {
      visibility: hidden;
    }
  }
  &__row:hover &__cell_type_button {
    visibility: visible;
  }
}
</style>
