<template>
  <div class="container">
    <div class="preloader" v-if="isLoading">
      <div class="btn__loader">
        <svg
          class="btn__spinner"
          width="65"
          height="65"
          viewBox="0 0 66 66"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            class="btn__spinner-path"
            fill="none"
            stroke-width="6"
            stroke-linecap="round"
            cx="33"
            cy="33"
            r="30"
            stroke="#fff"
          ></circle>
        </svg>
      </div>
    </div>
    <Error class="error" v-if="showError && !isLoading" />
    <Table :table="table" v-if="!isLoading && table.length" />
  </div>
</template>

<script>
import Error from '@/components/Error.vue'
import Table from '@/components/Table.vue'
export default {
  components: {
    Table,
    Error,
  },
  computed: {},
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
        this.$store.dispatch('table/setError', true)
      })
      .finally((res) => {
        this.$store.dispatch('table/setLoading', false)
        this.isLoading = this.$store.getters['table/getLoading']
        this.showError = this.$store.getters['table/getError']
      })
  },
  data() {
    return {
      table: [],
      showError: false,
      isLoading: true,
    }
  },
}
</script>

<style lang="scss" scoped>
body {
  font-family: 'Source Sans Pro';
}
.preloader {
  position: relative;
  width: 200px;
  height: 200px;
  margin: 0 auto;
  margin-top: 20%;

  .btn__loader {
    position: absolute;
    cursor: inherit;
    // background-color: inherit;
    padding: 5px;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 3;
  }
  .btn__spinner {
    height: 100%;
    width: 100%;
    animation: rotator 2s linear infinite;
  }

  @keyframes rotator {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(270deg);
    }
  }

  .btn__spinner-path {
    stroke-dasharray: 187;
    stroke-dashoffset: 0;
    transform-origin: center;
    animation: dash 2s ease-in-out infinite;
    stroke: green;
  }

  @keyframes dash {
    0% {
      stroke-dashoffset: 187;
    }
    50% {
      stroke-dashoffset: 47;
      transform: rotate(135deg);
    }
    100% {
      stroke-dashoffset: 187;
      transform: rotate(450deg);
    }
  }
}
.container {
  min-width: 100vw;
  min-height: 100vh;
  display: block;
}
.error {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
