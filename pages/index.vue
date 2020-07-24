<template>
  <div class="container">
    <div class="preloader" v-if="isLoading">
      preloader
    </div>
    <h1 class="error" v-if="showError && !isLoading">error</h1>
    <Table :table="table" v-if="!isLoading && table.length" />
    <Popup />
  </div>
</template>

<script>
import Table from '@/components/Table.vue'
export default {
  components: {
    Table,
  },
  mounted() {
    if (!Object.keys(this.$store.getters['table/getPagination']).length) {
      this.$store.dispatch('table/setPagination', { first: 1, range: 10 })
    }
    this.$store
      .dispatch('table/fetchData')
      .then((res) => {
        this.table = this.$store.getters['table/getTableData']
      })
      .catch((res) => {
        this.showError = true
      })
      .finally((res) => {
        this.isLoading = false
      })
  },
  data() {
    return {
      table: [],
      isLoading: true,
      showError: false,
    }
  },
}
</script>

<style lang="scss" scoped>
body {
  font-family: 'Source Sans Pro';
}
.preloader {
  width: 400px;
  height: 400px;
  background: tomato;
  margin: 0 auto;
}
.container {
  display: block;
  margin: 0 auto;
  max-width: 1140px;
}
</style>
