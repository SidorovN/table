<template>
  <div class="toolbar">
    <div class="toolbar__group">
      <p class="toolbar__title">Sort by:</p>
      <Radio name="sort">Product (100g serving)</Radio>
      <Radio name="sort">Calories</Radio>
      <Radio name="sort">Fat (g)</Radio>
      <Radio name="sort">Carbs (g)</Radio>
      <Radio name="sort">Protein (g)</Radio>
    </div>
    <div class="toolbar__group">
      <button class="toolbar__button" disabled>
        {{`Delete ${selectedDelete()}`}}
      </button>      
      <Dropdown class="dropdown" disabled :title="`${perPage} Per page`">
          <li class="dropdown__item"><Radio name="per-page">10</Radio></li>
          <li class="dropdown__item"><Radio name="per-page">15</Radio></li>
          <li class="dropdown__item"><Radio name="per-page">25</Radio></li>
      </Dropdown>
        <div class="pagination">
          <button @click="prevPage">Prev</button>
            <p class="pagination__text">{{`${getFirst}-${getFirst + getRange - 1} of ${totalItems}`}}</p>
          <button @click="nextPage">Next</button>
        </div>
      <Dropdown class="dropdown" disabled :title="`${selectedColumns()} columns selected`">
          <li class="dropdown__item"><Checkbox>All</Checkbox></li>
          <li class="dropdown__item"><Checkbox>All</Checkbox></li>
          <li class="dropdown__item"><Checkbox>All</Checkbox></li>
          <li class="dropdown__item"><Checkbox>All</Checkbox></li>
          <li class="dropdown__item"><Checkbox>All</Checkbox></li>
          <li class="dropdown__item"><Checkbox>All</Checkbox></li>
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
    props: [
      'totalItems',
      'firstItem',
      'lastItem',
    ],
    data(){
      return {
        perPage: 10,
      }
    },
    methods: {
      selectedColumns(){
        return 3
      },
      selectedDelete(){
        return 3
      },      
      nextPage() {
        this.setPagination(this.getFirst + this.getRange, this.getRange)
      },
      prevPage() { 
        this.setPagination(this.getFirst - this.getRange, this.getRange)
      },
      setPagination(first, range) {
        this.$store.dispatch('table/setPagination',{ first : first, range: 10})
      }
    },
    computed: {      
      getFirst(){
        const { table } = this.$store.state;
        console.log(table)
        return table.pagination.first;
      },
      getRange(){
        const { table } = this.$store.state;
        return table.pagination.range;
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
    height: 100%;
  }
}
.pagination {
  display: flex;
}
</style>