<template>
  <div class="toolbar">
    <div class="toolbar__group">
      <p class="toolbar__title">Sorting by:</p>
      <Radio
        v-for="column in getColumns"
        :key="column.name"
        @radio-change="sort"
        class="toolbar__radio"
        name="sort"
        :visible="getColumns.find((el) => el.name === column.name).visible"
        :checked="active === column.name"
        :value="column.name"
        >{{ column.title }}</Radio
      >
    </div>

    <div class="toolbar__group">
      <div class="toolbar__container">
        <button v-if="!selected.length" class="toolbar__button" disabled>
          Delete
        </button>

        <button v-else @click="openPopup" class="toolbar__button">
          {{ `Delete (${selected.length})` }}
        </button>

        <Popup
          v-if="popupOpened"
          :item="selected"
          @cancel="resetDelete"
          @confirm="confirmDelete"
        />
      </div>

      <Dropdown class="dropdown" disabled :title="`${getRange} Per page`">
        <Radio
          @radio-change="setRange"
          value="10"
          :checked="true"
          name="per-page"
          >10</Radio
        >
        <Radio @radio-change="setRange" value="15" name="per-page">15</Radio>
        <Radio @radio-change="setRange" value="25" name="per-page">25</Radio>
      </Dropdown>

      <div class="pagination">
        <button
          class="pagination__button pagination__button_prev"
          @click="prevPage"
          :disabled="getFirst < 2"
        >
          <Arrow />
        </button>
        <p class="pagination__text">
          {{
            `${getFirst}-${
              getTotalItems > getFirst + getRange
                ? getFirst + getRange - 1
                : getTotalItems
            } `
          }}
          <span class="pagination__span">of </span> {{ getTotalItems }}
        </p>
        <button
          class="pagination__button pagination__button_next"
          @click="nextPage"
          :disabled="getFirst + getRange > getTotalItems"
        >
          <Arrow />
        </button>
      </div>

      <Dropdown
        class="dropdown"
        disabled
        :title="`${getColumns.length} columns selected`"
      >
        <Checkbox
          class="dropdown__item dropdown__item_type_all"
          @check-change="setAll"
          :checked="selectAll"
          :disabled="false"
          name="columns"
          value="all"
          >Select all</Checkbox
        >
        <form @change="changeColumns" class="dropdown__form" name="columns">
          <Checkbox
            v-for="column in getColumns"
            class="dropdown__item"
            :key="column.name"
            :value="column.name"
            name="columns"
            :checked="true"
            >{{ column.title }}</Checkbox
          >
        </form>
      </Dropdown>
    </div>
  </div>
</template>

<script>
import Arrow from '@/components/ui/Arrow'
import Dropdown from '@/components/ui/Dropdown'
import Popup from '@/components/Popup'
export default {
  components: {
    Arrow,
    Dropdown,
    Popup,
  },
  props: ['selected'],
  data() {
    return {
      selectAll: true,
      active: 'product',
      popupOpened: false,
    }
  },
  methods: {
    changeColumns(evt) {
      const inputs = Array.from(evt.currentTarget.elements)
      const columns = inputs.filter((el) => el.checked).map((el) => el.value)
      this.selectAll = inputs.every((el) => el.checked)
      this.$store.dispatch('table/setColumns', { columns })

      this.active = this.getColumns.find((el) => el.name == this.active).visible
        ? this.active
        : this.getColumns.find((el) => el.visible).name
      this.$store.dispatch('table/sortTable', { data: this.active })
      this.$emit('sort', this.active)
    },
    sort(evt) {
      evt.preventDefault()
      const param = evt.target.value
      this.active = param
      this.$store.dispatch('table/sortTable', { data: param })
      this.$emit('sort', param)
    },
    setRange(evt) {
      const range = evt.target.value
      this.$store.dispatch('table/setRange', +range)
    },
    setAll(evt) {
      evt.preventDefault()
      this.selectAll = !this.selectAll
      if (this.selectAll) {
        const form = document.forms.columns
        Array.from(form.elements).forEach((el) => (el.checked = true))
        const columns = Array.from(form.elements).map((el) => el.value)
        this.$store.dispatch('table/setColumns', { columns })
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
    openPopup() {
      this.popupOpened = true
    },
    deleteItem(id) {
      this.$store.dispatch('table/setLoading', true)
      this.$store
        .dispatch('table/deleteItem', id)
        .then((res) => {
          this.$store.dispatch('table/setError', false)
          this.resetDelete()
          this.$emit('change-page')
        })
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
      this.popupOpened = false
    },
    confirmDelete() {
      this.deleteItem(this.selected)
    },
  },
  computed: {
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
    getTotalItems() {
      const { table } = this.$store.state
      return table.table.length
    },
  },
}
</script>

<style lang="scss" scoped>
.toolbar {
  padding: 16px 0;
  @extend %font;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  border-top: solid 1px #ededed;
  &__group {
    align-items: center;
    display: flex;
  }
  &__button {
    @extend %active;
    height: 100%;
    margin-right: 12px;
    &:disabled {
      color: #c6cbd4;
      background-color: transparent;
      border: 1px solid #c6cbd4;
    }
  }
  &__title {
    font-weight: bold;
    margin-right: 8px;
  }
  &__container {
    height: 100%;
    position: relative;
  }
}
.dropdown {
  height: 100%;
  @extend %font;
  &__form {
    display: flex;
    flex-direction: column;
  }
  &__item {
    &_type_all {
      font-weight: 600;
    }
    color: $default-color;
    &:not(:last-child) {
      margin-bottom: 12px;
    }
  }
}
.pagination {
  display: flex;
  align-items: center;
  margin: 0 16px;
  &__text {
    font-weight: 600;
    margin: 0 8px;
  }
  &__span {
    font-weight: 400;
  }
  &__button {
    border: 1px solid #d5dae0;
    padding: 0;
    height: 32px;
    width: 32px;
    background-color: transparent;
    &:disabled {
      opacity: 0.5;
    }
    &_next {
      transform: rotate(-90deg);
    }
    &_prev {
      transform: rotate(90deg);
    }
  }
}
</style>
