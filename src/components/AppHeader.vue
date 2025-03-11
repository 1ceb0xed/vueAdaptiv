<script setup lang="ts">
import { useMainStore } from '@/stores/MainStore'
import { useDrawerStore } from '@/stores/DrawerStore'
const drawerStore = useDrawerStore()
const mainStore = useMainStore()
</script>
<template>
  <header
    class="flex justify-between border-b border-slate-100 px-10 py-8 max-sm:px-[5px] max-sm:py-[10px] max-lg:flex-col max-lg:items-center"
  >
    <RouterLink to="/">
      <div class="flex items-center gap-4">
        <img src="/logo.png" alt="Logo" class="w-11" />
        <div>
          <h2 class="font-bold text-xl uppercase">Vue Sneakers</h2>
          <p class="text-slate-400">Магазин лучших кроссовок</p>
        </div>
      </div>
    </RouterLink>
    <ul class="flex items-center gap-10 text-gray-500 max-lg:mt-10 max-sm:flex-col">
      <li
        @click="drawerStore.openDrawer"
        class="flex items-center gap-3 cursor-pointer hover:text-black"
      >
        <img src="/cart.svg" alt="Cart" />
        <b>{{ mainStore.totalSummCart }} руб.</b>
      </li>
      <RouterLink to="/favorites">
        <li class="flex items-center gap-3 cursor-pointer hover:text-black">
          <img src="/heart.svg" alt="Favorite" />
          <span>Закладки</span>
        </li>
      </RouterLink>
      <li class="flex items-center gap-3 cursor-pointer hover:text-black">
        <img src="/profile.svg" alt="Favorite" />
        <span>Профиль</span>
      </li>
    </ul>
  </header>
</template>
