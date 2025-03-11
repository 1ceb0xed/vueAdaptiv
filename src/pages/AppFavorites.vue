<script setup lang="ts">
import * as Card from '@/components/card/AppCard.vue'
import { useMainStore } from '@/stores/MainStore'
const mainStore = useMainStore()
</script>
<template>
  <div
    class="grid grid-cols-5 max-[1919px]:grid-cols-4 max-[1280px]:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-5"
    v-auto-animate
  >
    <Card.default v-for="item in mainStore.favoriteAddedItems" :key="item.id" :item="item" />
  </div>
</template>
