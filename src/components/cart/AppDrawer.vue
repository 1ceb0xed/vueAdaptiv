<script setup lang="ts">
import * as DrawerHead from './AppDrawerHead.vue'
import * as CartItemList from './AppCartItemList.vue'
import { useDrawerStore } from '@/stores/DrawerStore'
import { useFetchStore } from '@/stores/FetchStore'
import { useMainStore } from '@/stores/MainStore'
const fetchStore = useFetchStore()
const mainStore = useMainStore()
const drawerStore = useDrawerStore()
</script>
<template>
  <div
    @click="drawerStore.closeDrawer"
    class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"
  ></div>
  <div class="bg-white w-96 h-full overflow-y-auto z-20 fixed right-0 top-0 p-8 max-md:w-full">
    <DrawerHead.default />
    <CartItemList.default />
    <div v-if="fetchStore.addedItems.length > 0" class="flex flex-col gap-2 my-6">
      <div class="flex gap-2">
        <span>Итого:</span>
        <div class="flex-1 border-b border-dashed"></div>
        <b>{{ mainStore.totalSummCart }} Руб</b>
      </div>
      <button
        @click="drawerStore.makeOrder"
        class="transition bg-lime-500 w-full rounded-xl cursor-pointer py-3 disabled:bg-slate-300 text-white hover:bg-lime-600 active:bg-lime-700"
      >
        Оформить заказ
      </button>
    </div>
    <div v-if="fetchStore.addedItems.length <= 0 && !drawerStore.isMakeOrder">
      <img src="/package-icon.png" alt="" class="flex m-auto w-48 h-48 mt-20" />
      <span class="flex justify-center mt-10 text-lime-500 text-lg"
        >КОРЗИНА ПУСТА, ДОБАВЬТЕ ТОВАРЫ</span
      >
    </div>
    <div v-if="drawerStore.isMakeOrder">
      <img src="/public/order-success-icon.png" alt="" class="flex m-auto w-32 h-32 mt-20" />
      <span class="flex justify-center mt-10 text-lime-500 text-2xl">ЗАКАЗ ОФОРМЛЕН!</span>
    </div>
  </div>
</template>
