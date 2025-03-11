<script setup lang="ts">
import * as CartItem from './AppCartItem.vue'
import { useDrawerStore } from '@/stores/DrawerStore'
const drawerStore = useDrawerStore()
</script>
<template>
  <div class="flex flex-col gap-5 flex-1" v-auto-animate>
    <CartItem.default v-for="item in drawerStore.drawerAddedItems" :key="item.id" :item="item" />
  </div>
</template>
