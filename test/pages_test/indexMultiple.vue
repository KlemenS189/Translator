$t('test1.test1')
<template>
  <div>
    {{ $t('test2.test2') }}
  </div>
</template>

<script>
  export default {
    name: "index",
    methods: {
      testFun() {
        this.$t('test3.test3.test3')
      }
    }
  }
</script>

<style scoped>

</style>
