<template>
    <div>
      <navbar />
      <Nuxt />
    </div>
  </template>

  <script>

  import navbar from '~/components/navbar.vue';

  export default {
    name: 'default',
    components: {
        navbar,
    }
  }
</script>