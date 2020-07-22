<template>
  <div class="toolbar">
    <div class="toolbar__group">
      <p class="toolbar__title">Sort by:</p>
      <Radio @radio-change="sort" name="sort" :checked="true" value="product">Product (100g serving)</Radio>
      <Radio @radio-change="sort" name="sort" value="calories">Calories</Radio>
      <Radio @radio-change="sort" name="sort" value="fat">Fat (g)</Radio>
      <Radio @radio-change="sort" name="sort" value="carbs">Carbs (g)</Radio>
      <Radio @radio-change="sort" name="sort" value="protein">Protein (g)</Radio>
    </div>
    <div class="toolbar__group">
      <button class="toolbar__button" disabled>
        {{`Delete ${selectedDelete()}`}}
      </button>      
      <Dropdown class="dropdown" disabled :title="`${getRange} Per page`">
          <li class="dropdown__item"><Radio @radio-change="setRange" value="10" :checked="true" name="per-page">10</Radio></li>
          <li class="dropdown__item"><Radio @radio-change="setRange" value="15" name="per-page">15</Radio></li>
          <li class="dropdown__item"><Radio @radio-change="setRange" value="25" name="per-page">25</Radio></li>
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
      }
    },
    methods: {
      selectedColumns() {
        return 3
      },
      selectedDelete() {
        return 3
      },  
      sort(evt){
        const param = evt.target.value
        this.$store.dispatch('table/sortTable',{ data: param })
      }, 
      setRange(evt){
        const range = evt.target.value
        this.$store.dispatch('table/setRange', +range )
      },
      nextPage() {
        this.setPagination(this.getFirst + this.getRange, this.getRange)
      },
      prevPage() { 
        this.setPagination(this.getFirst - this.getRange, this.getRange)
      },
      setPagination(first, range) {
        this.$store.dispatch('table/setPagination',{ first : first, range: range})
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
        console.log(table.pagination.range  )
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