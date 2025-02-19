<script setup>
import { inject } from 'vue'
import CartItem from './CartItem.vue'

const { DrawerAddedItems } = inject('Drawer')
</script>
<template>
  <div class="flex flex-col gap-5 flex-1" v-auto-animate>
    <CartItem
      v-for="item in DrawerAddedItems"
      :key="item.id"
      :id="item.id"
      :image-url="item.imageUrl"
      :title="item.title"
      :price="item.price"
      :addedId="item.addedId"
    />
  </div>
</template>
