<template>
  <div class="checkbox">
    <label class="checkbox__label">
      <input type="checkbox" class="checkbox__button visually-hidden">
      <span class="checkbox__box"></span>
      <slot></slot>
    </label>    
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>
.checkbox {
  display: inline-block;
  &__label {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    }
  &__box {
    margin: 0 12px;
    display: block;
    border-radius: 2px;
    height: 14px;
    width: 14px;
    border: 1px solid #C6CBD4;
    background-position: center;
    background-repeat: no-repeat;
  }  
 &__button:checked~&__box{
      background-color: $active-bg;
      border: 1px solid transparent;
      color: $active-color;
      background-image: url('/images/shape.svg');
    }
}
</style>