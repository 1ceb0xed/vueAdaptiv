<script setup>
import { onMounted, ref, provide, computed } from 'vue'
import axios from 'axios'
import Header from './components/Header.vue'
import Drawer from './components/Drawer.vue'
import { useFetchAll } from './stores/FetchStore'

const apiStore = useFetchAll()

onMounted(async () => {
  await apiStore.fetchItems()
  await apiStore.fetchAdded()
  await apiStore.fetchFavorites()
}) //подгрузка

//searchedItems -CardList.vue || useMain +
//addToFavorite - CardList.vue Favorites.vue || useMain +
//addToCart - CardList.vue Favorites.vue || useMain +
//favoriteAddedItems - Favorites.vue || useMain +
//totalSummCart - Header.vue Drawer.vue || useMain +

//fetchItems - onMounted || useFetch +
//fetchFavorites - addToFavorite onMounted || useFetch +
//fetchAdded - addToCart removeFromDrawer || useFetch +

//opendrawer - header.vue || useDrawer +
//closeDrawer - Drawer.vue DrawerHead.vue || useDrawer +
//DrawerAddedItems - CartItemList.vue || useDrawer +
//removeFromDrawer - CartItem.vue || useDrawer +
//makeOrder - Drawer.vue || useDrawer +

const items = ref([]) // || useFetch +
const AddedItems = ref([]) // || useFetch +
const FavoriteItems = ref([]) // || useFetch +
const drawerOpen = ref(false) // || useDrawer +
const filter = ref('name') // || useMain +
const searchQuery = ref('') // || useMain +
const isMakeOrder = ref(false) // || useDrawer +

const addToFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      const obj = {
        parentId: item.id,
      }
      item.isFavorite = true
      const { data } = await axios.post('https://a3ca5502346e0c49.mokky.dev/favorites', obj)
      item.favoriteId = data.id
    } else {
      item.isFavorite = false
      await axios.delete(`https://a3ca5502346e0c49.mokky.dev/favorites/${item.favoriteId}`)
      item.favoriteId = null
    }
  } catch (err) {
    console.log(err)
  }
  apiStore.fetchFavorites()
}
const addToCart = async (item) => {
  try {
    if (!item.isAdded) {
      const obj = {
        parentId: item.id,
      }
      item.isAdded = true
      const { data } = await axios.post('https://a3ca5502346e0c49.mokky.dev/cartadded', obj)
      item.addedId = data.id
    } else {
      item.isAdded = false
      await axios.delete(`https://a3ca5502346e0c49.mokky.dev/cartadded/${item.addedId}`)
      item.addedId = null
    }
  } catch (err) {
    console.log(err)
  }
  apiStore.fetchAdded()
}

// const fetchItems = async () => {
//   try {
//     const { data } = await axios.get('https://a3ca5502346e0c49.mokky.dev/items')
//     items.value = data.map((obj) => ({
//       ...obj,
//       isFavorite: false,
//       isAdded: false,
//       favoriteId: null,
//       addedId: null,
//     }))
//   } catch (err) {
//     console.log(err)
//   }
// }
// const fetchFavorites = async () => {
//   try {
//     const { data: favorites } = await axios.get('https://a3ca5502346e0c49.mokky.dev/favorites')
//     FavoriteItems.value = favorites
//     items.value = items.value.map((item) => {
//       const favorite = favorites.find((favorite) => favorite.parentId === item.id)
//       if (!favorite) {
//         return item
//       }
//       return {
//         ...item,
//         isFavorite: true,
//         favoriteId: favorite.id,
//       }
//     })
//   } catch (err) {
//     console.log(err)
//   }
// }
// const fetchAdded = async () => {
//   try {
//     const { data } = await axios.get('https://a3ca5502346e0c49.mokky.dev/cartadded')
//     AddedItems.value = data
//     items.value = items.value.map((item) => {
//       const added = data.find((added) => added.parentId === item.id)
//       if (!added) {
//         return item
//       }
//       return {
//         ...item,
//         isAdded: true,
//         addedId: added.id,
//       }
//     })
//   } catch (err) {
//     console.log(err)
//   }
// }

const searchedItems = computed(() => {
  let result = items.value.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )

  switch (
    filter.value //из условия получаем ответ и сравниваем его с case, default - не совпало ни одно
  ) {
    case 'priceUp':
      return result.sort((a, b) => a.price - b.price)
    case 'priceDown':
      return result.sort((a, b) => b.price - a.price)
    case 'name':
      return result.sort((a, b) => a.title.localeCompare(b.title))
    default:
      return result
  }
})

const openDrawer = () => {
  drawerOpen.value = true
  document.body.classList.toggle('overflow-hidden', true)
} //оставляем тк нужно прописывать много логики
const closeDrawer = () => {
  drawerOpen.value = false
  isMakeOrder.value = false
  document.body.classList.toggle('overflow-hidden', false)
} //оставляем тк нужно прописывать много логики
const DrawerAddedItems = computed(() => {
  return AddedItems.value
    .map((addeditem) => {
      return items.value.find((item) => item.id === addeditem.parentId)
    })
    .filter(Boolean)
})

const favoriteAddedItems = computed(() => {
  return FavoriteItems.value.map((favoriteItem) => {
    return items.value.find((item) => item.id === favoriteItem.parentId)
  })
})

const totalSummCart = computed(() => {
  return items.value.filter((item) => item.isAdded).reduce((sum, item) => sum + item.price, 0)
})

const removeFromDrawer = async (item) => {
  try {
    const DeleteId = Number(item.target.dataset.parentId)
    await axios.delete(`https://a3ca5502346e0c49.mokky.dev/cartadded/${item.target.dataset.id}`)
    const ItemFetchId = items.value.find((obj) => obj.id === DeleteId)
    if (ItemFetchId) {
      ItemFetchId.isAdded = false
    }
    apiStore.fetchAdded()
  } catch (err) {
    console.log(err)
  }
}

const makeOrder = async () => {
  AddedItems.value.forEach(async (addedItem) => {
    const itemsId = items.value.find((item) => item.id === addedItem.parentId)
    if (itemsId) {
      itemsId.isAdded = false
    }
  })
  const itemsToDelete = [...AddedItems.value]
  AddedItems.value.splice(0, AddedItems.value.length)
  isMakeOrder.value = true
  try {
    for (const addedItem of itemsToDelete) {
      try {
        await axios.delete(`https://a3ca5502346e0c49.mokky.dev/cartadded/${addedItem.id}`)
        AddedItems.value
      } catch (err) {
        console.log(err)
      }
    }
  } catch (err) {
    console.log(err)
  }
}
provide('refs', { items, AddedItems, drawerOpen, filter, searchQuery, isMakeOrder })
provide('totalSummCart', totalSummCart)
provide('searchedItems', searchedItems)
provide('favoriteAddedItems', favoriteAddedItems)
provide('addToSomethere', { addToCart, addToFavorite })
provide('Drawer', { openDrawer, closeDrawer, DrawerAddedItems, removeFromDrawer, makeOrder })
</script>
<template>
  <Drawer v-if="drawerOpen" :AddedItems="AddedItems" :isMakeOrder="isMakeOrder" />
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
