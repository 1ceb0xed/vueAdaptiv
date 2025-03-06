<script setup>
import CartItem from './CartItem.vue'
import { useDrawerStore } from '@/stores/DrawerStore'
const drawerStore = useDrawerStore()
</script>
<template>
  <div class="flex flex-col gap-5 flex-1" v-auto-animate>
    <CartItem
      v-for="item in drawerStore.drawerAddedItems"
      :key="item.id"
      :id="item.id"
      :image-url="item.imageUrl"
      :title="item.title"
      :price="item.price"
      :addedId="item.addedId"
    />
  </div>
</template>
