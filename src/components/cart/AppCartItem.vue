<script setup lang="ts">
import { defineProps } from 'vue'
import { useDrawerStore } from '@/stores/DrawerStore'
import { Item } from '@/stores/FetchStore'
const drawerStore = useDrawerStore()

defineProps<{ item: Item }>()
</script>

<template>
  <div
    class="flex items-center border border-slate-200 p-4 rounded-xl gap-4 relative max-sm:flex-col"
  >
    <img :src="item.imageUrl" alt="sneakers" class="w-16 h-16" />
    <div class="flex flex-col">
      <p>{{ item.title }}</p>
      <div class="flex justify-between mt-2">
        <b>{{ item.price }}</b>
      </div>
    </div>
    <img
      src="/close.svg"
      :data-id="item.addedId"
      :data-parent-id="item.id"
      @click="drawerStore.removeFromDrawer"
      class="opacity-40 hover:opacity-100 transition cursor-pointer absolute bottom-3 right-3"
    />
  </div>
</template>
