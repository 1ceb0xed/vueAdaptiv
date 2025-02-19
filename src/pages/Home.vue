<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { inject } from 'vue'
import CardList from '../components/CardList.vue'

const { filter, searchQuery } = inject('refs')
</script>

<template>
  <div class="flex justify-between items-center">
    <h2 class="text-3xl font-bold">Все кроссовки</h2>

    <div class="flex gap-4">
      <select v-model="filter" class="py-2 px-3 border rounded-xl outline-none">
        <option value="name">По названию</option>
        <option value="priceUp">По цене(дешевые)</option>
        <option value="priceDown">По цене(дорогие)</option>
      </select>
      <div class="relative">
        <img class="absolute left-3 top-3" src="/search.svg" alt="search" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Поиск..."
          class="focus:border-gray-400 border rounded-md py-2 pl-10 pr-4 outline-none w-full"
        />
      </div>
    </div>
  </div>
  <div class="mt-10">
    <CardList />
  </div>
</template>
