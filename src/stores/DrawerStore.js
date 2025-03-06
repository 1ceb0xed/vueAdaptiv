import { defineStore } from 'pinia'
import axios from 'axios'
import { useFetchStore } from './FetchStore'

export const useDrawerStore = defineStore('drawer', {
  state: () => ({
    drawerOpen: false,
    isMakeOrder: false,
  }),
  getters: {
    drawerAddedItems() {
      const fetchStore = useFetchStore()
      return fetchStore.addedItems.map((addeditem) => {
        return fetchStore.items.find((item) => item.id === addeditem.parentId)
      })
    },
  },
  actions: {
    openDrawer() {
      this.drawerOpen = true
      document.body.classList.toggle('overflow-hidden', true)
    },
    closeDrawer() {
      this.drawerOpen = false
      this.isMakeOrder = false
      document.body.classList.toggle('overflow-hidden', false)
    },
    async removeFromDrawer(item) {
      const fetchStore = useFetchStore()
      try {
        const DeleteId = Number(item.target.dataset.parentId)
        await axios.delete(`https://a3ca5502346e0c49.mokky.dev/cartadded/${item.target.dataset.id}`)
        const ItemFetchId = fetchStore.items.find((obj) => obj.id === DeleteId)
        if (ItemFetchId) {
          ItemFetchId.isAdded = false
        }
        fetchStore.fetchAdded()
      } catch (err) {
        console.log(err)
      }
    },
    async makeOrder() {
      const fetchStore = useFetchStore()
      fetchStore.addedItems.forEach(async (addedItem) => {
        const itemsId = fetchStore.items.find((item) => item.id === addedItem.parentId)
        if (itemsId) {
          itemsId.isAdded = false
        }
      })
      const itemsToDelete = [...fetchStore.addedItems]
      fetchStore.addedItems.splice(0, fetchStore.addedItems.length)
      this.isMakeOrder = true
      try {
        for (const addedItem of itemsToDelete) {
          try {
            await axios.delete(`https://a3ca5502346e0c49.mokky.dev/cartadded/${addedItem.id}`)
            fetchStore.addedItems
          } catch (err) {
            console.log(err)
          }
        }
      } catch (err) {
        console.log(err)
      }
    },
  },
})
