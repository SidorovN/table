<template>
  <div class="container">
    <Table/>
  </div>
</template>

<script>
import Table from '@/components/Table.vue'
  export default {
    components : {
      Table,
      }
  }
</script>

<style lang="scss" scoped>
body {
  font-family: Source Sans Pro;
  }

.container {
  
  display: block;
  margin: 0 auto;
  max-width: 1140px;

}

</style>