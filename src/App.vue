<script setup>
import { onMounted } from 'vue'

import Header from './components/Header.vue'
import Drawer from './components/Drawer.vue'
import { useFetchStore } from './stores/FetchStore'
import { useDrawerStore } from './stores/DrawerStore'

const drawerStore = useDrawerStore()
const fetchStore = useFetchStore()

onMounted(async () => {
  await fetchStore.fetchItems()
  await fetchStore.fetchAdded()
  await fetchStore.fetchFavorites()
}) //подгрузка
</script>
<template>
  <Drawer v-if="drawerStore.drawerOpen" />
  <div
    class="m-auto bg-white rounded-xl shadow-xl mt-14 w-[1920] ml-[85px] mr-[85px] max-md:ml-0 max-md:mr-0"
  >
    <Header />
    <div class="p-[60px] max-md:p-[10px]">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped></style>
