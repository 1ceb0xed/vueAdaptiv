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
  <div class="relative w-full h-auto bg-white border border-slate-100 rounded-3xl p-5">
    <div class="flex justify-start">
      <img
        :src="!isFavorite ? '/like-1.svg' : '/like-2.svg'"
        alt="Like"
        class="cursor-pointer"
        @click="onClickFavorite"
      />
    </div>
    <div class="w-full max-h-[260px] flex justify-center">
      <img :src="imageUrl" alt="sneakers" class="w-full max-w-[308px] h-auto object-contain" />
    </div>
    <div>
      <p class="mt-10 max-sm:mt-3 max-sm:text-sm">{{ title }}</p>
    </div>
    <div class="relative flex mt-2 justify-between items-center">
      <div class="">
        <span class="text-slate-400 max-sm:text-xs">Цена: </span>
        <b class="">{{ price }}</b>
      </div>
      <img
        :src="!isAdded ? '/plus.svg' : '/checked.svg'"
        alt="Plus"
        @click="onClickAdd"
        class="cursor-pointer"
      />
    </div>
  </div>
</template>
