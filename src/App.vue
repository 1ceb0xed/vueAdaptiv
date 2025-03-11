<script setup lang="ts">
import { onMounted, ref } from 'vue'

import * as Header from './components/AppHeader.vue'
import * as Drawer from './components/cart/AppDrawer.vue'
import { useFetchStore } from './stores/FetchStore'
import { useDrawerStore } from './stores/DrawerStore'

const drawerStore = useDrawerStore()
const fetchStore = useFetchStore()
const loader = ref(true)

onMounted(async () => {
  await fetchStore.fetchItems()
  await fetchStore.fetchAdded()
  await fetchStore.fetchFavorites()
  setTimeout(() => {
    loader.value = false
  }, 1500)
})
</script>
<template>
  <div v-if="loader" class="flex justify-center items-center w-full h-screen">
    <div class="loader"></div>
  </div>
  <div v-else>
    <Drawer.default v-if="drawerStore.drawerOpen" />
    <div
      class="m-auto bg-white rounded-xl shadow-xl mt-14 w-[1920] ml-[85px] mr-[85px] max-md:ml-0 max-md:mr-0"
    >
      <Header.default />
      <div class="p-[60px] max-md:p-[10px]">
        <RouterView></RouterView>
      </div>
    </div>
  </div>
</template>

<style scoped>
.loader {
  width: 50px;
  aspect-ratio: 1;
  border-radius: 50%;
  background:
    radial-gradient(farthest-side, #ffa516 94%, #0000) top/8px 8px no-repeat,
    conic-gradient(#0000 30%, #ffa516);
  -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 8px), #000 0);
  animation: l13 1s infinite linear;
}
@keyframes l13 {
  100% {
    transform: rotate(1turn);
  }
}
</style>
