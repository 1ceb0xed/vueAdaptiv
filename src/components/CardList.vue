<script setup>
import { inject } from 'vue'
import Card from './Card.vue'
const { addToCart, addToFavorite } = inject('addToSomethere')
const searchedItems = inject('searchedItems')
//max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2
</script>
<template>
  <div
    class="grid grid-cols-5 max-[1919px]:grid-cols-4 max-[1280px]:grid-cols-3 max-lg:grid-cols-2 gap-5"
    v-auto-animate
  >
    <Card
      v-for="item in searchedItems"
      :key="item.id"
      :price="item.price"
      :is-added="item.isAdded"
      :title="item.title"
      :image-url="item.imageUrl"
      :is-favorite="item.isFavorite"
      :onClickAdd="() => addToCart(item)"
      :onClickFavorite="() => addToFavorite(item)"
    />
  </div>
</template>
