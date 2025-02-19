<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
defineProps({
  title: String,
  imageUrl: String,
  price: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
  onClickAdd: Function,
  onClickFavorite: Function,
})
</script>
<template>
  <div class="relative w-full h-auto bg-white border border-slate-100 rounded-3xl p-[20px]">
    <div class="flex justify-start">
      <img
        :src="!isFavorite ? '/like-1.svg' : '/like-2.svg'"
        alt="Like"
        class=""
        @click="onClickFavorite"
      />
    </div>
    <div class="max-w-[308px] max-h-[260px]">
      <img :src="imageUrl" alt="sneakers" class="w-full h-auto" />
    </div>
    <div>
      <p class="mt-10">{{ title }}</p>
    </div>
    <div class="relative flex mt-2 justify-between">
      <div class="">
        <span class="text-slate-400">Цена: </span>
        <b>{{ price }}</b>
      </div>
      <img :src="!isAdded ? '/plus.svg' : '/checked.svg'" alt="Plus" @click="onClickAdd" />
    </div>
  </div>
</template>
