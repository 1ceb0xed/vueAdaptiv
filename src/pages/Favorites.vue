<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import Card from '../components/Card.vue'
import { useMainStore } from '@/stores/MainStore'
const mainStore = useMainStore()
</script>
<template>
  <div
    class="grid grid-cols-5 max-[1919px]:grid-cols-4 max-[1280px]:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-5"
    v-auto-animate
  >
    <Card
      v-for="item in mainStore.favoriteAddedItems"
      :key="item.id"
      :id="item.id"
      :price="item.price"
      :is-added="item.isAdded"
      :title="item.title"
      :image-url="item.imageUrl"
      :is-favorite="item.isFavorite"
      :onClickAdd="() => mainStore.addToCart(item)"
      :onClickFavorite="() => mainStore.addToFavorite(item)"
    />
  </div>
</template>
