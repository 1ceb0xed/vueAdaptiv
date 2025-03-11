<script setup lang="ts">
import * as CartItem from './AppCartItem.vue'
import { useCartStore } from '@/stores/CartStore'
const cartStore = useCartStore()
</script>
<template>
  <div class="flex flex-col gap-5 flex-1" v-auto-animate>
    <CartItem.default v-for="item in cartStore.cartAddedItems" :key="item.id" :item="item" />
  </div>
</template>
