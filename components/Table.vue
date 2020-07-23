<template>
  <div class="">
    <Toolbar
      :totalItems="table.length"
      :firstItem="1"
      :lastItem="table.length"
      :selected="selected"
      @change-page="resetChecks"
    />
    <table class="table">
      <tr class="table__row table__row_type_heading">
        <th class="table__cell table__cell_type_heading">
          <Checkbox @check-change="selectAll" :checked="selectedAll" />
        </th>
        <th
          class="table__cell table__cell_type_heading"
          v-if="getColumns.includes('product')"
        >
          Product (100g serving)
        </th>
        <th
          class="table__cell table__cell_type_heading"
          v-if="getColumns.includes('calories')"
        >
          Calories
        </th>
        <th
          class="table__cell table__cell_type_heading"
          v-if="getColumns.includes('fat')"
        >
          Fat (g)
        </th>
        <th
          class="table__cell table__cell_type_heading"
          v-if="getColumns.includes('carbs')"
        >
          Carbs (g)
        </th>
        <th
          class="table__cell table__cell_type_heading"
          v-if="getColumns.includes('protein')"
        >
          Protein (g)
        </th>
        <th
          class="table__cell table__cell_type_heading"
          v-if="getColumns.includes('iron')"
        >
          Iron (g)
        </th>
      </tr>
      <div @change="selectRow" class="table__content">
        <tr class="table__row" v-for="row in setData" :key="row.id">
          <th class="table__cell"><Checkbox :value="row.id.toString()" /></th>
          <td class="table__cell" v-if="getColumns.includes('product')">
            {{ row.product }}
          </td>
          <td class="table__cell" v-if="getColumns.includes('calories')">
            {{ row.calories }}
          </td>
          <td class="table__cell" v-if="getColumns.includes('fat')">
            {{ row.fat }} (g)
          </td>
          <td class="table__cell" v-if="getColumns.includes('carbs')">
            {{ row.carbs }} (g)
          </td>
          <td class="table__cell" v-if="getColumns.includes('protein')">
            {{ row.protein }} (g)
          </td>
          <td class="table__cell" v-if="getColumns.includes('iron')">
            {{ row.iron }} (g)
          </td>
          <td class="table__cell table__cell_type_button">
            <button>Delete</button>
          </td>
        </tr>
      </div>
    </table>
  </div>
</template>

<script>
import Radio from '@/components/ui/Radio'
import Checkbox from '@/components/ui/Checkbox'
import Toolbar from '@/components/Toolbar'
export default {
  components: {
    Radio,
    Checkbox,
    Toolbar,
  },
  data() {
    return {
      dataToShow: [],
      selected: [],
      selectedAll: false,
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
    resetChecks() {
      this.selectedAll = false
      this.selected = []
    },
  },
  computed: {
    setData() {
      return this.table.slice(
        this.getFirst - 1,
        this.getFirst + this.getRange - 1
      )
    },
    getFirst() {
      const { table } = this.$store.state
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
  },
}
</script>

<style lang="scss" scoped>
.table {
  font-size: $font-size;
  line-height: $line-height;
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
