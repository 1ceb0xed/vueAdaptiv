<script setup lang="ts">
import { Item } from '@/stores/FetchStore'
import { useMainStore } from '@/stores/MainStore'
const mainStore = useMainStore()
defineProps<{
  item: Item
}>()
</script>
<template>
  <div class="relative w-full h-auto bg-white border border-slate-100 rounded-3xl p-5">
    <div class="flex justify-start">
      <img
        :src="!item.isFavorite ? '/like-1.svg' : '/like-2.svg'"
        alt="Like"
        class="cursor-pointer"
        @click="mainStore.addToFavorite(item)"
      />
    </div>
    <div class="w-full max-h-[260px] flex justify-center">
      <img :src="item.imageUrl" alt="sneakers" class="w-full max-w-[308px] h-auto object-contain" />
    </div>
    <div>
      <p class="mt-10 max-sm:mt-3 max-sm:text-sm">{{ item.title }}</p>
    </div>
    <div class="relative flex mt-2 justify-between items-center">
      <div class="">
        <span class="text-slate-400 max-sm:text-xs">Цена: </span>
        <b class="max-sm:text-xs">{{ item.price }}</b>
      </div>
      <img
        :src="!item.isAdded ? '/plus.svg' : '/checked.svg'"
        alt="Plus"
        @click="mainStore.addToCart(item)"
        class="cursor-pointer"
      />
    </div>
  </div>
</template>
