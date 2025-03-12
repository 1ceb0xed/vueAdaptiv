<script setup lang="ts">
import * as Card from '../card/AppCard.vue'
import { useMainStore } from '@/stores/MainStore'
import { Item } from '@/stores/SneakerStore'
const mainStore = useMainStore()
</script>
<template>
  <div
    class="grid grid-cols-5 max-[1919px]:grid-cols-4 max-[1280px]:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-2 gap-5"
    v-auto-animate
  >
    <Card.default v-for="item in mainStore.searchedItems" :key="item.id" :item="item" />
  </div>
</template>
