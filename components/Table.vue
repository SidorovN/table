<template>
  <table class="table">
    <tr class="table__row table__row_type_heading">
      <th class="table__cell table__cell_type_heading"><input type="checkbox"></th>
      <th class="table__cell table__cell_type_heading">Product (100g serving)</th>
      <th class="table__cell table__cell_type_heading">Calories</th>
      <th class="table__cell table__cell_type_heading">Fat (g)</th>
      <th class="table__cell table__cell_type_heading">Carbs (g)</th>
      <th class="table__cell table__cell_type_heading">Protein (g)</th>
    </tr>
    <tr class="table__row">
      <td class="table__cell"><input type="checkbox"></td>
      <td class="table__cell">Product (100g serving)</td>
      <td class="table__cell">Calories</td>
      <td class="table__cell">Fat (g)</td>
      <td class="table__cell">Carbs (g)</td>
      <td class="table__cell">Protein (g)</td>
    </tr>
    <tr class="table__row">
      <td class="table__cell"><input type="checkbox"></td>
      <td class="table__cell">Product (100g serving)</td>
      <td class="table__cell">Calories</td>
      <td class="table__cell">Fat (g)</td>
      <td class="table__cell">Carbs (g)</td>
      <td class="table__cell">Protein (g)</td>
    </tr>
    <tr class="table__row">
      <td class="table__cell"><input type="checkbox"></td>
      <td class="table__cell">Product (100g serving)</td>
      <td class="table__cell">Calories</td>
      <td class="table__cell">Fat (g)</td>
      <td class="table__cell">Carbs (g)</td>
      <td class="table__cell">Protein (g)</td>
    </tr>
    <tr class="table__row">
      <td class="table__cell"><input type="checkbox"></td>
      <td class="table__cell">Product (100g serving)</td>
      <td class="table__cell">Calories</td>
      <td class="table__cell">Fat (g)</td>
      <td class="table__cell">Carbs (g)</td>
      <td class="table__cell">Protein (g)</td>
    </tr>
    <tr class="table__row">
      <td class="table__cell"><input type="checkbox"></td>
      <td class="table__cell">Product (100g serving)</td>
      <td class="table__cell">Calories</td>
      <td class="table__cell">Fat (g)</td>
      <td class="table__cell">Carbs (g)</td>
      <td class="table__cell">Protein (g)</td>
    </tr>
    <tr class="table__row">
      <td class="table__cell"><input type="checkbox"></td>
      <td class="table__cell">Product (100g serving)</td>
      <td class="table__cell">Calories</td>
      <td class="table__cell">Fat (g)</td>
      <td class="table__cell">Carbs (g)</td>
      <td class="table__cell">Protein (g)</td>
    </tr>

  </table>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>

.table {
  display: block;
  margin: 0 auto;
  max-width: 1140px;

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