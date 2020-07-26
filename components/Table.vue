<template>
  <section class="section">
    <h1 class="section__title">Table UI</h1>
    <Toolbar
      :selected="selected"
      @change-page="resetChecks"
      @sort="setActive"
    />
    <table class="table">
      <tr class="table__row table__row_type_heading">
        <th class="table__cell">
          <Checkbox
            class="table__box"
            @check-change="selectAll"
            :checked="selectedAll"
          />
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
          <td class="table__cell">
            <Checkbox class="table__box" :value="+row.id" />
          </td>
          <TD
            v-for="column in getColumns"
            :key="column.name"
            class="table__cell"
            :visible="getColumns.find((el) => el.name === column.name).visible"
            :title="row[column.name]"
            :name="column.name"
            :selected="active"
          />
          <td class="table__cell table__cell_type_button">
            <button @click="showPopup" :value="+row.id" class="table__button">
              <svg
                width="14"
                height="16"
                viewBox="0 0 14 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.2326 1.88398H10.0963V0.495768C10.0963 0.216339 9.8709 0 9.59149 0C9.56438 0 9.54629 0.00905115 9.53747 0.0180816C9.52842 0.00905115 9.51034 0 9.50131 0H4.48046H4.4445H4.40834C4.12893 0 3.91259 0.216339 3.91259 0.495768V1.884H1.76726C1.1542 1.884 0.676514 2.36169 0.676514 2.97475V3.76801V4.75952H1.62302V14.9183C1.62302 15.5314 2.09168 16 2.70474 16H11.2951C11.9082 16 12.3859 15.5314 12.3859 14.9183V4.75952H13.3233V3.76801V2.97475C13.3233 2.36169 12.8455 1.88398 12.2326 1.88398ZM4.90411 0.991515H9.09574V1.88398H4.90411V0.991515ZM11.3853 14.9183C11.3853 14.9816 11.3582 15.0085 11.2951 15.0085H2.70474C2.64167 15.0085 2.61456 14.9816 2.61456 14.9183V4.7595H11.3853V14.9183ZM12.3228 3.76799H1.67706V2.97473C1.67706 2.91164 1.70417 2.8755 1.76724 2.8755H12.2326C12.2957 2.8755 12.3228 2.91164 12.3228 2.97473V3.76799Z"
                  fill="#5B5E77"
                />
                <path
                  d="M9.81689 5.92236H8.81635V14.1251H9.81689V5.92236Z"
                  fill="#5B5E77"
                />
                <path
                  d="M7.50915 5.92236H6.50861V14.1251H7.50915V5.92236Z"
                  fill="#5B5E77"
                />
                <path
                  d="M5.20153 5.92236H4.20099V14.1251H5.20153V5.92236Z"
                  fill="#5B5E77"
                />
              </svg>
              <span class="table__button-text"> Delete</span>
            </button>
            <Popup
              v-if="popupOpened == row.id"
              :item="row.id"
              @cancel="resetDelete"
              @confirm="confirmDelete"
            />
          </td>
        </tr>
      </div>
    </table>
  </section>
</template>

<script>
import Popup from '@/components/Popup.vue'
import Radio from '@/components/ui/Radio'
import TableHeading from '@/components/ui/TableHeading'
import TableCell from '@/components/ui/TableCell'
import Checkbox from '@/components/ui/Checkbox'
import Toolbar from '@/components/Toolbar'
export default {
  components: {
    Popup,
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
      popupOpened: '',
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
      this.selectedAll = false
      this.active = param
    },
    resetChecks() {
      this.selectedAll = false
      this.selected = []
    },
    showPopup(evt) {
      const id = evt.currentTarget.value
      this.popupOpened = id
    },
    deleteItem(id) {
      this.$store.dispatch('table/setLoading', true)
      this.$store
        .dispatch('table/deleteItem', [id])
        .then((res) => this.$store.dispatch('table/setError', false))
        .then((res) => this.resetDelete())
        .catch((res) => {
          this.$store.dispatch('table/setError', true)
          console.error(res)
        })
        .finally((res) => {
          this.$store.dispatch('table/setLoading', false)
        })
    },
    resetDelete() {
      this.$store.dispatch('table/setError', false)
      this.popupOpened = ''
    },
    confirmDelete() {
      this.deleteItem(this.popupOpened)
    },
  },
  computed: {
    setData() {
      return this.getTable.slice(
        this.getFirst - 1,
        this.getFirst + this.getRange - 1
      )
    },
    setDown() {
      return this.setData[0][this.active] > this.setData[1][this.active]
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
.section {
  margin: 0 auto;
  max-width: 1140px;
  &__title {
    color: $default-color;
    margin-top: 32px;
    margin-bottom: 16px;
    font-weight: 600;
    font-size: 32px;
    line-height: 40px;
  }
}
.table {
  @extend %font;
  color: $default-color;
  width: 100%;
  &__row {
    display: grid;
    grid-template-columns: 80px 200px repeat(6, minmax(50px, 1fr));
    grid-template-rows: 50px;
    align-items: center;
    min-height: 50px;
    &_type_heading {
      border-bottom: solid 1px #ededed;
      min-height: 56px;
    }

    &:nth-of-type(2n + 2) {
      background: #f8f9fa;
    }
    &:hover {
      background: rgba(0, 161, 30, 0.07);
    }
  }
  &__cell {
    grid-row: 1;
    text-align: left;
    &_type_button {
      position: relative;
      visibility: hidden;
    }
  }
  &__row:hover &__cell_type_button {
    visibility: visible;
  }
  &__row:hover &__cell:nth-child(2) {
    font-weight: 600;
  }
  &__button {
    cursor: pointer;
    outline: none;
    display: flex;
    align-items: center;
    border: none;
    background-color: transparent;
    color: #5b5e77;
  }
  &__button-text {
    margin-left: 8px;
  }
  &__box /deep/ .checkbox__label {
    justify-content: center;
  }
}
</style>
