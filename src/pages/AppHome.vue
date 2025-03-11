<script setup lang="ts">
import * as CardList from '../components/card/AppCardList.vue'
import { useMainStore } from '@/stores/MainStore'
const mainStore = useMainStore()
</script>

<template>
  <div class="flex justify-between items- max-lg:flex-col max-lg:justify-between">
    <h2 class="flex text-3xl font-bold max-lg:justify-start">Все кроссовки</h2>

    <div class="flex gap-4 max-lg:flex-col">
      <select v-model="mainStore.filter" class="py-2 px-3 border rounded-xl outline-none">
        <option value="name">По названию</option>
        <option value="priceUp">По цене(дешевые)</option>
        <option value="priceDown">По цене(дорогие)</option>
      </select>
      <div class="relative">
        <img class="absolute left-3 top-3" src="/search.svg" alt="search" />
        <input
          v-model="mainStore.searchQuery"
          type="text"
          placeholder="Поиск..."
          class="focus:border-gray-400 border rounded-md py-2 pl-10 pr-4 outline-none w-full"
        />
      </div>
    </div>
  </div>
  <div class="mt-10">
    <CardList.default />
  </div>
</template>
