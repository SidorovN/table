<template>
<div class="">
    <Toolbar :totalItems="table.length" :firstItem="1" :lastItem="table.length"/>
    <table class="table">
      <tr class="table__row table__row_type_heading">
        <th class="table__cell table__cell_type_heading"><Checkbox/></th>
        <th class="table__cell table__cell_type_heading">Product (100g serving)</th>
        <th class="table__cell table__cell_type_heading">Calories</th>
        <th class="table__cell table__cell_type_heading">Fat (g)</th>
        <th class="table__cell table__cell_type_heading">Carbs (g)</th>
        <th class="table__cell table__cell_type_heading">Protein (g)</th>
      </tr>

        
      <tr class="table__row"
        v-for="row in setData"
        :key = row.id
      >
        <th class="table__cell table__cell"><Checkbox/></th>
        <td class="table__cell">{{row.product}}</td>
        <td class="table__cell">{{row.calories}}</td>
        <td class="table__cell">{{row.fat}} (g)</td>
        <td class="table__cell">{{row.carbs}} (g)</td>
        <td class="table__cell">{{row.protein}} (g)</td>
      </tr>
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
    data(){
      return {
        dataToShow: [],
        }
    },
    props: [
      'table',
    ],
    computed: {  
      setData() {
        return this.table.slice(this.getFirst - 1, this.getFirst + this.getRange - 1)
      },   
      getFirst() {
        const { table } = this.$store.state;
        return table.pagination.first;
      },
      getRange() {
        const { table } = this.$store.state;
        return table.pagination.range;
      },
    },
  }
</script>

<style lang="scss" scoped>
.table {  
  font-size: $font-size;
  line-height: $line-height;
  &__row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    min-height: 50px;

    &:nth-of-type(2n+3){
      background: #F8F9FA;
    }
    &:hover {
      background: rgba(0, 161, 30, 0.07);
    }
  }
  &__cell {
    text-align: center;
  }
}
</style>