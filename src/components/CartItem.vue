<script setup>
import { defineProps } from 'vue'
import { useDrawerStore } from '@/stores/DrawerStore'
const drawerStore = useDrawerStore()

defineProps({
  id: Number,
  imageUrl: String,
  title: String,
  price: Number,
  addedId: Number,
})
</script>

<template>
  <div
    class="flex items-center border border-slate-200 p-4 rounded-xl gap-4 relative max-sm:flex-col"
  >
    <img :src="imageUrl" alt="sneakers" class="w-16 h-16" />
    <div class="flex flex-col">
      <p>{{ title }}</p>
      <div class="flex justify-between mt-2">
        <b>{{ price }}</b>
      </div>
    </div>
    <img
      src="/close.svg"
      :data-id="addedId"
      :data-parent-id="id"
      @click="drawerStore.removeFromDrawer"
      class="opacity-40 hover:opacity-100 transition cursor-pointer absolute bottom-3 right-3"
    />
  </div>
</template>
