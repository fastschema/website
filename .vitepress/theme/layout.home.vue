<!--.vitepress/theme/MyLayout.vue-->
<script setup>
import DefaultTheme from 'vitepress/theme'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #home-hero-image>
      <img class="VPImage image-src" src='/static/images/logo.svg' alt="FastSchema" />
    </template>
  </Layout>
</template>
