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
        Delete
      </button>
      <Dropdown class="toolbar__button" disabled>
        Delete
      </Dropdown>
    </div>
  </div>
</template>

<script>
import Dropdown from '@/components/ui/Dropdown'
  export default {
    components: {
      Dropdown,
    }
  }
</script>

<style lang="scss" scoped>

.toolbar {
  display: flex;
  justify-content: space-between;
  &__group {    
    align-items: center;
    display: flex;
  }
}
</style>