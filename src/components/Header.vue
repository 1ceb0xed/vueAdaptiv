<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { inject } from 'vue'
const totalSummCart = inject('totalSummCart')
const { openDrawer } = inject('Drawer')
</script>
<template>
  <header class="flex justify-between border-b border-slate-100 px-10 py-8">
    <router-link to="/">
      <div class="flex items-center gap-4">
        <img src="/logo.png" alt="Logo" class="w-11" />
        <div>
          <h2 class="font-bold text-xl uppercase">Vue Sneakers</h2>
          <p class="text-slate-400">Магазин лучших кроссовок</p>
        </div>
      </div>
    </router-link>
    <ul class="flex items-center gap-10 text-gray-500">
      <li @click="openDrawer" class="flex items-center gap-3 cursor-pointer hover:text-black">
        <img src="/cart.svg" alt="Cart" />
        <b>{{ totalSummCart }} руб.</b>
      </li>
      <router-link to="/favorites">
        <li class="flex items-center gap-3 cursor-pointer hover:text-black">
          <img src="/heart.svg" alt="Favorite" />
          <span>Закладки</span>
        </li>
      </router-link>
      <li class="flex items-center gap-3 cursor-pointer hover:text-black">
        <img src="/profile.svg" alt="Favorite" />
        <span>Профиль</span>
      </li>
    </ul>
  </header>
</template>
